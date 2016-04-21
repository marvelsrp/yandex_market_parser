var deferred = require('deferred');
var _ = require('lodash');
var fs = require('fs');

var VK = require('./libs/connectors/vk');
var eachPromise = require('./libs/eachPromise');
var ownerId = require('../config/vk').ownerId;
var shop = require('../dump/generateYML/price').shop;
var marketAlbums = require('../config/marketAlbums');
var marketCategory = require('../config/marketCategory');

function findCategoryById(categoryID) {
  var categoryName = _.find(shop.categories, (category) => {
    return category['@'].id == categoryID;
  })['#'];

  var VKCategoryId = _.find(marketAlbums, (album) => {
    return album.title == categoryName;
  });
  return VKCategoryId.id;
}

var vkUploadUrlPromise = VK.market.getMarketUploadServer(ownerId);
var vkProductsPromise = VK.market.get(ownerId);

Promise.all([vkUploadUrlPromise,vkProductsPromise]).then((result, products) => {
  var uploadUrl = result[0];
  var products = result[1];

  eachPromise(shop.offers, (offer) => {
    //eachPromise(offer.picture, () => {
    console.log('each offer');
    VK.market.uploadProductPhoto(uploadUrl, offer.picture[0]).then((response) => {
      console.log(response);
    });
    //});
    //var params = {
    //  owner_id: ownerId,
    //  name: offer.name,
    //  description: offer.description,
    //  category_id: findCategoryById(offer.categoryId),
    //  price: offer.price
    //};
    //return VK.market.add(params).then((response) => {
    //  console.log(response);
    //});
    process.exit();
  });


});

//.then((response) => {
//
//
//});
//VK.market.get(ownerId).then((vkProducts) => {
//
//});