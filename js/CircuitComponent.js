
class CircuitComponent {
    //every circuit component has a resistance, type, location and graphics.
    constructor(resistance = 0, type = "EMPTY", x, y, imgPath, altImgPath, draggable = true) {
        this.resistance = resistance;
        this.type = type;
        this.x = x;
        this.y = y;
        this.symbolMode = false;
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
            width: 90, 
            height: 90,
        });

        var imageObj1 = new Image();
        imageObj1.img = this.img;
        imageObj1.onload = function () {
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

class Switch extends CircuitComponent {
    constructor(x, y, closed) {
        //initiate the parent CircuitComponent constructor with the spesic characteristics of the Switch
        super(0, "SWITCH", x, y, closed ? 'images/circuit symbols/switch closed.png' : 'images/circuit symbols/switch open.png', closed ? 'images/circuit diagrams/ switch closed.png' : 'images/circuit diagrams/ switch.png');

        this.closed = closed;
        this.graphics.me = this;

        this.graphics.on('pointerdblclick', function () {
            this.me.isClosed() ? this.me.setOpen() : this.me.setClose();
        });
    }

    isClosed() {
        console.log("isClosed: " + this.closed);
        return (this.closed);
    }; //returns boolean

    setClose() {
        console.log("close");
        console.log(this.symbolMode);
        this.closed = true;
        this.draw();
    }

    setOpen() {
        console.log('open');
        this.closed = false;
        this.draw();
    }

    draw() {
        if (this.symbolMode) {
            this.setSymbol();
        } else {
            this.setDiagram();
        }
    }

    setSymbol() {
        this.symbolMode = true;
        if (this.closed) {
            this.setImage(this.x, this.y, 'images/circuit symbols/switch closed.png');
        } else {
            this.setImage(this.x, this.y, 'images/circuit symbols/switch open.png');
        }
    }

    setDiagram() {
        this.symbolMode = false;
        if (this.closed) {
            this.setImage(this.x, this.y, 'images/circuit diagrams/switch closed.png');
        } else {
            this.setImage(this.x, this.y, 'images/circuit diagrams/switch open.png');
        }
    }
}

class Resistor extends CircuitComponent {
    constructor(x, y, resistance) {
        super(resistance, "RESISTOR", x, y, 'images/circuit symbols/resistor.png');
        this.resistance = resistance;
        this.graphics.me = this;

        var simpleText = new Konva.Text({
            x: this.img.width() / 2,
            y: this.img.y(),
            text: this.resistance.toString() + ' Ω',
            fontSize: 20,
            fontFamily: 'Calibri',
            fill: 'black',
        });

        this.graphics.add(simpleText);
    }

    setDiagram() {
        this.symbolMode = false;
        this.setImage(this.x, this.y, 'images/circuit diagrams/resistor.png', this.resistance + " Ω");
    }

    setSymbol() {
        this.symbolMode = true;
        this.setImage(this.x, this.y, 'images/circuit symbols/resistor.png', this.resistance + " Ω");
    }

}

class Battery extends CircuitComponent {
    constructor(x, y, voltage) {
        // super(0, "BATTERY", x, y, 'images/battery.png');
        super(0, "BATTERY", x, y, 'images/circuit symbols/battery.png');
        this.voltage = voltage;
        this.graphics.me = this;
        var simpleText = new Konva.Text({
            x: this.img.width() / 2,
            y: this.img.y(),
            text: '6 V',
            fontSize: 20,
            fontFamily: 'Calibri',
            fill: 'black',
        });

        this.graphics.add(simpleText);
    }

    getVoltage() {
        return this.voltage;
    }

    setDiagram() {
        this.symbolMode = false;
        this.setImage(this.x, this.y, 'images/circuit diagrams/battery.png', this.voltage + " V");
    }

    setSymbol() {
        this.symbolMode = true;
        this.setImage(this.x, this.y, 'images/circuit symbols/battery.png', this.voltage + " V");
    }
}

class Amperemeter extends CircuitComponent {
    constructor(ampere, x, y) {
        super(0, "AMPEREMETER", x, y, 'images/circuit symbols/ammeter.png', false);
        this.x = x - 100;
        this.y = y - 25;
        this.ampere = ampere;
        this.graphics.me = this;
        this.graphics.draggable = false; 
        this.setImage(x - 100, y - 25, 'images/circuit symbols/ammeter.png', ampere + " A");
    }

    setAmpere(ampere) {
        if (this.symbolMode) {
            return this.setImage(this.x, this.y, 'images/circuit symbols/ammeter.png', ampere.toFixed(1) + " A");
        } else {
            return this.setImage(this.x, this.y, 'images/circuit diagrams/ammeter.png', ampere.toFixed(1) + " A");
        }

    }

    setDiagram() {
        this.symbolMode = false;
        this.setImage(this.x, this.y, 'images/circuit diagrams/ammeter.png', this.ampere.toFixed(1) + " A");
    }
    setSymbol() {
        this.symbolMode = true;
        this.setImage(this.x, this.y, 'images/circuit symbols/ammeter.png', this.ampere.toFixed(1) + " A");

    }
}

class LightBulb extends CircuitComponent {
    constructor(x, y, on) {
        super(0, "LIGHTBULB", x, y, on ? 'images/circuit symbols/lamp on.png' : 'images/circuit symbols/lamp.png');
        this.on = on;
        this.graphics.me = this;
    }

    isOn() {
        return this.on;
    }

    turnOn() {
        console.log("turnOn " + symbolMode);
        this.on = true;
        this.draw();
    }

    turnOff() {
        console.log("turnOff " + symbolMode);
        this.on = false;
        this.draw();
    }

    draw() {
        console.log("LightBulb.draw() symbolMode=" + symbolMode);
        if (this.symbolMode) {
            this.setSymbol();
        } else {
            this.setDiagram();
        }
    }

    setDiagram() {
        console.log("LightBulb.setDiagram() this.on=" + this.on);
        this.symbolMode = false;
        if (this.on) {
            this.setImage(this.x, this.y, 'images/circuit diagrams/lamp.png');
        } else {
            this.setImage(this.x, this.y, 'images/circuit diagrams/lamp off.png');
        }
    }

    setSymbol() {
        console.log("LightBulb.setSymbol() this.on=" + this.on);
        this.symbolMode = true;
        if (this.on) {
            this.setImage(this.x, this.y, 'images/circuit symbols/lamp on.png');
        } else {
            this.setImage(this.x, this.y, 'images/circuit symbols/lamp.png');
        }
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

    setDiagram() {
        this.symbolMode = false;
        this.setImage(this.x, this.y, 'images/circuit diagrams/battery.png');
    }
    setSymbol() {
        this.symbolMode = true;
        this.setImage(this.x, this.y, 'images/circuit symbols/battery.png');
    }
}

