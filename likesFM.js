var open = require('open');
var request = require('request');
var authData = require('./likesFM.json');


var getOffers = () => {
  console.log('getOffers');

  return new Promise((resolve) => {
    request.post({
      uri: 'https://likes.fm/get_offers?client_id=' + authData.clientId + '&viewer_id=' + authData.viewerId,
      headers: authData.headers
    }, (error, response, body) => {
      resolve(JSON.parse(body));
    });
  });
};

var doOffers = (id) => {
  console.log('doOffers', id);
  return new Promise((resolve) => {
    request.post({
      uri: 'https://likes.fm/do_offers?entities[]=' + id + '&client_id=' + authData.clientId + '&viewer_id=' + authData.viewerId,
      headers: authData.headers
    }, (error, response, body) => {
      console.log(body);
      resolve();
    });
  });

};

var openOffer = (id, type) => {
  console.log('openOffer', id, type);
  var timeStamp =  new Date().getTime();
  return new Promise((resolve) => {
    var url = 'https://likes.fm/open_offer?entity=' + id + '.' + type + '&client_id=' + authData.clientId + '&viewer_id=' + authData.viewerId + '&_=' + timeStamp;
    request.get({
      uri: url,
      headers: authData.headers
    }, (error, response, body) => {
      console.log(url,body);
      resolve();
    });
    //https://likes.fm/open_offer?client_id=847&viewer_id=12640542&entity=photo200446837_390434888.like&_=145857714175
    //https://likes.fm/open_offer?client_id=847&viewer_id=12640542&entity=photo323047090_405666869.like&_=1458577177235
    //https://likes.fm/open_offer?client_id=847&viewer_id=12640542&entity=photo249645972_405622807.like&_=1458577433164

    /**
     * GET https://likes.fm/open_offer?client_id=480&viewer_id=12640542&entity=photo163197664_384097906.like&_=1458634535571
     * POST https://likes.fm/do_offers?entities%5B%5D=photo163197664_384097906.like&client_id=480&viewer_id=12640542
     * POST https://likes.fm/do_offers?entities%5B%5D=photo163197664_384097906.like&client_id=480&viewer_id=12640542
     */

  });
};

var getState = () => {
  console.log('getState');
  return new Promise((resolve) => {
    var timeStamp =  new Date().getTime();
    let url = 'https://likes.fm/get_state?client_id=' + authData.clientId + '&viewer_id=' + authData.viewerId + '&_=' + timeStamp;
    request.post({
      uri: url,
      headers: authData.headers
    }, (error, response, body) => {
      console.log(url, body);
      resolve();
    });
  });
};

module.exports = {
  getOffers: getOffers,
  doOffers: doOffers,
  getState: getState,
  openOffer: openOffer
};
