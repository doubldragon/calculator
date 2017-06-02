//Store values between button presses
var value1 = 0;
var value2 = 0;
var selectedFunc = null;
var clickFunc;
var display = document.getElementById('display');
var total;

document.onreadystatechange = function() {
    if (document.readyState == "interactive") {
        //initialize the application
        start();
        clearScreen();

    }
};

///sets event listener for each button
function start() {
    //create eventhandlers for each button
    var buttons = document.getElementsByClassName("key");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", buttonLogic);
    }
}

//makes decision based on which button was clicked
function buttonLogic(evt) { 
    var btnValue = evt.target.innerHTML

    if ((0 <= btnValue && btnValue <= 9) || btnValue === '.') { 
    	if (!clickFunc) {
    		handleNum(btnValue);
    	 } else {
    		value1 = value2;
    		value2 = btnValue;
    		clickFunc = false;
    	}
    	checkState(btnValue);
    	display.value = value2;
    } else {
    	clickFunc = true;
    	handleFunc(btnValue);
    }
}

//Takes action depending on function pressed
function handleFunc(btnValue){

	switch (btnValue) {
		
		case "/":
			selectedFunc = "/";
			break;
		case "X":
			selectedFunc = "*";
			break;
		case "+":
			selectedFunc = "+";
			break;
		case "-":
			selectedFunc = "-";
			break;
		case "=":
			evaluate();
			break;
		case "Clear":
			clearScreen();
			break;
		case "+/-":
			value2 = value2 * (-1);
			display.value = value2;
			break;
		case "%":
			value2 = value2 / 100;
			display.value = value2;
			break;
		case "CE":
			value2 = value1;
			value1 = 0;
			display.value = 0;
			break;

	};
	checkState(btnValue);
}

// evaluates the epxression
function evaluate() {
	total = "" + parseInt(value1) + selectedFunc + parseInt(value2);
    total = eval(total);
    value1 = value2;
    value2 = 0;
    selectedFunc = null;
    console.log(total);
    display.value = total;
}

//resets screen and all variables
function clearScreen() {
    value1 = 0;
    value2 = undefined;
    display.value = 0;
    selectedFunc = null;
    console.log('Screen Cleared!');
}
//debugging function to check state of key variables - outputs to console
function checkState(btnValue) {
	console.log('value 1: ' + value1 + ' value 2: ' + value2);
	console.log(btnValue);
	console.log(selectedFunc);
}

//Avoids unnecessary leading zero in some cases
function handleNum(btnValue) {
	if (value2 === undefined) {
		value2 = "" + btnValue;
	} else {
		var temp = "" + value2 + btnValue;
    	value2 = temp;
    }
}