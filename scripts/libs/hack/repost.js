var likesFM = require('../connectors/likesFM');
var vk = require('../connectors/vk');
var sleep = require('../sleep');
var deferred = require('deferred');
var repostHack = {
  init: (tasks) => {
    console.log('repostHack init');
    if (tasks.hasOwnProperty('repost') && tasks.repost.length !== 0) {
      return repostHack.process(0, tasks.repost);
    }
  },
  process: (i, reposts) => {
    var def = deferred();
    if (i >= reposts.length) {
      return Promise.resolve();
    }
    var id = reposts[i].id;
    console.log('repostHack process', id);

    likesFM.openOffer(id, 'repost').then(() => {
      return sleep(100);
    }).then(() => {
      vk.repost(id).then(() => {
        sleep(1000).then(() => {
          likesFM.doOffers(id, 'repost');
        }).then(() => {
          console.info('repost + 1');
          likeHack.process(i + 1, reposts).then(() => {
            def.resolve();
          },() => {
            def.reject();
          });
        });

      }, (e) => {
        console.log('vk repost reject', e);
        return repostHack.process(i + 1, reposts).then(() => {
          def.resolve();
        },() => {
          def.reject();
        });
      });

    });
    return def.promise;
  }
};

module.exports = repostHack;
