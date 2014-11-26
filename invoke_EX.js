var Q = require('q');

function doesntReturnPromise() {
  return "this is not a promise";
}

function itReturnPromise() {
 // return Q.promise(function(resolve){resolve("this is a promise")}); 
  var prom=  Q.defer();
  prom.resolve("this is a promise");
  return prom.promise;
}

function performPromiseOp(method) {
  Q.invoke(method).then(function(value) {console.log(value)});
}
//This is not a promise
performPromiseOp(doesntReturnPromise);

//This is a promise
performPromiseOp(itReturnPromise);