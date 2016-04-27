var deferred = require('deferred');
var _ = require('lodash');
var fs = require('fs');

var VK = require('./libs/connectors/vk');
var eachPromise = require('./libs/eachPromise');
var ownerId = require('../config/vk').ownerId;
var shop = require('../dump/market.generateYML/price').shop;
var marketAlbums = require('../config/marketAlbums');
var marketCategory = require('../config/marketCategory');

function findCategoryById(categoryID) {
  var categoryName = _.find(shop.categories, (category) => {
    return category['@'].id == categoryID;
  })['#'];
  console.log('categoryName', categoryName);
  var VKCategoryId = _.find(marketAlbums, (album) => {
    return album.title == categoryName;
  });
  console.log('VKCategoryId', VKCategoryId);
  return VKCategoryId.id;
}
try {
  var vkUploadMainPhotoPromise = VK.market.getMarketUploadServer(ownerId, 1);
  var vkUploadOtherPhotoPromise = VK.market.getMarketUploadServer(ownerId, 0);
  var vkProductsPromise = VK.market.get(ownerId);

  Promise.all([vkUploadMainPhotoPromise, vkUploadOtherPhotoPromise, vkProductsPromise]).then((result) => {
    var uploadMainUrl = result[0];
    var uploadOtherUrl = result[1];
    var products = result[2];
    //console.log(products);
    //return;

    eachPromise(shop.offers, (offer) => {
      //var offer = shop.offers[0];

      var photo_ids = [];
      var main_photo_id = undefined;
      var main_photo_url = offer.picture.pop();

      var mainPhotoPromise = (() => {
        var def = deferred();
        VK.market.uploadPhoto(uploadMainUrl, main_photo_url, true).then((responseUpload) => {

          VK.market.saveMarketPhoto(ownerId, responseUpload).then((id) => {
            main_photo_id = id;
            def.resolve();
          });
        });
        return def.promise;
      })();

      var otherPhotoPromise = eachPromise(offer.picture, (picture) => {
        var def = deferred();
        VK.market.uploadPhoto(uploadOtherUrl, picture).then((responseUpload) => {
          VK.market.saveMarketPhoto(ownerId, responseUpload).then((id) => {
            photo_ids.push(id);
            def.resolve();
          });
        });
        return def.promise;
      });

      return Promise.all([mainPhotoPromise, otherPhotoPromise]).then(() => {
        var params = {
          owner_id: '-' + ownerId,
          name: offer.name,
          description: offer.description,
          category_id: marketCategory.id,
          price: offer.price,
          main_photo_id: main_photo_id,
          photo_ids: photo_ids.join(',')
        };
        return VK.market.add(params).then((response) => {
          console.log('typeof response', typeof response);
          console.log('created product', offer.name, 'id:', response.market_item_id);
        });
      });
    });
  });
} catch (e) {
  console.error(e);
}