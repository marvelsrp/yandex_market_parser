var request = require("request");
var cheerio = require("cheerio");
var js2xmlparser = require("js2xmlparser");
var fs = require('fs');

var offers_links = [];
var categories_links = [];


function getOffers(){
  console.log('getOffers');
  var links = offers_links;
  var offers = [];
  return new Promise(function(resolve, reject) {

    var parseOffer = function(index){
      console.log('parseOffer', index);
      var url = links[index];
      var nextIndex = index + 1;
      request({
        uri: url
      }, function(error, response, body) {
        var $ = cheerio.load(body);
        var offer = {};
        offer['@'] = {
          id: url.split('/')[5],
          available: true,
          bid: 1
        };
        offer.url = url;
        offer.pickup = true;
        offer.delivery = true;
        offer.cpa = true;
        offer.country_of_origin = 'Украина';
        offer.price = parseInt($('.prod-price').text().replace("\r\n", "").trim());
        offer.currencyId = 'UAH';
        offer.name = $('.prod-title').text();
        offer.vendor = 'Свадебный декор';
        offer.description = $('.prod-description div').text(); //$('#tabs-1 .editor-data').text().replace("\r\n", "").trim();
        offer.sales_notes = 'Необходима предоплата.';

        offer.categoryId = $('.breadcrumbs a:nth-of-type(2)').attr('href').split('/')[5];
        offer.param = [];
        $('#tabs-2 .prod-options tr').each(function () {
          var param = {
            '@': {
              name: $(this).find('.option-row').text()
            },
            '#': $(this).find('.value-row').text()
          };
          offer.param.push(param);
        });

        offer.picture = [];
        $('.zoom-outer .sk-img').each(function () {
          var src = $(this).attr("src");
          if (src.indexOf('large') === -1) {
            offer.picture.push(src);
          }
        });
        offers.push(offer);
        if (nextIndex === links.length ){
          console.log('getOffers resolve');
          resolve(offers);
        } else {
          parseOffer(nextIndex);
        }
      });
    };
    parseOffer(0);
  });
}

function getCategories(){
  console.log('getCategories');
  var links = categories_links;
  var categories = [];

  return new Promise(function(resolve, reject) {

    var parseCategory = function(index){
      console.log('parseCategory', index);
      var url = links[index];
      var nextIndex = index + 1;
      request({
        uri: url
      }, function (error, response, body) {
        var $ = cheerio.load(body);
        var category = {
          '@': {
            id: url.split('/')[5]
          },
          '#': $('.sb-caption-name').text()
        };
        categories.push(category);
        if (nextIndex === links.length ){
          console.log('getCategories resolve');
          resolve(categories);
        } else {
          parseCategory(nextIndex);
        }
      });
    };

    parseCategory(0);
  });
}
function getCatalogInfo(){
  console.log('getCatalogInfo');
  var date = new Date();
  function pad(n) {return n<10 ? '0'+n : n}
  var data = {
      '@': {
        "date": date.getUTCFullYear()+'-'
        + pad(date.getUTCMonth()+1)+'-'
        + pad(date.getUTCDate())+' '
        + pad(date.getUTCHours())+':'
        + pad(date.getUTCMinutes())

      },
      shop: {
        name: 'Decorsvadba',
        company: 'Свадебный декор',
        url: 'http://decorsvadba.com',
        email: 'decornasvadby@yandex.com',
        currencies: [
            {
              '@': {
                id: 'UAH',
                rate: 'NBU',
                plus:  5
              }
            }
        ],
        categories: [],
        'delivery-options': [],
        cpa: [],
        offers: []
      }
  };
  var promises = [];
  promises.push(getOffers());
  promises.push(getCategories());

  return Promise.all( promises ).then(
    function( values ) {
      console.log('Promise.all resolve!');
      data.offers = values[0];
      data.categories = values[1];
      return js2xmlparser('yml_catalog', data, {
        arrayMap: {
          currencies: "currency",
          categories: "category"
        }
      });
    }
  );
}


function getLinks(){
  console.log('getLinks');
  return new Promise(function(resolve, reject) {
    request({
      uri: "http://decorsvadba.com/sitemap.xml"
    }, function (error, response, body) {
      var $ = cheerio.load(body);
      console.log('download sitemap.xml');

      $("url loc").each(function () {
        var link = $(this).text();
        if (link.indexOf('catalog/sub_cat') != -1) {
          categories_links.push(link);
        }
        if (link.indexOf('catalog/product') != -1) {
          offers_links.push(link);
        }
      });
      console.log('getLinks resolve');
      resolve(offers_links, categories_links);
    });
  });
}

getLinks().then(function(){
  return getCatalogInfo();
}).then(function(data){
  fs.writeFile("price.yml", data, function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("YML was generated!");
  });
});
