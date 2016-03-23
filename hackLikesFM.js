var likesFM = require('./likesFM');
var vk = require('./vk');

var sleep = (time) => {
  console.log('sleep', time);
  return new Promise((resolve) => {
    var stop = new Date().getTime();
    while (new Date().getTime() < stop + time) {

    }
    resolve();
  });
};

likesFM.getOffers().then((tasks) => {
  for (var i in tasks.like) {
    var id = tasks.like[i].id;
    likesFM.openOffer(id, 'like').then(() => {
      return sleep(1000);
    }).then(() => {
      return likesFM.doOffers(id);
    }).then(() => {
      return sleep(1000);
    }).then(() => {
      return vk.addLike(id);
    }).then(() => {
      return sleep(1000);
    }).then(() => {
      return likesFM.doOffers(id);
    }).then(() => {
      return sleep(1000);
    }).then(() => {
      return likesFM.getState();
    }).then((state) => {
      console.log('state', state);
    });

    return;
  }
});
