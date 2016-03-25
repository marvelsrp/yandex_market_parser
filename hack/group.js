var likesFM = require('../connectors/likesFM');
var vk = require('../connectors/vk');
var sleep = require('../lib/sleep');
var deferred = require('deferred');
var groupHack = {
  init: (tasks) => {
    if (tasks.hasOwnProperty('group') && tasks.group.length !== 0) {
      return groupHack.process(0, tasks.group);
    }
  },
  process: (i, groups) => {
    var def = deferred();
    if (i >= groups.length) {
      return Promise.resolve();
    }
    var id = groups[i].id;
    console.log('groupHack process', id);

    return likesFM.openOffer(id, 'group').then(() => {
      return sleep(100);
    }).then(() => {
      vk.joinGroup(id).then(() => {
        sleep(1000).then(() => {
          likesFM.doOffers(id, 'group').then(() => {
            console.info('group + 1');
            groupHack.process(i + 1, groups).then(() => {
              def.resolve();
            },() => {
              def.reject();
            });
          });
        });
      }, (e) => {
        console.info('group catch', e);
        groupHack.process(i + 1, groups).then(() => {
          def.resolve();
        },() => {
          def.reject();
        });
      });
    });

    return def.promise;
  }
};

module.exports = groupHack;
