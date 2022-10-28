
let operator      = '';
let previousValue = '';
let currentValue  = '';

//* Components on HTML
let previousScreen = document.querySelector(".previous");
let currentScreen  = document.querySelector(".current");

let clear     = document.querySelector("#clear-btn");
let zero      = document.querySelector("#zero");
let equal     = document.querySelector(".equal");
let decimal   = document.querySelector(".decimal");
let numbers   = document.querySelectorAll(".numbers");
let operators = document.querySelectorAll(".operator");

window.addEventListener('keydown', handleKeyPress);

// *** FUNCTIONS BEGINNS *** //

    numbers.forEach((numbers) => numbers.addEventListener("click", 
    (e) => {
            handleNumber(e.target.textContent);
            currentScreen.textContent = currentValue;
        }))

    operators.forEach((op) => op.addEventListener("click", 
    (e) => {
            handleOperator(e.target.textContent);
            previousScreen.textContent = previousValue + " " + operator;
            currentScreen.textContent  = currentValue;
        }));

    clear.addEventListener("click", 
    () => {
            previousValue = '';
            currentValue = '';
            operator = '';
            previousScreen.textContent = currentValue;
            currentScreen.textContent  = currentValue;
        });

    equal.addEventListener("click", () => 
    {
        if (currentValue != '' && previousValue != '') {
            operate();
            previousScreen.textContent = '';
            if (previousValue.length <= 9) {
                currentScreen.textContent = previousValue;
            } else {
                currentScreen.textContent = previousValue.slice(0, 9) + "...";
            }
        }
    });
    
    zero.addEventListener("click", () => {limitZero()});

    decimal.addEventListener("click", () => {addDecimal()});

// *** FUNCTIONS ENDS *** //

//* Limitates the operations to 9 digits
function handleNumber(num)  {
    if (currentValue.length <= 9) {
        currentValue += num;
        currentScreen.textContent = currentValue;
    }
}

function handleOperator(op) 
{
    if (currentValue === "") return
    if (previousValue !== '') {operate()}

    operator      = op;
    previousValue = currentValue;
    previousScreen.textContent = previousValue + " " + operator;
    currentValue  = '';
    currentScreen.textContent = "";
}

function operate()
{   
    previousValue = Number(previousValue);
    currentValue  = Number(currentValue);

    if (operator === "+") {
        previousValue += currentValue;
    } else if (operator === "-") {
        previousValue -= currentValue;
    } else if (operator  === "×") {
        previousValue *= currentValue;
    } else if (operator === "÷") 
    { 
        if (currentValue <= 0) 
        {
            previousValue = "∞";
            previousValue.textContent = "";
            operator = "";
            return;
        }
        previousValue /= currentValue;
    }

    //* rounds the result
    previousValue = roundNum(previousValue);
    previousValue = previousValue.toString();
    currentValue  = previousValue.toString();
}

function roundNum(num) {return Math.round(num * 10000) / 10000;}

function addDecimal() 
{ if(!currentValue.includes(".")) {
        currentValue += '.';
        currentScreen.textContent = currentValue;
    }
}

function limitZero() 
{ if(!currentValue.includes("0")) {
        currentValue += '0';
        currentScreen.textContent = currentValue;
    }
} 

function handleKeyPress(e)
{ 
    e.preventDefault();
    if (e.key >= 0 && e.key <= 9) {handleNumber(e.key)}

    if(e.key  === "Enter" || (e.key === "=" && 
    currentValue != "" && previousValue != "")) {operate();}

    if(e.key  === "+" || e.key === "-" || e.key === "/")
        {handleOperator(e.key)}
    
    if(e.key  === "*") {handleOperator("x");}

    if(e.key === ".") {addDecimal(".");}
    
    if(e.key === "0") {limitZero("0");}

    if(e.key === 'backspace') {clear};
}