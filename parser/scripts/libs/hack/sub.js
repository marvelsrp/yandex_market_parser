var likesFM = require('../connectors/likesFM');
var vk = require('../connectors/vk');
var sleep = require('../sleep');
var subHack = {
  init: (tasks) => {
    console.log('subHack init');
    if (tasks.hasOwnProperty('sub') && tasks.sub.length !== 0) {
      return subHack.process(0, tasks.sub);
    }
  },
  process: (i, subs) => {
    if (i >= subs.length) {
      return Promise.resolve();
    }
    var id = subs[i].id;
    console.log('subHack process', id);

    return likesFM.openOffer(id, 'sub').then(() => {
      return sleep(100);
    }).then(() => {
      return vk.addFriend(id);
    }, (e) => {
      console.log('vk sub reject', e);
      subHack.process(i + 1, subs);
      return Promise.reject();
    }).then(() => {
      return sleep(1000);
    }).then(() => {
      return likesFM.doOffers(id, 'sub');
    }).then(() => {
      return sleep(100);
    }).then(() => {
      console.log('+1');
      return subHack.process(i + 1, subs);
    });
  }
};

module.exports = subHack;
