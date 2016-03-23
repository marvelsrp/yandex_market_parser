var likesFM = require('../connectors/likesFM');
var vk = require('../connectors/vk');
var sleep = require('../lib/sleep');
var likeHack = {
  init: (tasks) => {
    console.log('likeHack init');
    if (tasks.hasOwnProperty('like') && tasks.like.length !== 0) {
      return likeHack.process(0, tasks.like);
    }
  },
  process: (i, likes) => {
    if (i >= likes.length) {
      return Promise.resolve();
    }
    var id = likes[i].id;
    console.log('likeHack process', id);

    return likesFM.openOffer(id, 'like').then(() => {
      return sleep(100);
    }).then(() => {
      return vk.like(id);
    }, (e) => {
      console.log('vk like reject', e);
      likeHack.process(i + 1, likes);
      return Promise.reject();
    }).then(() => {
      return sleep(1000);
    }).then(() => {
      return likesFM.doOffers(id, 'like');
    }).then(() => {
      return sleep(100);
    }).then(() => {
      console.log('+1');
      return likeHack.process(i + 1, likes);
    });

  }
};

module.exports = likeHack;
