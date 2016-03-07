var request = require('request');
var url = 'https://likes.fm/get_offers?client_id=724&viewer_id=12640542';
request({
  uri: url,
  headers: {
    'Cookie': 'current_user="MTI2NDA1NDIsMA==|1457343180|693a20a7e659ebca0e22adb5e3483af6dedd6982"; _ga=GA1.2.2002509498.1457343169; lastUsedOfferDate=1457347238912'
  }
}, function(error, response, body) {
  console.log(body);
});
