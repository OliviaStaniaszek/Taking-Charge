
class Scientist {
    //the constructor recives the scientist's state as well as the location(x,y)
    constructor(state, x, y) {
        this.x = x;
        this.y = y;
        this.state = state;
        //new graphics' geroup
        this.graphics = new Konva.Group({
            x: x,
            y: y,
            rotation: 0,
            draggable: false,
            offset: { //sets origin to centre rather than top right (used for rotation)
                x: 80,
                y: 90,
              },
        });
        this.setState(this.state);
        
    }

    //add the image to the graphics' group
    setImage(x, y, imgPath) {
        //to empty the graphics' group container
        this.graphics.removeChildren();
        this.img = new Konva.Image({
            x: x,
            y: y,
            width: 160,
            height: 180,

        });
        var imageObj1 = new Image();
        //console.log(this.img);
        imageObj1.img = this.img;
        imageObj1.onload = function () {
            //console.log(this.img);
            this.img.image(imageObj1);
        };
        imageObj1.src = imgPath;
        this.graphics.add(this.img);


    }
    setState(state) {
        this.state = state;
        //calls the setImage function with the appropriate imgPath, based on the state 
        switch (state) {
            case "TEACH":
                this.setImage(this.x, this.y, "images/scientist_teach.png");
                break;
            case "CORRECT":
                this.setImage(this.x, this.y, "images/scientist_correct.png");
                break;
            case "INCORRECT":
                this.setImage(this.x, this.y, "images/scientist_incorrect.png");
                break;
            case "HINT":
                this.setImage(this.x, this.y, "images/scientist_hint.png");
                break;
            default:
                console.log("ERROR!! scientist state is wrong!!!! " + state);
                this.setImage(this.x, this.y, "images/scientist_teach.png");
                break;
        }
    }


    correctAnimation(){
        var scientist = this.graphics;
        var amplitude = 25;
        var period = 1500;
        // in ms
        var centerY = this.y; 

        var anim = new Konva.Animation(function (frame) {
            scientist.y(
                amplitude * Math.sin((frame.time * 2 * Math.PI) / period) + centerY
            );
        }, layer);
        console.log("correct animation start");
        anim.start();
    }

    wrongAnimation(){
        var scientist = this.graphics;
        var angularSpeed = 90;
        // var angle = 25;

        var anim = new  Konva.Animation(function (frame) {
        
            var angleDiff = (frame.timeDiff * angularSpeed) / 1000;
            // scientist.rotate(angleDiff);

            // x = 640;
            // scientist.y = 200;
        }, layer);

      anim.start();
    }
}