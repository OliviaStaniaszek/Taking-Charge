var width, height;
var stage, layer;
document.getElementById("body").onload = function () { playGame() };
document.getElementById("level").innerHTML = "level" + level;


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
*/

    // use event delegation to update pointer style
    // and apply borders
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


