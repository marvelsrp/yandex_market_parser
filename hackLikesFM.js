var likesFM = require('./likesFM');
var vk = require('./vk');
likesFM.getOffers().then((tasks) => {
  for (var i in tasks.like) {
    var id = tasks.like[i].id;
    likesFM.openOffer(id, 'like').then(() => {
      //vk.addLike(id).then(() => {
      //  likesFM.doOffers(id).then(() => {
      //    likesFM.getState();
      //  });
      //});
    });

    return;
  }
});
