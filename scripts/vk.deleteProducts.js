var deferred = require('deferred');
var _ = require('lodash');
var fs = require('fs');
var console = require('better-console');
var VK = require('./libs/connectors/vk');
var eachPromise = require('./libs/eachPromise');
var ownerId = require('../config/vk').ownerId;
var rejectedProducts = [];

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

    eachPromise(products, (product) => {
      console.log('=============================================');

      var def = deferred();
      try {
        deleteProduct(product).then(() => {
          def.resolve();
        });
      } catch (e) {
        console.log('error', e);
      }

      return def.promise;
    }).then(() => {
      console.info('REJECTED SUMMARY');
      for (var i in rejectedProducts) {
        console.log(rejectedProducts[i]);
      }
    });

  });
} catch (e) {
  console.error(e);
}
