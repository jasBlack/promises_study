'use strict';
var Q = require('q');

function methA() {
  return "Success";
}

function methB() {
  throw "failed";
}

function performPromiseOperation(methodToExecute) {
  return Q.promise(function(resolved, rejected) {
      try {
        var result =methodToExecute()
        resolved(result);
      } catch (ex) {
        rejected(ex);
      }});
  }


//Another way to call both promises
// performPromiseOperation(methA).then(function(value){
// console.log(value);
// return Q.fcall(performPromiseOperation(methB));
// }).fail(function (error){
//   console.log("Error: "+ error);
// });


//for successful resolution
performPromiseOperation(methA).then(function (value){
  console.log(value);
});
//for failed resolution
var failedValue = performPromiseOperation(methB);
console.log(JSON.stringify(failedValue));

