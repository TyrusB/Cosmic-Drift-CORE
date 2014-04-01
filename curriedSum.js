var curriedSum = function(numArgs){
  var numbers = []
  var _curriedSum = function(n){
    numbers.push(n)
    if (numbers.length == numArgs){
      var sum = 0
      numbers.forEach( function (el) {
        sum += el;
      })
       return sum;
    }else{
      return _curriedSum;
    }
  }
  return _curriedSum;
}
//
// var sum = curriedSum(4);
// console.log(sum(5)(30)(20)(1))

var curry = function(numArgs, callback){
  var numbers = []
  var _curriedSum = function(n){
    numbers.push(n);
    if(numbers.length == numArgs){
      return callback.apply({}, numbers);
    }else{
      return _curriedSum;
    }
  }
  return _curriedSum;
}

var product = curry(4, function () {
  arr = [].slice.apply(arguments)
  prod = 1
  arr.forEach( function (el) {
    prod *= el;
  })
  return prod;
});

console.log(product(5)(30)(20)(1))
