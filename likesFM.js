var open = require('open');
var request = require('request');
var authData = require('./likesFM.json');
var sleep = (time) => {
  console.log('sleep', time);
  return new Promise((resolve) => {
    var stop = new Date().getTime();
    while (new Date().getTime() < stop + time) {

    }
    resolve();
  });
};

var getOffers = () => {
  console.log('getOffers');

  return new Promise((resolve) => {
    var url = 'https://likes.fm/get_offers?client_id=' + authData.clientId + '&viewer_id=' + authData.viewerId;
    console.log(url);
    request.post({
      uri: url,
      headers: authData.headers
    }, (error, response, body) => {
      resolve(JSON.parse(body));
    });
  });
};

var doOffers = (id, type) => {
  console.log('doOffers', id);

  return new Promise((resolve) => {
    //https://likes.fm/do_offers?entities%5B%5D=photo159884937_403875795.like&client_id=862&viewer_id=256488069
    //https://likes.fm/do_offers?entities%5B%5D=photo329211286_409975781.like&client_id=745&viewer_id=256488069


    var url = 'https://likes.fm/do_offers?entities%5B%5D=' + id + '.' + type + '&client_id=' + authData.clientId + '&viewer_id=' + authData.viewerId;
    console.log(url);
    request.post({
      uri: url,
      headers: authData.headers
    }, (error, response, body) => {
      console.log(body);
      resolve(body);
    });
  });
  //
  //var promiseWhile = function(condition, action) {
  //  var resolver = Promise.defer();
  //  var loop = function(response) {
  //    if (!condition(response)) return resolver.resolve();
  //    return action()
  //      .then(() => {
  //        sleep(1000).then(loop());
  //      })
  //      .catch(resolver.reject);
  //  };
  //  process.nextTick(loop);
  //  return resolver.promise;
  //};
  //return promiseWhile((response) => {
  //  console.log(response)
  //  return response !== 'padding' || typeof response !== 'Object';
  //}, () => {
  //  return new Promise((resolve) => {
  //    //https://likes.fm/do_offers?entities%5B%5D=photo159884937_403875795.like&client_id=862&viewer_id=256488069
  //    //https://likes.fm/do_offers?entities%5B%5D=photo329211286_409975781.like&client_id=745&viewer_id=256488069
  //
  //
  //    var url = 'https://likes.fm/do_offers?entities%5B%5D=' + id + '.' + type + '&client_id=' + authData.clientId + '&viewer_id=' + authData.viewerId;
  //    console.log(url);
  //    request.post({
  //      uri: url,
  //      headers: authData.headers
  //    }, (error, response, body) => {
  //      console.log(body);
  //      resolve(body);
  //    });
  //  });
  //});

};

var openOffer = (id, type) => {
  var timeStamp =  new Date().getTime();
  return new Promise((resolve) => {
    //https://likes.fm/open_offer?client_id=745&viewer_id=256488069&entity=wall-117800997_18.like&_=1458730738374
    //https://likes.fm/open_offer?client_id=745&viewer_id=256488069&entity=photo29662203_400308106.like&_=1458730869503

    var url = 'https://likes.fm/open_offer?client_id=' + authData.clientId + '&viewer_id=' + authData.viewerId + '&entity=' + id + '.' + type  + '&_=' + timeStamp;
    console.log(url);
    request.get({
      uri: url,
      headers: authData.headers
    }, (error, response, body) => {
      console.log(body);
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
