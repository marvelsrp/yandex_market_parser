var price = require('../dump/market.generateYML/price.json');
var fs = require('fs');
var keys = {
  'Наименование': 'model',
  'Цена': 'price',
  'Зачеркнутая цена': 'oldprice',
  'Валюта': 'currencyId',
  'Заголовок': 'title',
  'Описание': 'description',
  'Краткое описание': 'short_description',
  'META Keywords': 'meta_keywords',
  'META Description': 'meta_description'
};
var rows = [];


for(var i in price.shop.offers){
  var product = price.shop.offers[i];
  var productKeys = Object.values(keys);
  var row = [];
  for(var j in productKeys) {
    var key = productKeys[j];
    row.push(product[key])
  }
  for(var  k in product.picture){
    row.push(product.picture[k]);
  }

  rows.push(row);
}

var csv = Object.keys(keys).join(';') + 'Изображения;'+ 'Изображения;'+ 'Изображения;'+ 'Изображения;'+ 'Изображения;'+ 'Изображения;' + 'Изображения;'+ 'Изображения;'+ 'Изображения;'+ 'Изображения;'
for(var i in rows) {
  csv += rows[i].join(';') + '\n';
}
fs.writeFile('../dump/market.YMLToCSV/price.csv', csv, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('CSV was generated!');
});
