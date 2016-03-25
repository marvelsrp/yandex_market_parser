var likesFM = require('../connectors/likesFM');
var vk = require('../connectors/vk');
var sleep = require('../lib/sleep');
var deferred = require('deferred');
var likeHack = {
  init: (tasks) => {
    console.log('likeHack init');
    if (tasks.hasOwnProperty('like') && tasks.like.length !== 0) {
      return likeHack.process(0, tasks.like);
    }
  },
  process: (i, likes) => {
    var def = deferred();
    var reject = false;
    if (i >= likes.length) {
      return def.resolve();
    }
    var id = likes[i].id;
    console.log('likeHack process', id);

    likesFM.openOffer(id, 'like').then(() => {
      return sleep(100);
    }).then(() => {
      console.log('before vk');
      vk.like(id).then(() => {
        console.log('after vk');
        sleep(1000).then(() => {
          likesFM.doOffers(id, 'like');
        }).then(() => {
          console.info('like + 1');
          likeHack.process(i + 1, likes).then(() => {
            def.resolve();
          },() => {
            def.reject();
          });
        });

      }, (e) => {
        console.log('vk like reject', e);
        return likeHack.process(i + 1, likes).then(() => {
          def.resolve();
        },() => {
          def.reject();
        });
      });

    });

    return def.promise;
  }

};

module.exports = likeHack;
