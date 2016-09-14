var VK = require('./libs/connectors/vk');
var _ = require('lodash');
var console = require('better-console');
var fs = require('fs');
var deferred = require('deferred');
var eachPromise = require('./libs/eachPromise');
//var geocoder = require('geocoder');
//geocoder.selectProvider('geonames',{'username':'marvelsrp'});
var membersList = fs.readFileSync(__dirname + '/../dump/VkGroupMembers_20160504_68100.txt', 'utf8').split('\r\n');
var membersChunks = _.chunk(membersList, 1000);
var membersResponse = [];
var csv = 'name,surname,city,photo,link';

var writeAnswer = () => {
  console.log('writeAnswer');

  return new Promise((resolve, reject) => {
    fs.writeFile(__dirname + '/../dump/groups.patriot/all.csv', csv, 'utf8', function(err) {
      if (err) {
        console.warn(err);
        return reject();
      }
      resolve();
    });
  });
};

function parseMembers() {
  var code = fs.readFileSync(__dirname + '/../execute/users.get', 'utf8');

  (function execute(i) {
    console.log('execute', i);
    var chunk = membersChunks[i];
    var realCode = code;
    realCode = _.replace(realCode, '%users_ids%', chunk.toString());
    realCode = _.replace(realCode, '%total%', 1);

    VK.execute(realCode).then((response) => {
      console.log(i + ' / ' + membersChunks.length, membersResponse.length);
      if (response.error) {
        console.error(response);
      } else {
        for (var j in response.response) {
          if (response.response[j].city) {
            csv += '\n';
            csv += response.response[j].first_name.replace('"', '').replace('\'', '')  + ',';
            csv += response.response[j].last_name.replace('"', '').replace('\'', '') + ',';
            csv += response.response[j].city.title + ',';
            csv += response.response[j].photo_50 + ',';
            csv += 'http://vk.com/id' + response.response[j].id;
          }
        }
        writeAnswer();
        if (i < membersChunks.length) {
          execute(i + 1);
        }
      }
    });
  })(0);
}

parseMembers();
