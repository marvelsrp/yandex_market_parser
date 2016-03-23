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
var sendLike = (i, likes) => {


  if (i >= likes.length) {
    console.log('sendLike resolve!', i , likes.length);
    return Promise.resolve();
  }
  var id = likes[i].id;
  console.log('sendLike', i, id);

  if (id.indexOf('wall') != -1) {
    return sendLike(i + 1, likes);
  }
  return likesFM.openOffer(id, 'like').then(() => {
    return sleep(100);
  }).then(() => {
    return vk.addLike(id);
  }, () => {
    console.log('ignore group');
    return sendLike(i + 1, likes);
  }).then(() => {
    return sleep(1000);
  }).then(() => {
    return likesFM.doOffers(id, 'like');
  }).then(() => {
    return sleep(100);
  }).then(() => {
    console.log('+1');
    return sendLike(i + 1, likes);
  });

};
var getOffers = () => {
  console.log('reset getOffers');
  return likesFM.getOffers().then((tasks) => {
    console.log(tasks.like);
    if (tasks.like.length === 0){
      return sleep(5000).then(() => {
        return getOffers();
      });
    } else {
      return sendLike(0, tasks.like);
    }

  }).then(() => {
    return getOffers();
  });
};

getOffers();
