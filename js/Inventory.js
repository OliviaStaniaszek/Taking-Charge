//this is a group
//provide with array of types
//loop over the component array and use switch to draw them
//call inventory in gameBoard
//draws the relevant components from the array based on the level he recives from Game class
class Inventory {
    constructor(level) {
        this.inventory = [];
        this.graphics = new Konva.Group({
            x: 0,
            y: 0,
            rotation: 0,
            draggable: false,

        });
        var rect = new Konva.Rect({
            width: 200,
            height: 600,
            fill: 'grey',
            //stroke: 'black',
            //strokeWidth: 5,
            x: 0,
            y: 0
        });

        this.graphics.add(rect);
        this.level = level;
        switch (level) {
            case 1:
                this.componentTypes = ["LIGHTBULB", "SWITCH", "BATTARY", "RESISTOR_10", "RESISTOR_50"];
                break;
            default:
                this.componentTypes = ["LIGHTBULB", "SWITCH", "BATTARY", "RESISTOR_10"];
                break;
        }
        for (var i = 0; i < this.componentTypes.length; i++) {
            this.inventory.push(this.createComponent(this.componentTypes[i], 20, 20 + 40 * i));
            //add the component's graphics to the inventory's graphics' Group
            this.graphics.add(this.inventory[i].graphics);

        }

    }
    createComponent(componentType, x, y) {
        var r = componentType.split("_");
        switch (r[0]) {
            case "LIGHTBULB":
                return (new LightBulb(x, y, false));
            case "RESISTOR":
                return (new Resistor(x, y, parseInt(r[1])));
            case "BATTARY":
                return (new Battery(x, y, 6));
            case "SWITCH":
                return (new Switch(x, y, false));
        }

    }
}