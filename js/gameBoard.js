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
    //add the components
    var s = new Switch(20, 20);
    layer.add(s.graphics);

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
