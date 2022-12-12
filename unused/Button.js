
class Button {
    constructor(x, y, unpressedImg, pressedImg) {
        this.unpressedImg = unpressedImg;
        this.pressedImg = pressedImg;
        this.x = x;
        this.y = y;
        this.isPressed = false;
        this.graphics = new Konva.Group({
            x: x,
            y: y,
            rotation: 0,
            draggable: false
        });
        this.setImage(x, y, unpressedImg);
    }

    setPressed(isPressed) {
        this.isPressed = isPressed;
        if (isPressed) {
            this.setImage(this.pressedImg);
        } else {
            this.setImage(this.unpressedImg);
        }
    }

    setImage(x, y, imgPath) {
        //to empty the graphics' group container
        this.graphics.removeChildren();
        this.img = new Konva.Image({
            x: x,
            y: y,
            width: 150,
            height: 65,
        });

        var imageObj1 = new Image();
        imageObj1.img = this.img;
        imageObj1.onload = function () {
            this.img.image(imageObj1);
        };
        imageObj1.src = imgPath;
        this.graphics.add(this.img);

    }
}


