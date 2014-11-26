var Q = require('q');

function doesntReturnPromise() {
  return "this is not a promise";
}

function itReturnPromise() {
  var prom = Q.defer();
  prom.resolve("this is a promise");
  return prom.promise
}

function performPromiseOp(method) {
    Q.invoke(method).then(function resolved(value) {
      console.log(value)
    }, function rejected(error) {
      console.log(error);
    });
  }
  //This is not a promise
performPromiseOp(doesntReturnPromise);
//This is a promise
performPromiseOp(itReturnPromise);