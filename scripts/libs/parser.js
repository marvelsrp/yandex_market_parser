var request = require('request');
var cheerio = require('cheerio');

function ucFirst (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function pad(n) {return n < 10 ? '0' + n : n;}

class Parser {
  constructor(url) {
    this.offers_links = [];
    this.categories_links = [];
    this.offers_names = [];
    this.categories_names = [];
    this.url = url;
  }
  getLinks() {
    console.log('getLinks');
    return new Promise((resolve, reject) => {
      request({
        uri: this.url
      }, (error, response, body) => {
        var $ = cheerio.load(body);
        console.log('download sitemap.xml');

        $('url loc').each((i, element) => {
          var link = $(element).text();
          if (link.indexOf('catalog/sub_cat') != -1) {
            this.categories_links.push(link);
          }
          if (link.indexOf('catalog/product') != -1) {
            this.offers_links.push(link);
          }
        });

        resolve(this.offers_links, this.categories_links);
      });
    });
  }
  getOffers() {
    var links = this.offers_links;
    var offers = [];
    return new Promise((resolve, reject) => {

      var parseOffer = (index) => {
        console.log('parseOffer', index);
        var url = links[index];
        var nextIndex = index + 1;
        request({
          uri: url
        }, (error, response, body) => {
          let $ = cheerio.load(body);
          let offer = {};
          let categoryId = parseInt($('.breadcrumbs a:nth-of-type(2)').attr('href').split('/')[3]);

          offer['@'] = {
            id: url.split('/')[5],
            available: true,
            //type: 'vendor.model',
            bid: 1
          };
          offer.url = url;
          offer.delivery = true;
          offer['delivery-options'] = [];

          let delivery_cost;
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
          let price = parseFloat($('.prod-price').text().replace('\r\n', '').trim());
          offer.price = (price < 1) ? price : parseInt(price);
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
          $('#tabs-2 .prod-options tr').each((i, element) => {
            let name = $(element).find('.value-row').text();
            let param = {
              '@': {
                name: $(element).find('.option-row').text()
              },
              '#': ucFirst(name)
            };
            offer.param.push(param);
          });

          offer.picture = [];
          $('.zoom-outer .sk-img').each((i, element)=> {
            let src = 'http://decorsvadba.com' + $(element).attr('src');
            if (src.indexOf('large') === -1) {
              offer.picture.push(src);
            }
          });
          this.offers_names.push(offer.name);
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
  getCategories() {
    console.log('getCategories');
    var links = this.categories_links;
    var categories = [];

    return new Promise((resolve, reject) => {

      var parseCategory = (index) => {
        console.log('parseCategory', index);
        var url = links[index];
        var nextIndex = index + 1;
        request({
          uri: url
        }, (error, response, body) => {
          var $ = cheerio.load(body);
          var name = $('.sb-caption-name').text();
          var category = {
            '@': {
              id: url.split('/')[5]
            },
            '#': name.substr(7, name.length - 1)
          };
          this.categories_names.push(category.name);
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
  getCatalog() {
    console.log('getCatalog');
    var date = new Date();

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
    promises.push(this.getOffers());
    promises.push(this.getCategories());

    return Promise.all(promises).then((values) => {
      console.log('Promise.all resolve!');
      data.shop.categories = values[1];
      data.shop.offers = values[0];
      return data;
    }
  );
  }

}
module.exports = Parser;
