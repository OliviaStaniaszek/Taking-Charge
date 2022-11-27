var width, height;
var stage, layer;
document.getElementById("body").onload = function () { playGame() };

var wirebox = new Wire(175, 35, 900, 360);
var box1 = new Box(350, 15, 100, 100);
var box2 = new Box(600, 90, 100, 100);
var box3 = new Box(450, 190, 100, 100);
var box4 = new Box(250, 190, 100, 100);
var box5 = new Box(150, 90, 100, 100);

var boxes = [box1, box2, box3, box4, box5];

function playGame() {
    console.log("play game");
    width = window.innerWidth;
    height = window.innerHeight;
    stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height,

    });
    layer = new Konva.Layer();
    stage.add(layer);

    //citcuit's fixed background
    rect = new Konva.Rect({
        width: 1100,
        height: 500,
        fill: '#E7E6E6',
        x: 220,
        y: 0
    });
    layer.add(rect);

    //question display
    question = new Question();
    question.draw(layer, 1, 0, 510, 1320, 100);

    //makes wire and empty boxes
    wirebox.drawBox();
    layer.add(wirebox.graphics);

    for (let i = 0; i < 5; i++) { //create boxes for q1
        boxes[i].drawBox();
        layer.add(boxes[i].graphics);
    }

    inventory = new Inventory(1);
    layer.add(inventory.graphics);

    checkButton = new Button(590, 265, "images/check.png", "images/check_pressed.png");
    layer.add(checkButton.graphics);
    checkButton.graphics.on("click", updateBoxContent);

    /*layer.on('dragend', function (e) {
        var target = e.target;
        var targetRect = e.target.getClientRect();
        for (let i = 0; i < boxes.length; i++) {
            if (haveIntersection(boxes[i].graphics.getClientRect(), targetRect)) {
                console.log("in box", i + 1);
                console.log(target.me);
                boxes[i].me = target.me;
            }
        }
        checkCircuit();
    });*/


    //add amperemeter
    amperemetere = new Amperemeter(0, 535, 25);
    layer.add(amperemetere.graphics);
    scientist = new Scientist("HINT", 600, 150);
    layer.add(scientist.graphics);
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

function haveIntersection(r1, r2) {
    return !(
        r2.x > r1.x + r1.width ||
        r2.x + r2.width < r1.x ||
        r2.y > r1.y + r1.height ||
        r2.y + r2.height < r1.y
    );
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
    if (hasBattery() && noEmptyCells() && switchesAreClosed()) {
        //correctAnswer();
        console.log("correct!");
        scientist.setState("CORRECT");
        correctSound();
        for (let c = 0; c < inventory.inventory.length; c++) {
            if (inventory.inventory[c].getType() == "LIGHTBULB") {
                inventory.inventory[c].turnOn();
            }
        }
    } else {
        //wrongAnswer();
        console.log("wrong!");
        scientist.setState("INCORRECT");
        incorrectSound();
        for (let c = 0; c < inventory.inventory.length; c++) {
            if (inventory.inventory[c].getType() == "LIGHTBULB") {
                inventory.inventory[c].turnOff();
            }
        }
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
