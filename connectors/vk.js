var VK = require('vksdk');
var authData = require('./vk.json');
var open = require('open');

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

var like = (id) => {

  var params = {};
  var splitId = id.split('_');
  switch (true){
    case id.indexOf('wall') != -1:
      params.type = 'post';
      break;
    case id.indexOf('photo') != -1:
      params.type = 'photo';
      break;
    default:
      throw new Error('Undefined type for ' + id);
  }
  params.owner_id = parseInt(splitId[0].replace(/\D/g,''));
  params.item_id = parseInt(splitId[1]);
  if (params.owner_id < 0) {
    return Promise.reject('owner_id < 0');
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {resolve('timeout');}, 5000);
    vk.request('likes.add', params, (response) => {
      resolve(response);
    }, (e) => {
      reject('reject',e);
    });
  });
};

var repost = (id) => {
  var params = {
    object: id
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {resolve('timeout');}, 5000);
    vk.request('wall.repost', params, (response) => {
      if (response.hasOwnProperty('success')){
        resolve(response);
      } else {
        reject(response);
      }

    }, (e) => {
      reject('reject',e);
    });
  });
};

var joinGroup = (id) => {
  var params = {
    group_id: parseInt(id.replace(/\D/g,''))
  };

  return vk.request('groups.join', params);
};

var getToken = () => {
  var access_token_url = 'https://oauth.vk.com/authorize?' +
    'client_id=' + authData.appId + '&' +
    'redirect_uri=https://oauth.vk.com/blank.html&' +
      //'redirect_uri=' + authData.redirectUri + '&' +
    'scope=messages,wall,photos,groups,email,notify,notifications,offline,market,ads' + '&' +
    'response_type=token&' +
    'v=5.50&';
  open(access_token_url);
};

module.exports = {
  vk: vk,
  like: like,
  repost: repost,
  joinGroup: joinGroup,
  getToken: getToken
};
