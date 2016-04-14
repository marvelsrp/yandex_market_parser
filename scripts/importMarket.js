var deferred = require('deferred');
var _ = require('lodash');
var fs = require('fs');

var VK = require('./libs/connectors/vk');
var eachPromise = require('./libs/eachPromise');
var ownerId = require('../config/vk').ownerId;
var shop = require('../dump/generateYML/price').shop;
var code = fs.readFileSync(__dirname + '/../execute/getAlbums', 'utf8');

var categories = _.map(shop.categories, (category) => {
  return {
    name: category['#']
  };
});

var realCode = code;
realCode = _.replace(realCode, '%owner_id%', ownerId);
realCode = _.replace(realCode, '%categories%', JSON.stringify(categories, null, 2));

VK.execute(realCode).then((response) => {
  if (response.error) {
    console.error(response);
  } else {
    console.log(response);
  }
});


//eachPromise(shop.categories, (category) => {
//  var def = new deferred();
//  console.log('callback', category);
//  return def.promise;
//});

//
//_.each(offers, (offer) => {
//  console.log(Object.keys(offer));
//  process.exit();
//});
