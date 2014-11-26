var Q = require('q');

function returnValue() {
  return "this is a value";
}

function returnPromise() {
  return Q.promise(function(resolve, reject) {
    resolve("this is a promise");
  })
}

function returnRejected() {
  return Q.Promise(function(resolved, rejected) {
    rejected("this is an error");
  })
}

//I was trying to throw an exception within the all function
//Q.all didn't handle the Exception
// function throwError() {
//   // throw new Error("this is an Exception");
//   throw new Error("this is an Exception");
// }

function doProcess(funArray) {
  //Q.all will evaluate all functions 
  Q.all(funArray).then(function resolved(value) {
    for (var i = 0; i < value.length; i++) {
      console.log(value[i]);
    }
  }, function rejected(error) {
    console.log(error);
    // }).catch(function (error){
    // 	console.error(error);
  });
}

doProcess([returnPromise(),returnValue()]); //This is a promise
											//This is a value

doProcess([returnValue(),returnRejected()]); //This is an error