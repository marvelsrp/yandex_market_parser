var VK = require('vksdk');
var authData = require('../../../config/vk');
var open = require('open');
var _ = require('lodash');
var sleep = require('../sleep');
var console = require('better-console');
var deferred = require('deferred');
var fs = require('fs');
var request = require('request');
var readline = require('readline');
var sizeOf = require('image-size');
var url = require('url');
var http = require('http');
var stream = require('stream');

var vk = new VK({
  'appId'     : authData.appId,
  'appSecret' : authData.appSecret,
  'language'  : 'ru'
});
vk.setToken(authData.clientToken);
vk.setSecureRequests(true);
vk.on('serverTokenReady', function(_o) {
  // Here will be server access token
  vk.setToken(_o.access_token);
  console.log('serverTokenReady', _o);
});

var like = (id, captcha_sid, captcha_key) => {
  var def = deferred();
  var params = {};
  var splitId = id.split('_');
  switch (true){
    case id.indexOf('wall') != -1:
      params.type = 'post';
      break;
    case id.indexOf('photo') != -1:
      params.type = 'photo';
      break;
    case id.indexOf('video') != -1:
      params.type = 'video';
      break;
    default:
      return def.reject('Undefined type for ' + id);
  }
  params.owner_id = parseInt(splitId[0].replace(/\D/g,''));
  params.item_id = parseInt(splitId[1]);
  if (params.owner_id < 0) {
    return def.reject('owner_id < 0');
  }
  if (captcha_sid) {
    params.captcha_sid = captcha_sid;
  }
  if (captcha_key) {
    params.captcha_key = captcha_key;
  }
  console.log('vk.request likes.add');
  vk.request('likes.add', params, (response) => {
    //console.log('likes.add', response);

    if (response.error && response.error.error_code === 14) {
      console.warn('CAPTCHA?');
    } else {
      def.resolve();
    }

  });

  return def.promise;
};

var execute = (code) => {
  var def = deferred();
  var params = {
    code: code
  };

  vk.request('execute', params, (response) => {
    def.resolve(response);
  });

  return def.promise;
};

var getToken = () => {
  var access_token_url = 'https://oauth.vk.com/authorize?' +
    'client_id=' + authData.appId + '&' +
    'redirect_uri=https://oauth.vk.com/blank.html&' +
      //'redirect_uri=' + authData.redirectUri + '&' +
    'scope=messages,wall,photos,groups,friends,email,notify,notifications,offline,market,ads' + '&' +
    'response_type=token&' +
    'v=5.50&';
  open(access_token_url);
};

var requestProxy = function(action, params) {
  var def = deferred();
  //console.log('request', action);
  vk.request(action, params, (response) => {
    if (!response.response) {
      console.error('reject ' + action, response);
      return def.reject();
    }
    //console.log('resolve', action);
    def.resolve(response.response);
  });
  return def.promise;
};
var endPointsCache = {};

var getUploadEndpoint = function(type, params) {
  var result;
  if (endPointsCache[type]) {
    result = Promise.resolve(endPointsCache[type]);
  } else {
    switch (type) {
      case 'product_main':
        result = requestProxy('photos.getMarketUploadServer', Object.assign({}, params, {main_photo: 1})).then((response) => {
          endPointsCache[type] = response.upload_url;
          return endPointsCache[type];
        });
        break;
      case 'product_other':
        result = requestProxy('photos.getMarketUploadServer', Object.assign({}, params)).then((response) => {
          endPointsCache[type] = response.upload_url;
          return endPointsCache[type];
        });
        break;
      default:
        console.error('Undefined Endpoint type', type);
        break;
    }
  }
  return result;
};

var upload = function(type, params, photoUrl) {
  if (!photoUrl) {
    return Promise.reject('undefined photUrl');
  }
  var fileUrl = __dirname + '/file.jpg';
  try {
    var resultPromise = new Promise((resolve, reject) => {
      var wstream = fs.createWriteStream(fileUrl);
      var stream = request(photoUrl).pipe(wstream);
      stream.on('error', function(err) {
        throw new Error('stream error' + err);
      });
      //stream.on('response', function(response) {
      //  if (response.headers['content-type'] === 'image/jpeg') {
      //
      //  }
      //});
      wstream.on('finish', function() {
        var dimension = sizeOf(fileUrl);
        if (parseInt(dimension.height) > 400 && parseInt(dimension.width) > 400) {
          resolve();
        } else {
          console.error('reject by img size' + dimension);
          reject();
        }
      });
    }).then(() => {
      return getUploadEndpoint(type, params);
    }).then((url) => {
      var formData = {
        file: fs.createReadStream(fileUrl)
      };
      return new Promise((resolve, reject) => {

        request.post({url, formData: formData}, function(err, httpResponse, body) {
        var res = JSON.parse(body);
        if (err || res.error) {
          reject('upload failed: ' + body);
        } else {
          resolve(res);
        }
      });
      });
    });
  } catch (e) {
    console.error(e);
    return Promise.reject();
  }
  return resultPromise;
};

var uploadPhoto = (photoUrl, type, ownerId) => {
  return upload(type, {group_id: ownerId}, photoUrl).then((responseUpload) => {
    responseUpload.group_id = ownerId;
    return requestProxy('photos.saveMarketPhoto', responseUpload).then((responseSavePhoto) => {
      return responseSavePhoto[0].id;
    });
  }, (e) => {
    console.error('upload catch', e);
    return Promise.reject(e);
  });
};

var market = {
  get: function(owner_id) {
    console.log('market.get', owner_id);
    var products = [];

    function loop(offset) {
      console.log('loop', offset);
      var def = deferred();
      var params = {
        owner_id: '-' + owner_id,
        offset: offset,
        count: 200
      };

      requestProxy('market.get', params).then((response) => {

        _.forEach(response.items, function(item, key) {
          products.push(item);
        });
        if (response.items.length === 200) {
          loop(offset + 200).then(() => {
            def.resolve(products);
          }).catch(() => {
            def.reject();
          });
        } else {
          def.resolve(products);
        }
      });

      return def.promise;
    }

    return loop(0);
  },
  add: function(params) {
    var def = deferred();
    vk.request('market.add', params, (response) => {
      if (!response.response) {
        console.warn('reject market.add', response);
        return def.reject();
      }
      def.resolve(response.response);
    });
    return def.promise;
  },
  /**
   * Add product to album
   * @param owner_id
   * @param item_id
   * @param album_ids
   * @returns {*}
   */
  addToAlbum(owner_id, item_id, album_ids) {
    var params = {owner_id, item_id, album_ids};
    var def = deferred();
    vk.request('market.addToAlbum', params, (response) => {
      if (!response.response) {
        console.warn('reject photos.saveMarketPhoto', response);
        return def.reject();
      }
      def.resolve(response.response[0].id);
    });
    return def.promise;
  }

  /**
   *  main_photo_id: 412463608,
   photo_ids: [ 412463606, 412463610, 412463615, 412463619 ] }

   */
};

module.exports = {
  vk: vk,
  like: like,
  execute: execute,
  getToken: getToken,
  request: requestProxy,
  upload: upload,
  uploadPhoto: uploadPhoto,
  market: market
};
