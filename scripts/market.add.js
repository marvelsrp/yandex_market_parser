var deferred = require('deferred');
var _ = require('lodash');
var fs = require('fs');
var console = require('better-console');
var VK = require('./libs/connectors/vk');
var eachPromise = require('./libs/eachPromise');
var ownerId = require('../config/vk').ownerId;
var shop = require('../dump/market.generateYML/price').shop;
var marketAlbums = require('../config/marketAlbums');
var marketCategory = require('../config/marketCategory');
var rejectedProducts = [];
function findCategoryById(categoryID) {

  var categoryName = _.find(shop.categories, (category) => {
    return category['@'].id == categoryID;
  })['#'];
  var VKCategoryId = _.find(marketAlbums, (album) => {
    return album.title == categoryName;
  });
  return VKCategoryId.id;
}
function getProductName(offer) {
  return offer.model;
  // return (offer.model.replace(/[^А-Я а-я ]/g, '')).replace(/\s+/g, ' ');
}

function checkExistingProduct(products, offer) {
  var name = getProductName(offer);
  var product = _.find(products, (product) => {
    return product.title === name;
  });
  var result;
  if (product) {
    // var vkProductPrice = parseFloat(product.price.amount) / 100;
    // if (offer.price !== vkProductPrice) {
    //   console.error(offer.name, offer.price,  vkProductPrice);
    //   result = Promise.resolve({action: 'update', product: product});
    // } else {
    result = Promise.reject();
    // }
  } else {
    result = Promise.resolve({action: 'create'});
  }

  return result;
}

function createProduct(offer) {
  console.info('createProduct', getProductName(offer));
  var album = findCategoryById(offer.categoryId),
    mainPhotoID,
    otherPhotoIDs = [];

  if (offer.picture.length == 0) {
    throw new Error('no images');
  }
  console.info('upload Main Photo');
  var mainPhotoUrl = offer.picture.pop();
  console.info('upload Main Photo', mainPhotoUrl);
  return VK.uploadPhoto(mainPhotoUrl, 'product_main', ownerId).then((photoId) => {

    mainPhotoID = photoId;
  }, (e) => {
    console.error('Main Photo catch', e);
    throw new Error('uploadPhoto');
  }).then(() => {
    if (offer.picture.length == 0) {
      return Promise.resolve();
    }
    var pictures = offer.picture.slice(0, 4);

    return eachPromise(pictures, (pictureUrl) => {
      console.info('upload Other Photo', pictureUrl);
      return VK.uploadPhoto(pictureUrl, 'product_other', ownerId).then((photoId) => {
        otherPhotoIDs.push(photoId);
      }, (e) => {
        console.error('Other Photo catch', e);
      });
    });
  }).then(() => {
    console.log('CREATE');
    var description = offer.url + ' ' + String.fromCharCode(10) + String.fromCharCode(10) + offer.description;
    var params = {
      owner_id: '-' + ownerId,
      name: getProductName(offer),
      description: description,
      category_id: marketCategory.id,
      price: offer.price,
      main_photo_id: mainPhotoID,
      photo_ids: otherPhotoIDs.join(',')
    };
    console.log('market.add', params);
    return VK.request('market.add', params).then((response) => {
      console.log('created product', offer.name, 'id:', response.market_item_id);
      return response.market_item_id;
    });
  }).then((itemId) => {
    var params = {
      owner_id: '-' + ownerId,
      item_id: itemId,
      album_ids: album
    };
    console.log('addToAlbum params', params);
    return VK.request('market.addToAlbum', params).then((response) => {
      console.log('addToAlbum', response);
    });
  });
}

function deleteProduct(product) {
  console.info('deleteProduct', product.id);
  var params = {
    item_id: product.id,
    owner_id: product.owner_id
  };
  return VK.request('market.delete', params).then((response) => {
    console.log('delete product', product.id, response);
  }).catch(() => {
    console.error('delete product', product.id);
  });

}

try {
  VK.market.get(ownerId).then((products) => {

    eachPromise(shop.offers, (offer) => {

      return checkExistingProduct(products, offer).then((params) => {
        console.log('=============================================');

        var def = deferred();
        try {
          switch (params.action) {
            case 'create':
              createProduct(offer).then(() => {
                console.info('product resolve');
                def.resolve();
              }, () => {
                rejectedProducts.push(offer.url);
                console.error('product reject');
                def.reject();
              });
              break;
            case 'update':
              deleteProduct(params.product).then(() => {
                return createProduct(offer).then(() => {
                  console.info('product resolve');
                }, () => {
                  rejectedProducts.push(offer.url);
                  console.error('product reject');
                });
              }).then(() => {
                def.resolve();
              });
              break;
          }
        } catch (e) {
          console.log('error', e);
        }

        return def.promise;
      }, () => {
        console.info('EXIST');
      });
    }).then(() => {
      console.info('REJECTED SUMMARY');
      for(var i in rejectedProducts){
        console.log(rejectedProducts[i]);
      }
    })

  });
} catch (e) {
  console.error(e);
}
