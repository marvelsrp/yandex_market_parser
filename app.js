var request = require("request");
var cheerio = require("cheerio");
var jsonfile = require('jsonfile');
var i = 0;
var links = [
    'http://decorsvadba.com/catalog/product/1762818',
    'http://decorsvadba.com/catalog/product/1762817',
    'http://decorsvadba.com/catalog/product/1762816',
    'http://decorsvadba.com/catalog/product/1762800',
    'http://decorsvadba.com/catalog/product/1762694',
    'http://decorsvadba.com/catalog/product/1762693',
    'http://decorsvadba.com/catalog/product/1762692',
    'http://decorsvadba.com/catalog/product/1762691',
    'http://decorsvadba.com/catalog/product/1762690',
    'http://decorsvadba.com/catalog/product/1762689',
    'http://decorsvadba.com/catalog/product/1762688',
    'http://decorsvadba.com/catalog/product/1762687',
    'http://decorsvadba.com/catalog/product/1762686',
    'http://decorsvadba.com/catalog/product/1762685',
    'http://decorsvadba.com/catalog/product/1762684',
    'http://decorsvadba.com/catalog/product/1762683',
    'http://decorsvadba.com/catalog/product/1762682',
    'http://decorsvadba.com/catalog/product/1762681',
    'http://decorsvadba.com/catalog/product/1762680',
    'http://decorsvadba.com/catalog/product/1762679',
    'http://decorsvadba.com/catalog/product/1762678',
    'http://decorsvadba.com/catalog/product/1762677',
    'http://decorsvadba.com/catalog/product/1762676',
    'http://decorsvadba.com/catalog/product/1762673',
    'http://decorsvadba.com/catalog/product/1762085',
    'http://decorsvadba.com/catalog/product/1752785',
    'http://decorsvadba.com/catalog/product/1752771',
    'http://decorsvadba.com/catalog/product/1752767',
    'http://decorsvadba.com/catalog/product/1752756',
    'http://decorsvadba.com/catalog/product/1747568',
    'http://decorsvadba.com/catalog/product/1744720',
    'http://decorsvadba.com/catalog/product/1743315',
    'http://decorsvadba.com/catalog/product/1743309',
    'http://decorsvadba.com/catalog/product/1743303',
    'http://decorsvadba.com/catalog/product/1743298',
    'http://decorsvadba.com/catalog/product/1743297',
    'http://decorsvadba.com/catalog/product/1743279',
    'http://decorsvadba.com/catalog/product/1726152',
    'http://decorsvadba.com/catalog/product/1725403',
    'http://decorsvadba.com/catalog/product/1725402',
    'http://decorsvadba.com/catalog/product/1725401',
    'http://decorsvadba.com/catalog/product/1725400',
    'http://decorsvadba.com/catalog/product/1725399',
    'http://decorsvadba.com/catalog/product/1725398',
    'http://decorsvadba.com/catalog/product/1725397',
    'http://decorsvadba.com/catalog/product/1725396',
    'http://decorsvadba.com/catalog/product/1723796',
    'http://decorsvadba.com/catalog/product/1723793',
    'http://decorsvadba.com/catalog/product/1723791',
    'http://decorsvadba.com/catalog/product/1723790',
    'http://decorsvadba.com/catalog/product/1723785',
    'http://decorsvadba.com/catalog/product/1723783',
    'http://decorsvadba.com/catalog/product/1723778',
    'http://decorsvadba.com/catalog/product/1723777',
    'http://decorsvadba.com/catalog/product/1723774',
    'http://decorsvadba.com/catalog/product/1723772',
    'http://decorsvadba.com/catalog/product/1723771',
    'http://decorsvadba.com/catalog/product/1723770',
    'http://decorsvadba.com/catalog/product/1723768',
    'http://decorsvadba.com/catalog/product/1723767',
    'http://decorsvadba.com/catalog/product/1723765',
    'http://decorsvadba.com/catalog/product/1723764',
    'http://decorsvadba.com/catalog/product/1723746',
    'http://decorsvadba.com/catalog/product/1723745',
    'http://decorsvadba.com/catalog/product/1723744',
    'http://decorsvadba.com/catalog/product/1723743',
    'http://decorsvadba.com/catalog/product/1723741',
    'http://decorsvadba.com/catalog/product/1723740',
    'http://decorsvadba.com/catalog/product/1723739',
    'http://decorsvadba.com/catalog/product/1723738',
    'http://decorsvadba.com/catalog/product/1723737',
    'http://decorsvadba.com/catalog/product/1723736',
    'http://decorsvadba.com/catalog/product/1723735',
    'http://decorsvadba.com/catalog/product/1723734',
    'http://decorsvadba.com/catalog/product/1723733',
    'http://decorsvadba.com/catalog/product/1722279',
    'http://decorsvadba.com/catalog/product/1722276',
    'http://decorsvadba.com/catalog/product/1722274',
    'http://decorsvadba.com/catalog/product/1722267',
    'http://decorsvadba.com/catalog/product/1722252',
    'http://decorsvadba.com/catalog/product/1719177',
    'http://decorsvadba.com/catalog/product/1719176',
    'http://decorsvadba.com/catalog/product/1707446',
    'http://decorsvadba.com/catalog/product/1707445',
    'http://decorsvadba.com/catalog/product/1679327',
    'http://decorsvadba.com/catalog/product/1679326',
    'http://decorsvadba.com/catalog/product/1679325',
    'http://decorsvadba.com/catalog/product/1679324',
    'http://decorsvadba.com/catalog/product/1679323',
    'http://decorsvadba.com/catalog/product/1679322',
    'http://decorsvadba.com/catalog/product/1679321',
    'http://decorsvadba.com/catalog/product/1679320',
    'http://decorsvadba.com/catalog/product/1679319',
    'http://decorsvadba.com/catalog/product/1679318',
    'http://decorsvadba.com/catalog/product/1679316',
    'http://decorsvadba.com/catalog/product/1659848',
    'http://decorsvadba.com/catalog/product/1659847',
    'http://decorsvadba.com/catalog/product/1659845',
    'http://decorsvadba.com/catalog/product/1659843',
    'http://decorsvadba.com/catalog/product/1659842',
    'http://decorsvadba.com/catalog/product/1659805',
    'http://decorsvadba.com/catalog/product/1659804',
    'http://decorsvadba.com/catalog/product/1659803',
    'http://decorsvadba.com/catalog/product/1659802',
    'http://decorsvadba.com/catalog/product/1659801',
    'http://decorsvadba.com/catalog/product/1659800',
    'http://decorsvadba.com/catalog/product/1659799',
    'http://decorsvadba.com/catalog/product/1659798',
    'http://decorsvadba.com/catalog/product/1659797',
    'http://decorsvadba.com/catalog/product/1659796',
    'http://decorsvadba.com/catalog/product/1659795',
    'http://decorsvadba.com/catalog/product/1658911',
    'http://decorsvadba.com/catalog/product/1658910',
    'http://decorsvadba.com/catalog/product/1658909',
    'http://decorsvadba.com/catalog/product/1658908',
    'http://decorsvadba.com/catalog/product/1658907',
    'http://decorsvadba.com/catalog/product/1626658',
    'http://decorsvadba.com/catalog/product/1626655',
    'http://decorsvadba.com/catalog/product/1622184',
    'http://decorsvadba.com/catalog/product/1622183',
    'http://decorsvadba.com/catalog/product/1622182',
    'http://decorsvadba.com/catalog/product/1622180',
    'http://decorsvadba.com/catalog/product/1619598',
    'http://decorsvadba.com/catalog/product/1619594',
    'http://decorsvadba.com/catalog/product/1619589',
    'http://decorsvadba.com/catalog/product/1619567',
    'http://decorsvadba.com/catalog/product/1619545',
    'http://decorsvadba.com/catalog/product/1619362',
    'http://decorsvadba.com/catalog/product/1614155',
    'http://decorsvadba.com/catalog/product/1609809',
    'http://decorsvadba.com/catalog/product/1609808',
    'http://decorsvadba.com/catalog/product/1582421',
    'http://decorsvadba.com/catalog/product/1582420',
    'http://decorsvadba.com/catalog/product/1582419',
    'http://decorsvadba.com/catalog/product/1582418',
    'http://decorsvadba.com/catalog/product/1582417',
    'http://decorsvadba.com/catalog/product/1582416',
    'http://decorsvadba.com/catalog/product/1582415',
    'http://decorsvadba.com/catalog/product/1582414',
    'http://decorsvadba.com/catalog/product/1582412',
    'http://decorsvadba.com/catalog/product/1582411',
    'http://decorsvadba.com/catalog/product/1582410',
    'http://decorsvadba.com/catalog/product/1582409',
    'http://decorsvadba.com/catalog/product/1582408',
    'http://decorsvadba.com/catalog/product/1582407',
    'http://decorsvadba.com/catalog/product/1581987',
    'http://decorsvadba.com/catalog/product/1581985',
    'http://decorsvadba.com/catalog/product/1569857',
    'http://decorsvadba.com/catalog/product/1563247',
    'http://decorsvadba.com/catalog/product/1562733',
    'http://decorsvadba.com/catalog/product/1561643',
    'http://decorsvadba.com/catalog/product/1548932',
    'http://decorsvadba.com/catalog/product/1547330',
    'http://decorsvadba.com/catalog/product/1547329',
    'http://decorsvadba.com/catalog/product/1547328',
    'http://decorsvadba.com/catalog/product/1547327',
    'http://decorsvadba.com/catalog/product/1547326',
    'http://decorsvadba.com/catalog/product/1547325',
    'http://decorsvadba.com/catalog/product/1547324',
    'http://decorsvadba.com/catalog/product/1542495',
    'http://decorsvadba.com/catalog/product/1542489',
    'http://decorsvadba.com/catalog/product/1542332',
    'http://decorsvadba.com/catalog/product/1542331',
    'http://decorsvadba.com/catalog/product/1542330',
    'http://decorsvadba.com/catalog/product/1542329',
    'http://decorsvadba.com/catalog/product/1542328',
    'http://decorsvadba.com/catalog/product/1541371',
    'http://decorsvadba.com/catalog/product/1541370',
    'http://decorsvadba.com/catalog/product/1541369',
    'http://decorsvadba.com/catalog/product/1541368',
    'http://decorsvadba.com/catalog/product/1541367',
    'http://decorsvadba.com/catalog/product/1541366',
    'http://decorsvadba.com/catalog/product/1541365',
    'http://decorsvadba.com/catalog/product/1541364',
    'http://decorsvadba.com/catalog/product/1541363',
    'http://decorsvadba.com/catalog/product/1541361',
    'http://decorsvadba.com/catalog/product/1541360',
    'http://decorsvadba.com/catalog/product/1539034',
    'http://decorsvadba.com/catalog/product/1539033',
    'http://decorsvadba.com/catalog/product/1539032',
    'http://decorsvadba.com/catalog/product/1539031',
    'http://decorsvadba.com/catalog/product/1539030',
    'http://decorsvadba.com/catalog/product/1539029',
    'http://decorsvadba.com/catalog/product/1539028',
    'http://decorsvadba.com/catalog/product/1539027',
    'http://decorsvadba.com/catalog/product/1539026',
    'http://decorsvadba.com/catalog/product/1539025',
    'http://decorsvadba.com/catalog/product/1537905',
    'http://decorsvadba.com/catalog/product/1537901',
    'http://decorsvadba.com/catalog/product/1537897',
    'http://decorsvadba.com/catalog/product/1537893',
    'http://decorsvadba.com/catalog/product/1532452',
    'http://decorsvadba.com/catalog/product/1532451',
    'http://decorsvadba.com/catalog/product/1532450',
    'http://decorsvadba.com/catalog/product/1532170',
    'http://decorsvadba.com/catalog/product/1532169',
    'http://decorsvadba.com/catalog/product/1532166',
    'http://decorsvadba.com/catalog/product/1532149',
    'http://decorsvadba.com/catalog/product/1532148',
    'http://decorsvadba.com/catalog/product/1532146',
    'http://decorsvadba.com/catalog/product/1532145',
    'http://decorsvadba.com/catalog/product/1532143',
    'http://decorsvadba.com/catalog/product/1532142',
    'http://decorsvadba.com/catalog/product/1532141',
    'http://decorsvadba.com/catalog/product/1532140',
    'http://decorsvadba.com/catalog/product/1532139',
    'http://decorsvadba.com/catalog/product/1532130',
    'http://decorsvadba.com/catalog/product/1532129',
    'http://decorsvadba.com/catalog/product/1532128',
    'http://decorsvadba.com/catalog/product/1532127',
    'http://decorsvadba.com/catalog/product/1532126',
    'http://decorsvadba.com/catalog/product/1532125',
    'http://decorsvadba.com/catalog/product/1532124',
    'http://decorsvadba.com/catalog/product/1532123',
    'http://decorsvadba.com/catalog/product/1532122',
    'http://decorsvadba.com/catalog/product/1532121',
    'http://decorsvadba.com/catalog/product/1532120',
    'http://decorsvadba.com/catalog/product/1532119',
    'http://decorsvadba.com/catalog/product/1532115',
    'http://decorsvadba.com/catalog/product/1532114',
    'http://decorsvadba.com/catalog/product/1532113',
    'http://decorsvadba.com/catalog/product/1532107'
];
var products = [];

