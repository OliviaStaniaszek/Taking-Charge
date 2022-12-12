var layer;
var sceneWidth = 1700;
var sceneHeight = sceneWidth / 3.5;


document.getElementById("body").onload = function () { playGame() };

var wirebox = new Wire(175, 35, 800, 360);
var box1 = new Box(350, 15, 100, 100);
var box2 = new Box(550, 90, 100, 100);
var box3 = new Box(450, 190, 100, 100);
var box4 = new Box(250, 190, 100, 100);
var box5 = new Box(150, 90, 100, 100);

var boxes = [box1, box2, box3, box4, box5];

var symbolMode = true;

var stage = new Konva.Stage({
    container: 'container',
    width: sceneWidth,
    height: sceneHeight,

});

function playGame() {
    console.log("play game");

    layer = new Konva.Layer();
    stage.add(layer);

    //citcuit's fixed background
    rect = new Konva.Rect({
        width: 1100,
        height: 500,
        fill: '#E7E6E6',
        x: 220,
        y: 0,
        id: 'backdrop',
    });
    layer.add(rect);

    //question display
    question = new Question();
    // question.draw(layer, 1, 10, 510, 1310, 100);

    //makes wire and empty boxes
    wirebox.drawBox();

    layer.add(wirebox.graphics);
    for (let i = 0; i < 5; i++) { //create boxes for q1
        boxes[i].drawBox();
        layer.add(boxes[i].graphics);
    }

    inventory = new Inventory(1);
    layer.add(inventory.graphics);


    //add amperemeter
    amperemetere = new Amperemeter(0, 535, 25);
    layer.add(amperemetere.graphics);
    scientist = new Scientist("HINT", 620, 200); //was 600, 150);
    layer.add(scientist.graphics);
    scientist.graphics.on("click", () => alert(question.getHint(1)));

    toggleSymbols();

    // use event delegation to update pointer style
    layer.on('mouseover', function (evt) {
        var shape = evt.target;
        document.body.style.cursor = 'pointer';
        //shape.strokeEnabled(false);
    });

    layer.on('mouseout', function (evt) {
        var shape = evt.target;
        document.body.style.cursor = 'default';
        //shape.strokeEnabled(true);
    });
}

// https://konvajs.org/docs/sandbox/Responsive_Canvas.html
function fitStageIntoParentContainer() {
    var container = document.querySelector('#stage-parent');

    // now we need to fit stage into parent container
    var containerWidth = container.offsetWidth;

    // but we also make the full scene visible
    // so we need to scale all objects on canvas
    var scale = containerWidth / sceneWidth;

    stage.width(sceneWidth * scale);
    stage.height(sceneHeight * scale);
    stage.scale({ x: scale, y: scale });
}

fitStageIntoParentContainer();
// adapt the stage on any window resize
window.addEventListener('resize', fitStageIntoParentContainer);

function haveIntersection(r1, r2) {
    return !(
        r2.x > r1.x + r1.width ||
        r2.x + r2.width < r1.x ||
        r2.y > r1.y + r1.height ||
        r2.y + r2.height < r1.y
    );
}

function toggleSymbols() {
    if (symbolMode) {
        symbolMode = false;
        amperemetere.setSymbol();

    } else {
        symbolMode = true;
        amperemetere.setDiagram();
    }
    inventory.toggleSymbolMode(symbolMode);

    console.log(symbolMode);
}

// update the content of the boxes
function updateBoxContent() {
    console.log("updateBoxContent()...")
    //loop through all boxes
    for (let i = 0; i < boxes.length; i++) {
        //initialise the box as "empty"
        boxes[i].me = undefined;
        //loop through all components in the inventory array
        for (let c = 0; c < inventory.inventory.length; c++) {
            //check for intersection between box i and each component from the inventory array
            if (haveIntersection(boxes[i].graphics.getClientRect(),
                inventory.inventory[c].graphics.getClientRect())) {
                console.log(inventory.inventory[c].getType() + " with resistance " +
                    inventory.inventory[c].getResistance() +
                    " is in box ", i + 1);
                boxes[i].me = inventory.inventory[c];
            }
        }
    }
    checkCircuit();
}

// checks if we got the question right!
function checkCircuit() {
    amperemetere.setAmpere(0);
    answerIsCorrect = false;

    // is the circuit closed?
    if (hasBattery() && noEmptyCells() && switchesAreClosed()) {
        totalResistance = 0;
        voltage = 0;
        for (let i = 0; i < boxes.length; i++) {
            if (boxes[i].me.getType() == "LIGHTBULB") {
                boxes[i].me.turnOn();
            }
            if (boxes[i].me.getType() == "BATTERY") {
                voltage += boxes[i].me.getVoltage();
                console.log("voltage: " + voltage);
            }
            totalResistance += boxes[i].me.getResistance();
            console.log("resistance: " + totalResistance);

        }
        current = voltage / totalResistance;
        amperemetere.setAmpere(current);
        if (current == question.getAnswerAmpere(1)) {
            //correctAnswer();
            console.log("correct!");
            scientist.setState("CORRECT");
            correctSound();
            scientist.correctAnimation();
            answerIsCorrect = true;
            scientist.correctAnimation();
            var background = stage.findOne('#backdrop');
            background.fill('#ccffcc');
            
            setTimeout(nextLevelalert, 1500);            

        }
    }

    if (!answerIsCorrect) {
        console.log("wrong!");
        scientist.setState("INCORRECT");
        incorrectSound();
        scientist.wrongAnimation();
        var background = stage.findOne('#backdrop');
        background.fill('#ffcccc');
        setTimeout(hintPromptAlert, 1500);
        
        for (let c = 0; c < inventory.inventory.length; c++) {
            if (inventory.inventory[c].getType() == "LIGHTBULB") {
                inventory.inventory[c].turnOff();
            }
        }
    }

}

function hintPromptAlert(){
    alert('Oops, not quite right!\nClick the scientist if you need a hint');
}

function nextLevelalert(){
    if (confirm("Well done! You got it right\nSelect 'OK' to go to the level selection or 'CANCEL' to stay on this level") == true) {
        userPreference = "levelSelection";
        window.location.href = "levelSelection.html";
    } else {
        userPreference = "stay";
    }
}

function hasBattery() {
    var result = false;
    boxes.forEach(function (i) {

        if (i.me != undefined && i.me.getType() == "BATTERY") {
            result = true;
        }
    });
    console.log("battery: " + result);
    return result;
}

function noEmptyCells() {
    var result = true;
    boxes.forEach(function (i) {

        if (i.me == undefined) {
            result = false;
        }
    });
    console.log("noEmptyCells: " + result);
    return result;
}

function switchesAreClosed() {
    var result = true;
    boxes.forEach(function (i) {

        if (i.me != undefined && i.me.getType() == "SWITCH" && !i.me.isClosed()) {
            result = false;
        }
    });
    console.log("switchesAreClosed" + result);
    return result;
}

