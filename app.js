var request = require('request');
var cheerio = require('cheerio');
var js2xmlparser = require('js2xmlparser');
var fs = require('fs');

var offers_links = [];
var categories_links = [];
String.prototype.ucFirst = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

function getOffers() {
  console.log('getOffers');
  var links = offers_links;
  var offers = [];
  return new Promise(function(resolve, reject) {

    var parseOffer = function(index) {
      console.log('parseOffer', index);
      var url = links[index];
      var nextIndex = index + 1;
      request({
        uri: url
      }, function(error, response, body) {
        var $ = cheerio.load(body);
        var offer = {};
        var categoryId = parseInt($('.breadcrumbs a:nth-of-type(2)').attr('href').split('/')[3]);

        offer['@'] = {
          id: url.split('/')[5],
          available: true,
          //type: 'vendor.model',
          bid: 1
        };
        offer.url = url;
        offer.delivery = true;
        offer['delivery-options'] = [];

        var delivery_cost;
        switch (categoryId){
          case 108382://наборы
          case 119292://подарки хендмайд
            delivery_cost = 80;
            break;
          case 108368://бокалы
          case 108371://казна
          case 108370://букеты
          case 119291://иконы
            delivery_cost = 60;
            break;
          default:
            delivery_cost = 50;
        }
        offer['delivery-options'].push(
          {
            '@': {
              cost: delivery_cost,
              days: ''
            }
          }
        );
        offer.cpa = 1;
        offer.country_of_origin = 'Украина';
        //offer.typePrefix = $('.breadcrumbs a:nth-of-type(2)').text();
        var price = parseFloat($('.prod-price').text().replace('\r\n', '').trim());
        offer.price = (price < 1) ? price: parseInt(price);
        //if(price  > 100) {
        //  offer.oldprice = parseInt(offer.price * 1.2);
        //}

        offer.currencyId = 'UAH';
        offer.name = $('.prod-title').text();
        switch (categoryId){
          case 108387:
          case 119292://подарки хендмайд
            offer.market_category = 'Все товары/Досуг и развлечения/Книги/Дом, семья, досуг/Рукоделие';
            break;
          case 108382://наборы
          case 108368://бокалы
          case 108371://казна
          case 108370://букеты
          case 108375://свечи
          case 108385://подушечки
          case 108383://шампанское
          case 108376://конкурсы
            offer.market_category = 'Все товары/Одежда, обувь и аксессуары/Женская одежда/Свадебная мода/Аксессуары';
            break;
          case 108369://бутоньерка
          case 108384://украш. на машину
          case 108386://стол
          case 108390://прическа
            offer.market_category = 'Все товары/Подарки и цветы/Товары для праздников/Свадебные украшения';
            break;
          case 119291://икона
            offer.market_category = 'Все товары/Подарки и цветы/Предметы искусства/Иконы';
            break;
          default:
            offer.market_category = 'Все товары/Одежда, обувь и аксессуары/Женская одежда/Свадебная мода';
        }

        //offer.vendor = 'Свадебный декор';
        //offer.model = $('.prod-title').text();
        offer.description = $('.prod-description div').text(); //$('#tabs-1 .editor-data').text().replace("\r\n", "").trim();
        offer.sales_notes = 'Минимальная сумма заказа 100 грн';

        offer.categoryId = categoryId;
        offer.param = [];
        $('#tabs-2 .prod-options tr').each(function() {
          var name = $(this).find('.value-row').text();
          var param = {
            '@': {
              name: $(this).find('.option-row').text()
            },
            '#': name.ucFirst()
          };
          offer.param.push(param);
        });

        offer.picture = [];
        $('.zoom-outer .sk-img').each(function() {
          var src = 'http://decorsvadba.com/' + $(this).attr('src');
          if (src.indexOf('large') === -1) {
            offer.picture.push(src);
          }
        });

        offers.push(offer);
        if (nextIndex === links.length) {
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

function getCategories() {
  console.log('getCategories');
  var links = categories_links;
  var categories = [];

  return new Promise(function(resolve, reject) {

    var parseCategory = function(index) {
      console.log('parseCategory', index);
      var url = links[index];
      var nextIndex = index + 1;
      request({
        uri: url
      }, function(error, response, body) {
        var $ = cheerio.load(body);
        var name = $('.sb-caption-name').text();
        var category = {
          '@': {
            id: url.split('/')[5]
          },
          '#': name.substr(7, name.length -1)
        };
        categories.push(category);
        if (nextIndex === links.length) {
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
function getCatalogInfo() {
  console.log('getCatalogInfo');
  var date = new Date();
  function pad(n) {return n < 10 ? '0' + n : n;}

  var data = {
    '@': {
        'date': date.getUTCFullYear() + '-' +
        pad(date.getUTCMonth() + 1) + '-' +
        pad(date.getUTCDate()) + ' ' +
        pad(date.getUTCHours()) + ':' +
        pad(date.getUTCMinutes())

      },
    shop: {
        name: 'Decorsvadba',
        company: 'Свадебный декор',
        url: 'http://decorsvadba.com',
        email: 'decornasvadby@yandex.com',
        'delivery-options' : [
          {
            '@': {
              cost: 50,
              days: ''
            }
          }
        ],
        currencies: [
            {
              '@': {
                id: 'UAH',
                rate: 1,
                plus:  5
              }
            }
        ]
      }
  };
  var promises = [];
  promises.push(getOffers());
  promises.push(getCategories());

  return Promise.all(promises).then(
    function(values) {
      console.log('Promise.all resolve!');
      data.shop.categories = values[1];
      data.shop.offers = values[0];
      return js2xmlparser('yml_catalog', data, {
        arrayMap: {
          currencies: 'currency',
          categories: 'category',
          offers: 'offer',
          'delivery-options':'option'
        }
      });
    }
  );
}

function getLinks() {
  console.log('getLinks');
  return new Promise(function(resolve, reject) {
    request({
      uri: 'http://decorsvadba.com/sitemap.xml'
    }, function(error, response, body) {
      var $ = cheerio.load(body);
      console.log('download sitemap.xml');

      $('url loc').each(function() {
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

getLinks().then(function() {
  return getCatalogInfo();
}).then(function(data) {
  fs.writeFile('price.yml', data, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log('YML was generated!');
  });
});
