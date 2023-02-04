var textDisplay = document.querySelector(".text_display");
var operationDisplay = document.querySelector(".previous_result");
var clearButton = document.querySelector("#clear");
var calculateButton = document.querySelector("#calculate");

var operations = document.querySelectorAll(".operation");
var numbers = document.querySelectorAll(".int_btn");
var operationSelected = false;

var result = 0; // Result
var answer = 0;
var calculated = true;
var canOperate = true;
function clear() {
    result = 0;
    answer = 0;
    textDisplay.textContent = 0;
    operationDisplay.textContent = "";
    calculated = true;
};
// Number button press
numbers.forEach((number) => {
    number.addEventListener('click', () => {
        if (calculated) 
            clear()
        calculated = false;
        operationDisplay.textContent += number.textContent;
        operationSelected = false;
        result = parseInt(number.textContent);
    });
});
// Oper button press
operations.forEach(function(operation) {
    operation.addEventListener('click', () => {
        if (!operationSelected){
            if (calculated){
                operationDisplay.textContent = String(answer);
                calculated = false;
            }
            operationDisplay.textContent += operation.textContent;
        }
        operationSelected = true;
    });
})
// Clear button press
clearButton.addEventListener('click', clear);

// Calculate Expression
calculateButton.addEventListener('click', ()=>{
    if (!calculated)
    {
        answer = compute(operationDisplay.textContent, answer);
        textDisplay.textContent = answer;
        operationDisplay.textContent = updateString(operationDisplay.textContent);
        calculated = true;
    }
});


function operate (operation , x, y)
{
    switch(operation)
    {
        case '/':
            return x / y;
        case '×':
            return x * y;
        case '−':
            return x - y;
        case '+':
            return x + y;
    }
}

function compute(string)
{
    var prev = 0; // First number
    var cur = ""; // Operator
    var next = 0; // Second number
    var result = 0;
    var multPresentInArray = true;
    var operatorPresentInArray = true;
    var arr = string.match(/\d+|./g); // Seperates the string into an array of numbers and operations
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
            next = parseInt(j + 2 < arr.length ? arr[j + 2] : 1);

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
            next = parseInt(j + 2 < arr.length ? arr[j + 2] : 0);

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
    return arr[0];
}
function updateString(string)
{
    const end = string.length - 1;
    switch(string[end])
    {
        case '+':
            return string.slice(0, end) + "=";
        case '−':
            return string.slice(0, end) + "=";
        case '/':
            return string.slice(0, end) + "=";
        case '×':
            return string.slice(0, end) + "=";
        default:
            return string + "=";
    }
}



