var request = require('request');

var load = (sid, img) => {
  var params = {
    key: key,
    file: file
  };
  var url = 'http://anti-captcha.com/in.php';
  return new Promise((resolve) => {
    console.log(url);
    request.post({
      uri: url,
      headers: authData.headers
    }, (error, response, body) => {
      resolve(JSON.parse(body));
    });
  });
  console.log(sid, img);
};

module.exports = {
  load: load
};