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

var addLike = (id) => {
  console.log('addLike', id)
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
  params.owner_id = Math.abs(parseInt(splitId[0].replace(/\D/g,'')));
  params.item_id = Math.abs(parseInt(splitId[1]));

  return new Promise((resolve) => {

    vk.request('likes.add', params, (response) => {
      console.log('likes.add', params, response);
      resolve(response);
    });
  });
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
  addLike: addLike,
  getToken: getToken
};
