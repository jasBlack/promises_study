var Q = require('q');

function returnValue(){
	return "this is a value";
}

function returnPromise(){
	var prom=Q.defer();
	prom.resolve("this is a promise");
	return prom.promise;
}

function performOp(meth){
	//here we call the meth function passed because
	//Q will handle the return result of the function
	//not the function it self.
	 return Q.when(meth(),function resolved(value){
		console.log(value);
	},function rejected(error){
		console.log(error);
	});
}

//Expected result is that performOp will handle both methods
//regardless wither function will return static value 
//(which is the case when using returnValue method) or function
//returning a promise Object(which is the case when using the returnPromise method)
performOp(returnValue); //this is a value
performOp(returnPromise); //this is a promise