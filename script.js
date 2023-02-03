var textDisplay = document.querySelector(".text_display");
var operationDisplay = document.querySelector(".previous_result");
var clearButton = document.querySelector("#clear");
var calculateButton = document.querySelector("#calculate");

var operations = document.querySelectorAll(".operation");
var numbers = document.querySelectorAll(".int_btn");
var operationSelected = false;

var x = 0; // First number
var y = 0; // Second number
var result = 0; // Result
var operation = '';
// Number button press
numbers.forEach((number) => {
    number.addEventListener('click', () => {
        operationDisplay.textContent += number.textContent;
        operationSelected = false;
        result = parseInt(number.textContent);
        textDisplay.textContent = result;
    });
});
// Oper button press
operations.forEach(function(operation) {
    operation.addEventListener('click', () => {
        if (!operationSelected)
        {
            operationDisplay.textContent += operation.textContent;
            establish_operation(operation.textContent);
        }
        operationSelected = true;
    });
})
// Clear button press
clearButton.addEventListener('click', () => {
    result = 0;
    textDisplay.textContent = 0;
    operationDisplay.textContent = "";
});

function establish_operation(oper){
    x = result;
    operation = oper;
}
function add (x, y) {
    return x + y;
}

function subtract (x, y) {
    return x - y;
}

function multiply (x, y) {
    return x * y;
}

function divide (x, y) {
    return x / y;
}

function operate (operation , x, y)
{
    switch(operation)
    {
        case '/':
            return divide(x, y);
        case '×':
            return multiply(x, y);
        case '−':
            return subtract(x, y);
        case '+':
            return add(x, y);
    }
}

function convertToOperation (string) {
    
    var x = 0;
    var y = 0;
    var result = 0;
    var numberShouldBeMultiplied = false;

    const multNumberArray = string.match(/\d+(?=×)|(?<=×)\d+|\d+(?=\/)|(?<=\/)\d+/g); // Get all numbers that either preceed or proceed a multiplication/division operator
    const multOperationArray = string.match(/\/|×/g);
    const addNumberArray = string.match(/\d+(?=\+)|(?<=\+)\d+|\d+(?=−)|(?<=−)\d+/g) // Get all numbers that either preceed or proceed an addition/subtraction operator
    const addOperationArray = string.match(/−|\+/)
    var currentNum = 0;
    var decimalPlace = 1;
    function reset() {
        x = 0;
        y = 0;
        currentNum = 0;
        decimalPlace = 1;
    }


    string.forEach((char)=>{
        switch(char)
        {
            case '×':
                multNumbers.push(currentNum);
                numberShouldBeMultiplied = true; // Next number should be pushed into array for multiplication/divison
                reset();
                break;
            case '+':
                if (numberShouldBeMultiplied) {multNumbers.push(currentNum); numberShouldBeMultiplied = false;}
                else {addNumbers.push(currentNum);}
                reset();
                break;
            default:
                currentNum += parseInt(char) * decimalPlace;
                decimalPlace *= 10;
                break;
        }
    });
    return result;
}

function evaluateOperations(multArray, addArray){

}

// const stringg = "1+3+5×3+67×20/20/12";
// console.log(stringg);
// //const m = stringg.match(/\d+(?=\×)|(?<=\×)\d+/g);
// const a = stringg.match(/\d+(?=×)|(?<=×)\d+|\d+(?=\/)|(?<=\/)\d+/g);
// const b = stringg.match(/\/|×/g);
// const c = stringg.match(/\d+(?=\+)|(?<=\+)\d+|\d+(?=−)|(?<=−)\d+/g); // Get all numbers that either preceed or proceed an addition/subtraction operator
// const d = stringg.match(/−|\+/g)
// console.log(a);
// console.log(b);
// console.log(c);
// console.log(d);

// console.log("--------------------------------------");
function compute(string)
{
    var prev = 0; // First number
    var cur = ""; // Operator
    var next = 0; // Second number
    var result = 0;
    var multPresentInArray = true;
    var operatorPresentInArray = true;
    var arr = string.match(/\d+|./g);
    console.log(arr);
    
    // Do multiplications in array
    while (true)
    { 
        var j = 0;
        while (multPresentInArray)
        {
            multPresentInArray = false;
            for (var z = 0; z < arr.length; z++) // Scan array if there is  a multiplication or divison operator
            {
                if (arr[z] === "×" || arr[z] === "/")
                    multPresentInArray = true;
            }

            prev = parseInt(arr[j]);
            cur = arr[j + 1]
            next = parseInt(j < arr.length ? arr[j + 2] : 0);

            if (cur === "×" || cur === "/")
            {
                result = operate(cur, prev, next);
                arr.splice(j, 3, result);
                j -= 2;
            }
            j += 2;
        }
        console.log("==============");
        console.log(arr);
        break;
    }
    while (true)
    {
        var j = 0;
        while (operatorPresentInArray)
        {
            operatorPresentInArray = false;
            for (var z = 0; z < arr.length; z++) // Scan array if there is  an addition or subtraction operator
            {
                if (arr[z] === "+" || arr[z] === "−")
                    operatorPresentInArray = true;
            }

            prev = parseInt(arr[j]);
            cur = arr[j + 1]
            next = parseInt(j < arr.length ? arr[j + 2] : 0);

            if (cur === "+" || cur === "−")
            {
                result = operate(cur, prev, next);
                arr.splice(j, 3, result);
                j -= 2;
            }
            j += 2;
        }
        console.log("==============");
        console.log(arr);
        break;
    }
}

compute("5+4×3×2/3×10+1+3+2+5×3");

