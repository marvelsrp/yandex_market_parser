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
  //var vkUploadOtherPhotoPromise = VK.market.getMarketUploadServer(ownerId, 0);
  var vkProductsPromise = VK.market.get(ownerId);

  Promise.all([vkUploadMainPhotoPromise, vkProductsPromise]).then((result) => {
    var uploadMainUrl = result[0];
    var uploadOtherUrl = result[1];
    var products = result[2];

    //eachPromise(shop.offers, (offer) => {
    var offer = shop.offers[0];

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

    //var otherPhotoPromise = eachPromise(offer.picture, (picture) => {
    //  var def = deferred();
    //  VK.market.uploadPhoto(uploadOtherUrl, picture).then((responseUpload) => {
    //    VK.market.saveMarketPhoto(ownerId, responseUpload.server, responseUpload.photo, responseUpload.hash).then((id) => {
    //      photo_ids.push(id);
    //      def.resolve();
    //    });
    //  });
    //  return def.promise;
    //});

    Promise.all([mainPhotoPromise]).then(() => {
      var params = {
        owner_id: ownerId,
        name: offer.name,
        description: offer.description,
        category_id: marketCategory.id,
        price: offer.price,
        main_photo: main_photo_id,
        main_photo_id: main_photo_id,
        deleted: 0
        //photo_ids: photo_ids.join(',')
      };
      console.log('finish', params);
      return VK.market.add(params).then((response) => {
        console.log(response);
      });

    });

    //var uploadPromise = new Promise();
    //VK.market.uploadPhoto(uploadUrl, offer].picture[0]).then((responseUpload) => {
    //  VK.market.saveMarketPhoto(ownerId, responseUpload.server, responseUpload.photo, responseUpload.hash).then((id) => {
    //    uploadPromise.resolve(id);
    //  });
    //});
    //
    //uploadPromise.then((img_id) => {
    //
    //});

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
    //process.exit();
    //});
  });
} catch (e) {
  console.error(e);
}
//.then((response) => {
//
//
//});
//VK.market.get(ownerId).then((vkProducts) => {
//
//});