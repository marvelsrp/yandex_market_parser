var likesFM = require('../connectors/likesFM');
var vk = require('../connectors/vk');
var sleep = require('../lib/sleep');
var repostHack = {
  init: (tasks) => {
    console.log('repostHack init');
    if (tasks.hasOwnProperty('repost') && tasks.repost.length !== 0) {
      return repostHack.process(0, tasks.repost);
    }
  },
  process: (i, reposts) => {
    if (i >= reposts.length) {
      return Promise.resolve();
    }
    var id = reposts[i].id;
    console.log('repostHack process', id);

    return likesFM.openOffer(id, 'repost').then(() => {
      return sleep(100);
    }).then(() => {
      return vk.repost(id);
    }, (e) => {
      console.log('vk repost reject', e);
      repostHack.process(i + 1, reposts);
      return Promise.reject();
    }).then(() => {
      return sleep(1000);
    }).then(() => {
      return likesFM.doOffers(id, 'repost');
    }).then(() => {
      return sleep(100);
    }).then(() => {
      console.log('+1');
      return repostHack.process(i + 1, reposts);
    });
  }
};

module.exports = repostHack;
