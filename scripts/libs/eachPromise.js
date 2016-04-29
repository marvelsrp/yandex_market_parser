/**
 *
 * @param arr
 * @param callback
 * @param i
 * @returns {Promise.<T>}
 */
function eachPromise(arr, callback, i) {

  if (!i) {
    i = 0;
  }
  console.log('eachPromise', i);
  return callback(arr[i]).then(() => {
    if (i + 1 < arr.length) {
      return eachPromise(arr, callback, i + 1);
    } else {
      return Promise.resolve();
    }
  }).catch(() => {
    return eachPromise(arr, callback, i + 1);
  });
}

module.exports = eachPromise;