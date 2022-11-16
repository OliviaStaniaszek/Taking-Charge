
class CircuitComponent {

    constructor(resistance = 0, type = "EMPTY", x, y) {
        this.resistance = resistance;
        this.type = type;
        this.x = x;
        this.y = y;
        this.graphics = new Konva.Group({
            x: x,
            y: y,
            rotation: 0,
        });
    }
    getResistance() {
        return (this.resistance);
    }; //returns float
    getType() {
        return (this.type);
    }; //return String
}


//example of CircuitComponent sub-class:
class Switch extends CircuitComponent {
    constructor(x, y) {
        super(0, "SWITCH", x, y);
        this.closed = false;

        this.img = new Konva.Image({
            x: 0,
            y: 0,
            width: 65,
            height: 62,
            // stroke: 'red',
            // strokeWidth: 10,
            draggable: true,
        });

        var imageObj1 = new Image();
        //console.log(this.img);
        imageObj1.img = this.img;
        imageObj1.onload = function () {
            //console.log(this.img);
            this.img.image(imageObj1);
        };
        imageObj1.src = 'images/switch_off.jpg';
        this.graphics.add(this.img);
    }

    isClosed() {
        return (this.closed);
    }; //returns boolean

} 
