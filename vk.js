var request = require('request');
var VK = require('vksdk');

//var vk = new VK({
//  'appId'     : 4516455,
//  'appSecret' : 'jPWK1kjmYJCas0dnM2LJ',
//  'language'  : 'ru',
//  'mode'      : 'sig'
//});

Auth = () => {
  var VKAuth = require('./auth_vk.json');
  var url =  'https://oauth.vk.com/token?grant_type=password&client_id=' + VKAuth.appId +
    '&client_secret=' + VKAuth.appSecret + '&username=' + VKAuth.login + '&password=' + VKAuth.password + '&v=5.50&scope=offline';
  return request({
    uri: url
  }, (error, response, body) => {
    console.log(body);
  });
};

var url = Auth();
console.log(url);
////todo move to gitignore
//var access_token = 'f01b4147fbd53f66f64c46371cd4dffa5c45f215fc67dc4aa3eaa55442cd5ef00eaf25779759a0b915c5c';
//vk.setSecureRequests(true);
//vk.setToken(access_token);
//
//vk.request('users.get', {'user_id' : 1}, function(_o) {
//  console.log(_o);
//});

//var access_token = 'f01b4147fbd53f66f64c46371cd4dffa5c45f215fc67dc4aa3eaa55442cd5ef00eaf25779759a0b915c5c';
////https://oauth.vk.com/authorize?client_id=4516455&redirect_uri=http://hackup.net.ua/test&display=page&response_type=code
//
//
//function auth(){
//  var app_id = '4516455';
//  var app_key = 'jPWK1kjmYJCas0dnM2LJ';
//  var user_code = '3e002d95a6c38e7bbf';
//  var acsess_token_url = 'https://oauth.vk.com/access_token?client_id='+app_id
//    +'&client_secret='+app_key+'&redirect_uri=http://hackup.net.ua/test&code='+user_code;
//  return new Promise(function(resolve, reject){
//    request.post({
//      uri: acsess_token_url
//    }, function(error, response, body) {
//      access_token = body.access_token;
//    });
//  });
//
//}
////auth().then(function(token) {
////  access_token = token;
////});
