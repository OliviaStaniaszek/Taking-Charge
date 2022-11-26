
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
            draggable: false
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
}