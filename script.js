let runningTotal = 0;
let buffer = "0";
let previousOperation;
let fullExpression = ""; 
let hasDecimal = false;

const screen = document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(value) && value !== '.'){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    updateDisplay();
}


function updateDisplay() {
    if (fullExpression && buffer !== "0") {
        screen.innerText = fullExpression + buffer;
    } else if (fullExpression) {
        screen.innerText = fullExpression;
    } else {
        screen.innerText = buffer;
    }
}


function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            runningTotal = 0;
            fullExpression = "";
            previousOperation = null;
            hasDecimal = false;
            break;
        case '=':
            if (previousOperation === null) return;
            if (buffer === "0" && fullExpression) {
                buffer = runningTotal.toString();
            }
            fullExpression += buffer;
            flushOperation(parseFloat(buffer));
            previousOperation = null;
            buffer = runningTotal.toString();
            fullExpression = "";
            hasDecimal = buffer.includes('.');
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
                hasDecimal = false;
            } else {
                // Check if we're removing a decimal point
                if (buffer.slice(-1) === '.') {
                    hasDecimal = false;
                }
                buffer = buffer.substring(0, buffer.length - 1);
            }
            if (fullExpression && buffer === "0") {
                fullExpression = fullExpression.substring(0, fullExpression.length - 1);
            }
            break;
        
        case '+':
        case '−':
        case '×':
        case '÷':
            if (buffer !== "0") {
                fullExpression += buffer;
            }
            if (previousOperation !== null && buffer === "0") {
                fullExpression = fullExpression.substring(0, fullExpression.length - 1) + symbol;
            } else {
                handleMath(symbol);
            }
            buffer = "0";
            hasDecimal = false;
            break;
        case '.':
            if (!hasDecimal) {
                buffer += '.';
                hasDecimal = true;
            }
            break;
    }
}

function handleMath(symbol){
    const floatBuffer = parseFloat(buffer);
    
    if (runningTotal === 0) {
        runningTotal = floatBuffer;
    } else if (previousOperation !== null) {
        flushOperation(floatBuffer);
    }
    
    fullExpression += symbol;
    previousOperation = symbol;
}

function flushOperation(floatBuffer){
    switch (previousOperation) {
        case '+': runningTotal += floatBuffer; break;
        case '−': runningTotal -= floatBuffer; break;
        case '×': runningTotal *= floatBuffer; break;
        case '÷': runningTotal /= floatBuffer; break;
    }
}


function handleNumber(numberString){
    if(buffer === "0"){
        buffer = numberString;
    }else{
        buffer += numberString;
    }
}


function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init();
