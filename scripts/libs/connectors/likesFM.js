var open = require('open');
var request = require('request');
var authData = require('./../../../config/likesFM');

var getOffers = () => {
  console.log('getOffers');

  return new Promise((resolve) => {
    var url = 'https://likes.fm/get_offers?client_id=' + authData.clientId + '&viewer_id=' + authData.viewerId;
    console.log(url);
    request.post({
      uri: url,
      headers: authData.headers
    }, (error, response, body) => {
      console.log(body);
      resolve(JSON.parse(body));
    });
  });
};

var doOffers = (id, type) => {
  console.log('doOffers', id + '.' + type);

  return new Promise((resolve) => {
    var url = 'https://likes.fm/do_offers?entities%5B%5D=' + id + '.' + type + '&client_id=' + authData.clientId + '&viewer_id=' + authData.viewerId;
    request.post({
      uri: url,
      headers: authData.headers
    }, (error, response, body) => {
      resolve(body);
    });
  });
};

var openOffer = (id, type) => {
  var timeStamp =  new Date().getTime();
  return new Promise((resolve) => {
    var url = 'https://likes.fm/open_offer?client_id=' + authData.clientId + '&viewer_id=' + authData.viewerId + '&entity=' + id + '.' + type  + '&_=' + timeStamp;
    request.get({
      uri: url,
      headers: authData.headers
    }, (error, response, body) => {
      console.log('openOffer', body);
      resolve();
    });

  });
};

var getState = () => {

  return new Promise((resolve) => {
    var timeStamp =  new Date().getTime();
    var url = 'https://likes.fm/get_state?client_id=' + authData.clientId + '&viewer_id=' + authData.viewerId + '&_=' + timeStamp;
    console.log(url);
    request.post({
      uri: url,
      headers: authData.headers
    }, (error, response, body) => {
      console.log(body);
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
