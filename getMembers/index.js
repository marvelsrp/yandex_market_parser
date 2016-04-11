var VK = require('./../connectors/vk');
var _ = require('lodash');
var sleep = require('./../lib/sleep');
var colors = require('colors');
var console = require('better-console');
var fs = require('fs');
var deferred = require('deferred');
var groups = ['fotoodessa','virbox360','prazdnikvshokolade_kh',
  'svadba_video_melnichenko', 'discoverwedding', 'rent_decorations','ats.foto', 'romantic_dp', 'nechaeva_dp',
  'shepankova', 'nesterenko_yuliya','1fineday','vasha_svadba_dnepr', 'euro_svadba', '54518846',
  'weddings_stuff','wedding.details','stylemepretty','lulusvadba','svadba_kr','svadba','detail_wed'];

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

  var parseGroupOffset = (offset) => {
    var id = groups[i];
    console.info(id, peoples.length);
    try {
      VK.getMembers(id, offset).then((answer) => {

        for (var j in answer.peoples) {
          peoples.push(answer.peoples[j]);
        }

        console.warn((offset + 1000) + '/' + answer.count);

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
  parseGroupOffset(0);
}

parseGroup(0);
