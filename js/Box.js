class Box {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.graphics = new Konva.Group({
            x: x,
            y: y,
            rotation: 0,
            draggable: false
        });
    };

    drawBox() {
        this.graphics.removeChildren();
        this.rect1 = new Konva.Rect({
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            fill: 'white',
            stroke: 'black',
            strokeWidth: 2,
            cornerRadius: 10,
        });
        // add the shape to the layer
        this.graphics.add(this.rect1);
    }
}


class Wire extends Box {
    constructor(x, y, width, height) {
        super(x, y, width, height);
    };

    drawBox() {
        this.graphics.removeChildren();
        this.rect1 = new Konva.Rect({
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            fill: 'rgba(0,0,0,0)',
            stroke: 'red',
            strokeWidth: 2,
            cornerRadius: 10,
        });
        // add the shape to the layer
        this.graphics.add(this.rect1);
    }
}
