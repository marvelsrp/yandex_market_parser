var VK = require('vksdk');
var authData = require('./vk.json');
var open = require('open');
var _ = require('lodash');
var sleep = require('./../lib/sleep');
var console = require('better-console');
var deferred = require('deferred');
var fs = require('fs');
var readline = require('readline');
var antigate = require('./antigate');

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
      var sid = response.error.captcha_sid;
      var img = response.error.captcha_img;
      antigate.load(sid, img).then((id) => {
        antigate.response(id, 0).then(() => {
          like(id, sid, answer).then(() => {
            console.info('like with captcha solver =)');
            def.resolve();
          });
        });
      });

      //return captcha(sid, img).then((key) => {
      //  like(id, sid, key).then(() => {
      //    console.error('like with captcha solver =)');
      //    def.resolve();
      //  })
      //}).catch(() => {
      //  console.error('reject captcha =(');
      //  def.resolve();
      //});

    } else {
      def.resolve();
    }

  });

  return def.promise;
};

var captcha = (sid, img) => {
  console.log(sid, img);
};

var repost = (id) => {
  var def = deferred();
  var params = {
    object: id
  };

  vk.request('wall.repost', params, (response) => {
    console.log('wall.repost', response);
    return (response.hasOwnProperty('success')) ?  def.resolve() : def.reject();
  });
  return def.promise;
};

var joinGroup = (id) => {
  var def = deferred();
  var params = {
    group_id: parseInt(id.replace(/\D/g,''))
  };

  vk.request('groups.join', params, (response) => {
    console.log('groups.join', response);
    return def.resolve();
  });
  return def.promise;
};

var addFriend = (id) => {
  var def = deferred();
  var params = {
    user_id: parseInt(id.replace(/\D/g,''))
  };

  vk.request('friends.add', params, (response) => {
    console.log('friends.add', response);
    return def.resolve();
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

var getMembers = (id, offset) => {
  var params = {
    group_id: id,
    sort: 'id_desc',
    count: 1000,
    fields: 'country, sex, city',
    offset: offset
  };
  var def = deferred();
  try {
    vk.request('groups.getMembers', params, (response) => {
      if (!response.response) {
        console.warn('reject vkDef', response);
        return def.reject();
      }

      return def.resolve(response.response);
    });
  } catch (e){
    console.error(e);
    throw e;
  }
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

module.exports = {
  vk: vk,
  like: like,
  execute: execute,
  captcha: captcha,
  repost: repost,
  joinGroup: joinGroup,
  addFriend: addFriend,
  getMembers:getMembers,
  getToken: getToken
};
