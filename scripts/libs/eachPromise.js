function eachPromise(arr, callback, i) {
  if (!i) {
    i = 0;
  }
  return callback(arr[i]).then(() => {
    if (i + 1 < arr.length) {
      return eachPromise(arr, callback, i + 1);
    } else {
      return Promise.resolve();
    }
  });
}

module.exports = eachPromise;