function parse_products(index){

  if (!index){
    index = 0;
  }
  console.log((index / (links.length - 1) * 100).toFixed(2) + '%' );
  if (index > links.length - 1){
    console.log('write to file');
    jsonfile.writeFileSync('products.json', products, {spaces: 2}, function (err) {
      console.error(err)
    });
    return;
  }
  var url = links[index];
  var promise = new Promise(function(resolve, reject) {
    request({
      uri: url
    }, function(error, response, body) {
      if (i > 0) {
        return;
      }
      var $ = cheerio.load(body);
      var product = {};
      product.link = url;
      product.title = $('.prod-title').text();
      product.short_desc = $('.prod-description div').text();
      product.sku_number = $('.sku_number').text().replace("Код товара:", "").trim();
      product.category = {
        link: $('.sku_number + a').attr('href'),
        name: $('.sku_number + a').text()
      };

      product.price = parseInt($('.prod-price').text().replace("\r\n", "").trim());
      product.long_desc = $('#tabs-1 .editor-data').text().replace("\r\n", "").trim();
      product.options = {};
      $('#tabs-2 .prod-options tr').each(function () {
        var title = $(this).find('.option-row').text();
        var value = $(this).find('.value-row').text();
        product.options[title] = value;
      });
      product.opt = {};
      product.opt.from = parseInt($('#tabs-3 .prod-options .value-row').text().replace("c", "").replace("ед.", "").trim());
      product.opt.price = parseInt($('#tabs-3 .prod-options .option-row').text());
      product.img = {
        main: null,
        list: {
          large: [],
          original: []
        }
      };

      $('.zoom-outer .sk-img').each(function () {
        var src = $(this).attr("src");
        if (src.indexOf('large') != -1) {
          product.img.list.large.push(src);
        } else {
          product.img.list.original.push(src);
        }
      });
      product.img.main = {
        large: product.img.list.large[0],
        original: product.img.list.original[0]
      };
      product.img.list.large.shift();
      product.img.list.original.shift();
      products.push(product);
      resolve();
    });
  });
  promise.then(function(){
    parse_products(index + 1);
  })
}
//function parse_catalog(url){
//
//}
//
//request({
//  uri: "http://decorsvadba.com/sitemap.xml"
//}, function(error, response, body) {
//   var $ = cheerio.load(body);
//  console.log('download sitemap.xml');
//
//  $("url loc").each(function() {
//    var link = $(this).text();
//    if (link.indexOf('catalog/sub_cat') != -1){
//      parse_catalog(link);
//    }
//    if (link.indexOf('catalog/product') != -1){
//      parse_product(link);
//    }
//
//  });
//  console.log(links);
//});
//
//
parse_products();
