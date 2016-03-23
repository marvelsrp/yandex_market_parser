var likesFM = require('../connectors/likesFM');
var vk = require('../connectors/vk');
var sleep = require('../lib/sleep');
var groupHack = {
  init: (tasks) => {
    if (tasks.hasOwnProperty('group') && tasks.group.length !== 0) {
      return groupHack.process(0, tasks.group);
    }
  },
  process: (i, groups) => {
    if (i >= groups.length) {
      return Promise.resolve();
    }
    var id = groups[i].id;
    console.log('groupHack process', id);

    return likesFM.openOffer(id, 'group').then(() => {
      return sleep(100);
    }).then(() => {
      return vk.joinGroup(id);
    }, (e) => {
      console.log('vk group reject', e);
      groupHack.process(i + 1, groups);
      return Promise.reject();
    }).then(() => {
      return sleep(1000);
    }).then(() => {
      return likesFM.doOffers(id, 'group');
    }).then(() => {
      return sleep(100);
    }).then(() => {
      console.log('+1');
      return groupHack.process(i + 1, groups);
    });
  }
};

module.exports = groupHack;
