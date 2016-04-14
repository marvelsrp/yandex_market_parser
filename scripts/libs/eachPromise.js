function eachPromise(arr, callback, i) {
  if (!i) {
    i = 0;
  }
  callback(arr[i]).then(() => {
    if (i + 1 < arr.length) {
      eachPromise(arr, callback, i + 1);
    }
  });
}

module.exports = eachPromise;