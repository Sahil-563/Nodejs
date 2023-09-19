//Learnign how to make the functions inside a file exportable
function add(a,b){ //Use module.exports to export the function
    return a+b;
}
function multiply(a,b){
    return a*b;
}
function subtract(a,b){
    return a-b;
}
function divide(a,b){
    return a/b;
}
module.exports={add, multiply,subtract,divide}
