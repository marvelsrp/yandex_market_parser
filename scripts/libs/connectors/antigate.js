var authData = require('../../../config/antigate');
var request = require('request');
var base64 = require('node-base64-image');
var deferred = require('deferred');
var console = require('better-console');
var sleep = require('../sleep');

var loadFn = (sid, link) => {
  console.info('antigate.load', link);
  var def = deferred();

  base64.base64encoder(link, {string: true}, function(err, image) {
    if (err) {
      console.log(err);
      def.reject();
    }
    var formData = {
      min_len: 4,
      max_len: 5,
      comment: 'vk captcha',
      body: image,
      key: authData.key
    };

    var url = 'http://anti-captcha.com/in.php';
    request.post({
      uri: url,
      formData: formData
    }, (error, response, body) => {
      if (!error && response.statusCode == 200 && body.indexOf('OK') != -1) {

        var id = body.substr(3,8);
        console.info('anti-captcha ID:', id);
        def.resolve(id);
      } else {
        console.error('catch', body);
        def.reject(body);
      }

    });
  });

  return def.promise;
};
var responseFn = (id, deep) => {
  console.warn('CHECK CAPTCHA');
  var def = deferred();
  var data = {
    id: id,
    action: 'get',
    key: authData.key
  };
  var url = 'http://anti-captcha.com/res.php?key=' + authData.key + '&action=get&id=' + id;
  request.get(url, data,  (error, response, body) => {
    if (!error && response.statusCode == 200 && body.indexOf('OK') != -1) {
      var answer = body.substr(3,5);
      console.info('SOLVE CAPTCHA:', answer);
      def.resolve(answer);
    } else {
      if (body != 'CAPCHA_NOT_READY'){
        console.error('catch', body);
      }
      console.warn(body);

      sleep(5000).then(() => {
        console.log('inner responseFn', deep + 1);
        responseFn(id, deep + 1).then((data) => {
          console.log('inner then', deep + 1, data);
          def.resolve(data);
        });
      });
    }
  });

  return def.promise;
};

module.exports = {
  load: loadFn,
  response: responseFn
};
