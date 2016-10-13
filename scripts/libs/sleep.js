var sleep = (time) => {
  return new Promise((resolve) => {
    var stop = new Date().getTime();
    while (new Date().getTime() < stop + time) {

    }
    resolve();
  });
};

module.exports = sleep;
