//Store values between button presses
var value1 = 0;
var value2 = 0;
var selectedFunc = null;
var clickFunc;
var display = document.getElementById('display');
var total;
var operator;

document.onreadystatechange = function() {
    if (document.readyState == "interactive") {
        //initialize the application
        start();

    }
};

// What should happen when the page is initially loaded
function start() {
    //create eventhandlers for each button
    var buttons = document.getElementsByClassName("key");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", buttonLogic);
    }
}
//determine what to 
function buttonLogic(evt) {
    var btnValue = evt.target.innerHTML

    if ((0 <= btnValue && btnValue <= 9) || btnValue === '.') {
        if (!clickFunc && !selectedFunc) {
            var temp = "" + value2 + btnValue;
            value2 = parseInt(temp);
        } else if (selectedFunc) {
            value1 = value2;
            value2 = btnValue;
            clickFunc = false;
        } else {
            value2 = btnValue;
            clickFunc = false;
        }

        console.log(value2);
        display.value = value2;
        handleNum(value2);
    } else {
        clickFunc = true;
        handleFunc(btnValue);
    }

}

//function to process numbers
function handleNum(btnValue) {

}
//function to process functions
function handleFunc(btnValue) {
    switch (btnValue) {

        // case "=":
        // 	selectedFunc = "=";
        // 	evaluate();
        // 	break;
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
        case "CE":
            console.log('Cleared Entry!');
            value2 = value1;
            value1 = 0;
            display.value = value1;
            //clickFunc = true;
            break;
            // default: 
            // 	display.value = 0;
            // 	value1 = 0;
            // 	value2 = 0;
            // 	console.log('Cleared');
            // 	break;
    };

    console.log(value1 + ' ' + value2);

    if (btnValue === "=") {
        evaluate();
        //clearScreen();
    } else if (btnValue !== 'Clear' && btnValue !== 'CE') {
        value1 = value2;
        value2 = 0;
    } else if (btnValue === 'Clear') {
        clearScreen();
    };
    // display.value =0;
    console.log(selectedFunc)



}
//function to update display
function evaluate() {

    total = "" + value1 + selectedFunc + value2;
    total = eval(total);
    selectedFunc = null;
    console.log(total);
    display.value = total;
}

function clearScreen() {
    value1 = 0;
    value2 = 0;
    display.value = value1;
    console.log('Screen Cleared!');
}
