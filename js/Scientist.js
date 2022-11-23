//has a state: teach/correct/incorrect/hint
class Scientist {
    constructor(state, x, y) {
        this.state = state;
        this.graphics = new Konva.Group({
            x: x,
            y: y,
            rotation: 0,
            draggable: false
        });
        switch (state) {
            case "TEACH":
                this.setImage(x, y, "images/scientist_teach.png");
            case "CORRECT":
                this.setImage(x, y, "images/scientist_correct.png");
            case "INCORRECT":
                this.setImage(x, y, "images/scientist_incorrect.png");
            case "HINT":
                this.setImage(x, y, "images/scientist_hint.png");
        }

    }


    setImage(x, y, imgPath) {
        //to empty the graphics' group container
        this.graphics.removeChildren();
        this.img = new Konva.Image({
            x: x,
            y: y,
            width: 73,
            height: 65,

        });

    }
}