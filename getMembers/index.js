var VK = require('./../connectors/vk');
var _ = require('lodash');
var sleep = require('./../lib/sleep');
var colors = require('colors');
var console = require('better-console');
var fs = require('fs');
var task = require('./task');
var deferred = require('deferred');
var groups = ['fotoodessa','virbox360','prazdnikvshokolade_kh',
  'svadba_video_melnichenko', 'discoverwedding', 'rent_decorations','ats.foto', 'romantic_dp', 'nechaeva_dp',
  'shepankova', 'nesterenko_yuliya','1fineday','vasha_svadba_dnepr', 'euro_svadba', '54518846',
  'weddings_stuff','wedding.details','stylemepretty','lulusvadba','svadba_kr','detail_wed', 'ssvadba'];

var writeTask = (index, id) => {
  var params = {
    index: index,
    group: id
  };
  return new Promise((resolve, reject) => {
    fs.writeFile('getMembers/task.json', JSON.stringify(params, null, 2), 'utf8', function(err) {
      if (err) {
        console.warn(err);
        return reject();
      }

      console.log('     write task.json', id);
      resolve(params);
    });
  });
};

var writeAnswer = (name, peoples) => {
  console.info('writeAnswer', name, peoples.length);

  var dateStr = new Date().toLocaleDateString();
  var dumpDir = 'getMembers/dump/' + dateStr;

  try {
    fs.mkdirSync(dumpDir);
  } catch (e) {
    if (e.code != 'EEXIST') throw e;
  }

  return new Promise((resolve, reject) => {
    fs.writeFile(dumpDir + '/' + name + '.json', JSON.stringify(peoples, null, 2), 'utf8', function(err) {
      if (err) {
        console.warn(err);
        return reject();
      }

      console.log('     write ' + name + '.json', peoples.length);
      resolve();
    });
  });
};

function parseGroup(i) {
  console.log('parseGroup', i);
  var peoples = [];
  var id = groups[i];
  var parseGroupOffset = (offset) => {
    console.info(id, peoples.length);
    try {
      VK.getMembers(id, offset).then((response) => {


        var ukraineWomans = _.filter(response.response.items, function(people) {
          return people.sex === 1 && people.country && people.country.title == 'Украина';
        });

        var ukraineWomansId = _.map(ukraineWomans, function(people) {
          return people.id;
        });

        console.info(params.group_id + ' +' + ukraineWomansId.length);

        for (var j in ukraineWomansId) {
          peoples.push(ukraineWomansId[j]);
        }

        console.warn((offset + 1000) + '/' + response.response.count);

        if (offset + 1000 <= answer.count) {
          parseGroupOffset(offset + 1000);
        } else {
          writeAnswer(id, peoples).then(() => {
            if (parseInt(i) + 1 < groups.length) {
              parseGroup (parseInt(i) + 1, 0);
            } else {
              console.info('DONE =)');
            }

          });
        }
      }, (e) => {
        console.warn('getMembers catch', e);
      });
    } catch (e) {
      console.warn('total catch', e);
    }
  };
  writeTask(i, id).then(() => {
    parseGroupOffset(0);
  });
}

parseGroup(task.index);
