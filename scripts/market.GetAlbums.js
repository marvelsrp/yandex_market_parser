var _ = require('lodash');
var fs = require('fs');

var VK = require('./libs/connectors/vk');
var ownerId = require('../config/vk').ownerId;
var shop = require('../dump/generateYML/price').shop;
var code = fs.readFileSync(__dirname + '/../execute/market.getAlbums', 'utf8');

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
    console.log('write config/marketAlbums.json', response.response.count);
    fs.writeFileSync('../config/marketAlbums.json', JSON.stringify(response.response.items, null, 2));
  }
});