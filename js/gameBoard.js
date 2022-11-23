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
    //makes wire and empty boxes
    var wirebox = new Wire(175, 45, 900, 460);
    var box1 = new Box(350, 20, 100, 100);
    var box2 = new Box(600, 100, 100, 100);
    var box3 = new Box(450, 250, 100, 100);
    var box4 = new Box(250, 250, 100, 100);
    var box5 = new Box(150, 100, 100, 100);

    wirebox.drawBox();
    layer.add(wirebox.graphics);
    box1.drawBox();
    layer.add(box1.graphics);
    box2.drawBox();
    layer.add(box2.graphics);
    box3.drawBox();
    layer.add(box3.graphics);
    box4.drawBox();
    layer.add(box4.graphics);
    box5.drawBox();
    layer.add(box5.graphics);
    // console.log(box1);


    inventory = new Inventory(1);
    layer.add(inventory.graphics);


    layer.on('dragmove', function (e) {
        var target = e.target;
        var targetRect = e.target.getClientRect();

        if (haveIntersection(box2.graphics.getClientRect(), targetRect)) {
            console.log("in box2");
            console.log(target.me);
        }
    });




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


    //https://konvajs.org/docs/sandbox/Collision_Detection.html 
    /* layer.on('dragmove', function (e) {
         var target = e.target;
         var targetRect = e.target.getClientRect();
         layer.children.forEach(function (group) {
             //dont check with self
             if (group === target) {
                 return;
             }
             console.log()
             if (haveIntersection(group.getClientRect(), targetRect)) {
                 console.log("collision");
                 group.findOne('.fillShape').fill('red');
             } else {
                 group.findOne('.fillShape').fill('.grey');
             }
         });
     });*/

    function haveIntersection(r1, r2) {
        return !(
            r2.x > r1.x + r1.width ||
            r2.x + r2.width < r1.x ||
            r2.y > r1.y + r1.height ||
            r2.y + r2.height < r1.y
        );
    }



}


