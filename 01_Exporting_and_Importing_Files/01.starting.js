// console.log(process.argv);

// var args= process.argv.slice(2);
// console.log(args);

//Learning how to import a function inside a file
const operations = require('./files/operations'); //use require to import the files inside other files
console.log(operations.multiply(2,4));//calling a function whose key is multiply 
// console.log(operations.divide(10,5));
