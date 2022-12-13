/*
1-create a dynamic object using Proxy such that it has only the following properties
a∙ name property that accepts only string of 7 characters.
b∙ address property that accepts only string value.
c∙ age property that accepts numerical value between 25 and 60.

*/

 var myObj = {
  name: "Mostafa",
  address: "cairo",
  age: 22
} 
 var handler = {
    get: function(target, property) {
        if(!(property in target)){
            throw(`${property} property doesn't exit!`);
        }
        return target[property];
    },
    set: function(target, property, value) {
        if (property === "name") {
            if (typeof value != "string") {
                throw("Name value should be a String!");
            } 
            else if(value.length != 7){
                throw("Name value should be only 7 characters!");
            } 
        }

        else if (property === "address") {
            if (typeof value != "string") {
                throw("Address value should be a String!")
            }
        }

        else if (property === "age") {
            if (!(Number.isInteger(value))) {
                throw("Age value should be integer numbers only!");   
            }
            else if (value <= 25 || value >= 60) {
                throw("Age value should be between 25 and 60")
            }
        }
        target[property] = value;
        return true;
    }
}
var p = new Proxy(myObj, handler);
console.log(`Name: ${p.name} \nAddress: ${p.address}\nAge: ${p.age}`);

p.name = "AhmedAL"; // 7 characters

p.address = "cairo"; // not a string value

p.age = 50; // not a number or not an integer

console.log(`Name: ${p.name} \nAddress: ${p.address}\nAge: ${p.age}`);

/*
2-
Using ES6 new Syntax & features: Write a script to create different shapes (rectangle, square, circle) make all of them inherits from shape class.
each shape contains two functions to calculate its area and its parameter.
Display the area and each object parameter in your console by overriding toString().
Make static property count in any class and function static return count of objects created from this class 

*/
class shape {
    constructor(height){
        this.height = height;
    }

    calcArea() {}
    calcPerimeter() {}

    toString() {
        console.log(`${this.constructor.name} Area = ${this.calcArea()} \n${this.constructor.name} Perimeter = ${this.calcPerimeter()}`);
    }
}

 class square extends shape {
    constructor(height) {
        super(height);
    }

    calcArea() {
        return this.height * this.height;
    }

    calcPerimeter() {
        return 4 * this.height;
    }
}

class rectangle extends shape {
    constructor(height, width) {
        super(height);
        this.width = width;
    }

    calcArea() {
        return this.height * this.width;
    }

    calcPerimeter() {
        return 2 * (this.height + this.width);
    }
}

 class circle extends shape {
    constructor(radius) {
        super(radius);
    }

    calcArea() {
        return Math.PI * this.height * this.height;
    }

    calcPerimeter() {
        return 2 * Math.PI * this.height;
    }
}
let square1 = new square(5);
square1.calcArea();
square1.calcPerimeter();
square1.toString();
/* New Rectangle test*/
let rect = new rectangle(10, 20);
rect.calcArea();
rect.calcPerimeter();
rect.toString();
/* New Circle test*/
let circle1 =  new circle(10);
circle1.calcArea();
circle1.calcPerimeter();
circle1.toString();


/*
3-Create a generator that returns Fibonacci series that takes only one parameter. 
Make two different implementations as described below:
A. the parameter passed determines the number of elements displayed from the series. 
B. the parameter passed determines the max number of the displayed
 series should not exceed its value
 */
 function* fib1(elem){
    let m = 1;
    let n = 1;
    
    if(elem >= 1)
    yield m;
    
    if(elem>=2)
    yield n;
    
    for(let i=2; i<elem; i++){
        let sum = m + n
        m =n;
        n = sum;
        yield sum;
    }
}
let it1 = fib1(8);
console.log(it1.next());
console.log(it1.next());
console.log(it1.next());
console.log(it1.next());
console.log(it1.next());
console.log(it1.next());
console.log(it1.next());
console.log(it1.next());
console.log(it1.next());
function* fib2(max){
    let m = 1;
    let n = 1;
    let cnt = 0;
    if(cnt ==0 && max>=1) { cnt++; yield 1;}
    if(cnt ==1 && max>=1) {cnt++; yield 1;}
    let sum = m + n;
    do{
    sum = m + n;
        m =n;
        n = sum;
        if(sum<=max)
        yield sum;
    }while(sum<=max)
    
}
let it2 = fib2(5);
console.log(it2.next());
console.log(it2.next());
console.log(it2.next());
console.log(it2.next());
console.log(it2.next());
console.log(it2.next());




/*
4-) iterator Create an iterable object by implementing @@iterator method i.e. Symbol.iterator, 
so that you can use for..of and retrieve its properties. 
retrieving the object properties and its values*/
let obj = {
    fname: "Mostafa",
    lname: "Mahmoud",
    age: 25,
    [Symbol.iterator] (){
        let me = this;
        let ind = 0;
        let len = Object.entries(this).length;
        let iterator ={
            next: function(){
                ind++;
        
                if(ind > len)
                    {
                        return {
                            value: undefined,
                            done: true
                        }
                    }
                return{
                    value:Object.entries(me)[ind-1] ,
                    done:false
                }
            }
        }
        return iterator;
    }
}
let it = obj[Symbol.iterator]();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

 /*
 5-Study new array api methods then create the following methods 
 and apply it on this array var fruits = ["apple", "strawberry", "banana", "orange", "mango"] 
test that every element in the given array is a string 
test that some of array elements starts with "a"
generate new array filtered from the given array with only 
elements that starts with "b" or "s" */

var fruits = ["apple", "strawberry", "banana", "orange", "mango"];

/* 5.A */
function check(arr) {
    return arr.every(i => (typeof i === "string"));
}

document.write(`a: => ${check(fruits)} <br><br>`);


/* 5.B */
let contains = fruits.some(i => (i.startsWith('a')));
document.write(`b: => ${contains} <br><br>`);


/* 5.C */

let result = fruits.filter(i => (i.startsWith('a') || i.startsWith('s')));
document.write(`c: => ${result} <br><br>`);


/* 5.D */

let liked = fruits.map(x => "I like " + x)
document.write(`d: => ${liked} <br><br>`);

/* 5.E */

document.write(`e: => <br>`);
liked.forEach((el) => document.write(el + '<br>'))