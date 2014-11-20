/**
 * Example for Using Deferreds Q.defer
 */
var Q = require('q');
/**
 * This is mock function for internal successful read
 * @return {String} String representing successful read status.
 */
function successfulRead() {
    return "read is successfull";
  }
  /**
   * This is mock function for representing internal workings of read function
   * resulting in failed read operation.
   * @throws {Error}
   */
function failedRead() {
    throw "read is not successfull";
  }
  /**
   * This is a mock function acting as fs.read to help testing
   * promises when failed and when successfull
   * @param  {Function} fn funtion that will be used in reading either
   *                    function resulting in successful read, or failed read operation.
   * @param  {Function} cb call back function.
   */
function performOp(fn, cb) {
    try {
      var value = fn();
      cb(null, value);
    } catch (error) {
      cb(error, null);
    }
  }
  /**
   * My wrap function to building a new read method based on promises instead of
   * call backs
   * @param  {Function} fn fn funtion that will be used in reading either
   *                    function resulting in successful read, or failed read operation.
   * @return {Promise}   return promise represeting the status of the operation
   */
function promissedRead(fn) {
    var deferred = Q.defer();
    //Instead of providing a normal call back
    //provide a function that utilize the usage of promise
    //if read operation went well then send  promise.resolve
    //If read operation went bad "Got FUCKED" then just promise.reject with error
    performOp(fn, function(err, value) {
      if (err) {
        deferred.reject(new Error(err));
      } else {
        deferred.resolve(value);
      }
    });
    return deferred.promise;
  }
  //Promise successful read
promissedRead(successfulRead).then(fulfilled, rejected);
//Promise failed read
promissedRead(failedRead).then(fulfilled, rejected);
//DONT DELETE THIS YOU IDIOT
//These are just a way to provide on fulfilled and on rejected methods
function fulfilled(value) {
  console.log("Promise is fulfilled with value : " + value);
}

function rejected(error) {
  console.log("Promise got rejected with Error: " + error);
}