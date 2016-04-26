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
var FormData = require('form-data');

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
var market = {
  get: function(owner_id) {
    console.log('market.get', owner_id);
    var products = [];

    function request(offset) {
      var def = deferred();
      var params = {
        owner_id: '-' + owner_id,
        offset: offset,
        count: 200
      };

      vk.request('market.get', params, (response) => {
        if (!response.response) {
          console.warn('reject market.get', response);
          def.reject();
        }
        products.concat(response.items);

        if (response.response.count === 200) {
          request(owner_id, offset + 200).then(() => {
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

    return request(0);
  },
  add: function(params) {
    var def = deferred();
    vk.request('market.add', params, (response) => {
      if (!response.response) {
        console.warn('reject market.add', response);
        return def.reject();
      }
      def.resolve(response);
    });
    return def.promise;
  },

  /**
   * getMarketUploadServer
   * @param group_id
   * @param main_photo
   * @returns {Promise}
   */
  getMarketUploadServer: function(group_id, main_photo) {

    var params = {
      group_id: group_id,
      main_photo: main_photo,
      crop_x: 1,
      crop_y: 1,
      crop_width: 500
    };
    var def = deferred();
    vk.request('photos.getMarketUploadServer', params, (response) => {
      if (!response.response) {
        console.warn('reject photos.getMarketUploadServer', response);
        def.reject();
      } else {
        console.log('market.getMarketUploadServer', group_id, main_photo, response.response.upload_url);
        def.resolve(response.response.upload_url);
      }

    });
    return def.promise;
  },
  /**
   * get Album file server
   * @param group_id
   * @returns {*}
   */
  getAlbumUploadServer: function(group_id) {
    console.log('market.getAlbumUploadServer', group_id);
    var params = {
      group_id: group_id
    };
    var def = deferred();
    vk.request('photos.getMarketAlbumUploadServer', params, (response) => {
      if (!response.response) {
        console.warn('reject photos.getMarketAlbumUploadServer', response);
        def.reject();
      } else {
        def.resolve(response.response.upload_url);
      }

    });
    return def.promise;
  },
  /**
   * Upload photo
   * @param endPoint
   * @param photoUrl
   */
  uploadPhoto(endPoint, photoUrl) {
    request(photoUrl).pipe(fs.createWriteStream(__dirname + '/file.jpg'));

    var def = deferred();
    var formData = {
      file: fs.createReadStream(__dirname + '/file.jpg').pipe(request(photoUrl))
    };
    request.post({url:endPoint, formData: formData}, function(err, httpResponse, body) {
      var res = JSON.parse(body);
      if (err || res.error) {
        console.error('Upload failed:', res);
        def.reject();
      } else {
        console.log('Upload successful.', photoUrl);
        def.resolve(res);
      }
    });
    return def.promise;
  },
  /**
   * Save market photo
   * @param group_id
   * @param params
   * @returns {Promise}
   */
  saveMarketPhoto(group_id, params) {

    params.group_id = group_id;
    var def = deferred();
    console.log('market.saveMarketPhoto', params);
    vk.request('photos.saveMarketPhoto', params, (response) => {
      if (!response.response) {
        console.warn('reject photos.saveMarketPhoto', response);
        return def.reject();
      }
      console.log('market.saveMarketPhoto', response.response[0]);
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
  market: market
};
