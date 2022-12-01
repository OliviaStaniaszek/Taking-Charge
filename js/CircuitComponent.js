
class CircuitComponent {
    //every circuit component has a resistance, type, location and graphics.
    constructor(resistance = 0, type = "EMPTY", x, y, imgPath, draggable = true) {
        this.resistance = resistance;
        this.type = type;
        this.x = x;
        this.y = y;
        this.graphics = new Konva.Group({
            x: x,
            y: y,
            rotation: 0,
            draggable: draggable
        });
        this.setImage(x, y, imgPath);

        this.graphics.on('mouseout', function () {
            // console.log(stage.getPointerPosition());
            // let pos = stage.getPointerPosition();
            // this.x = pos.x;
            // this.y = pos.y;
        })


    }

    getResistance() {
        return (this.resistance);
    } //returns float
    getType() {
        return (this.type);
    } //return String

    setImage(x, y, imgPath, text = "") {
        //to empty the graphics' group container
        this.graphics.removeChildren();
        this.img = new Konva.Image({
            x: x,
            y: y,
            width: 73,
            height: 65,
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

        var simpleText = new Konva.Text({
            x: x + 15,
            y: y - 10,
            text: text,
            fontSize: 12,
            fontFamily: 'Calibri',
            fill: 'black',
        });
        this.graphics.add(simpleText);

    }

    getX() {
        return (this.x);
    }

    getY() {
        return (this.y);
    }

    getRect() {
        return (this.img.getClientRect);
    }
}


//example of CircuitComponent sub-class: Switch
class Switch extends CircuitComponent {
    constructor(x, y, closed) {
        //initiate the parent CircuitComponent constructor with the spesic characteristics of the Switch
        super(0, "SWITCH", x, y, closed ? 'images/switch_on.png' : 'images/switch_off.png');
        this.closed = closed;
        this.graphics.me = this;

        this.graphics.on('pointerdblclick', function () {
            // console.log("clicked"); // 
            // console.log(this.me);

            this.me.isClosed() ? this.me.setOpen() : this.me.setClose();

            // console.log(this.me.me.closed);
        });
    }

    isClosed() {
        console.log("isClosed: " + this.closed);
        return (this.closed);

    }; //returns boolean

    setClose() {
        console.log("close");
        this.setImage(this.x, this.y, 'images/switch_on.png');
        this.closed = true;
    }

    setOpen() {
        console.log('open');
        this.setImage(this.x, this.y, 'images/switch_off.png');
        this.closed = false;
    }
}

class Resistor extends CircuitComponent {

    constructor(x, y, resistance) {

        super(resistance, "RESISTOR", x, y, 'images/resistor.png');
        this.resistance = resistance;
        this.graphics.me = this;

        var simpleText = new Konva.Text({
            x: this.img.width() / 2,
            y: this.img.y(),
            text: this.resistance.toString() + ' Ω',
            fontSize: 10,
            fontFamily: 'Calibri',
            fill: 'black',
        });

        this.graphics.add(simpleText);
    }

}

class Battery extends CircuitComponent {
    constructor(x, y, voltage) {
        super(0, "BATTERY", x, y, 'images/battery.png');
        this.voltage = voltage;
        this.graphics.me = this;
        var simpleText = new Konva.Text({
            x: this.img.width() / 2,
            y: this.img.y(),
            text: '6 V',
            fontSize: 10,
            fontFamily: 'Calibri',
            fill: 'black',
        });

        this.graphics.add(simpleText);
    }

    getVoltage() {
        return this.voltage;
    }

}

class Amperemeter extends CircuitComponent {
    constructor(ampere, x, y) {
        super(0, "AMPEREMETER", x, y, 'images/amperemeter.png', false);
        this.x = x;
        this.y = y;
        this.ampere = ampere;
        this.graphics.me = this;
        this.setImage(x, y, 'images/amperemeter.png', ampere + " A");
    }

    setAmpere(ampere) {
        return this.setImage(this.x, this.y, 'images/amperemeter.png', ampere.toFixed(1) + " A");
    }
}

class LightBulb extends CircuitComponent {
    constructor(x, y, on) {
        super(0, "LIGHTBULB", x, y, on ? 'images/lightbulb_off.png' : 'images/lightbulb_off.png');
        this.on = on;
        this.graphics.me = this;
    }

    isOn() {
        return this.on;
    }

    turnOn() {
        console.log("turnOn");
        this.on = true;
        this.setImage(this.x, this.y, 'images/lightbulb_on.png');
    }

    turnOff() {
        console.log("turnOff");
        this.on = false;
        this.setImage(this.x, this.y, 'images/lightbulb_off.png');
    }
}




class Thermistor extends CircuitComponent {

    constructor(x, y, resistance) {

        super(resistance, "THERMISTOR", x, y, 'images/thermistor.png');
        this.resistance = resistance;

        var text = new Konva.Text({
            x: stage.width() / 1.2,
            y: 625,
            text: 'Thermistor resistance: ',
            fontSize: 22,
            fontFamily: 'Calibri',
            fill: 'blue',
        });

        this.graphics.add(text);
        layer.add(text);

        var textValue = new Konva.Text({
            x: stage.width() / 1.03,
            y: 625,
            text: '0',
            fontSize: 22,
            fontFamily: 'Calibri',
            fill: 'blue',
        });

        var slider = document.getElementById('slider');
        slider.oninput = function () {
            textValue.text(slider.value);
            layer.add(textValue);
            this.resistance = parseInt(slider.value);
            console.log(this.resistance);
            return this.resistance;
        }

    }
}

