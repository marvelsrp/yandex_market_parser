var PARSER = require('./parser');
var parser = new PARSER();
var js2xmlparser = require('js2xmlparser');
var fs = require('fs');

parser.getLinks().then(function() {
  return parser.getCatalog();
}).then(function(data) {
  var xml = js2xmlparser('yml_catalog', data, {
    arrayMap: {
      currencies: 'currency',
      categories: 'category',
      offers: 'offer',
      'delivery-options':'option'
    }
  });
  fs.writeFile('price.yml', xml, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log('YML was generated!');
    fs.writeFile('price.json', JSON.serialize(data, null, 2), function(err) {
      if (err) {
        return console.log(err);
      }
      console.log('json was generated!', JSON.serialize(data, null, 2));
    });
  });


});
