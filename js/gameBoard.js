var width, height;
var stage, layer;
document.getElementById("body").onload = function () { playGame() };



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
    inventory = new Inventory(1);
    layer.add(inventory.graphics);
    //add the components
    /*
    var s = new Switch(20, 20, true);
    layer.add(s.graphics);

    var r = new Resistor(20, 100, 10);
    layer.add(r.graphics);

    var b = new Battery(20, 180);
    layer.add(b.graphics);

    var l = new LightBulb(20, 260, true);
    layer.add(l.graphics);

    let allComponents = new Array(s, r, b, l); //array holding all components in a level

    var box1 = new Box(50,50,100,100); //not working 
    layer.add(box1.graphics);
    console.log(box1);

*/
    layer = new Konva.Layer();
    stage.add(layer);
    scientist = new Scientist("HINT", 300, 0);
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


