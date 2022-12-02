
class Inventory {
    //the constructor recives the game's level 
    constructor(level) {
        //array of the inventory components
        this.inventory = [];
        //initiate the graphics of the inventory as a konva group
        this.graphics = new Konva.Group({
            x: 0,
            y: 0,
            rotation: 0,
            draggable: false,

        });
        //inventory's fixed background
        var rect = new Konva.Rect({
            width: 195,
            height: 500,
            fill: '#E7E6E6',
            x: 10,
            y: 0
        });
        this.graphics.add(rect);


        this.level = level;
        //initiates the componentTypes array based on the level provided
        switch (level) {
            //level 1jht
            case 1:
                this.componentTypes = ["LIGHTBULB", "SWITCH", "BATTARY", "RESISTOR_2", "RESISTOR_4", "RESISTOR_8"];
                break;
            default:
                this.componentTypes = ["LIGHTBULB", "SWITCH", "BATTARY", "RESISTOR_2", "RESISTOR_4", "RESISTOR_8"];
                break;
        }
        //build the inventory array of components,calling the createComponent function to create the appropriate circuit components for the given level
        for (var i = 0; i < this.componentTypes.length; i++) {
            this.inventory.push(this.createComponent(this.componentTypes[i], (i % 2 == 0) ? 5 : 50, 25 + 40 * Math.floor(i / 2)));
            //add the component's graphics to the inventory's graphics' Group
            this.graphics.add(this.inventory[i].graphics);

        }

    }

    //create the components based on the given types
    createComponent(componentType, x, y) {
        //split the componentType string where _ appears. this is done to seperate the resistor from the resistance provided
        var r = componentType.split("_");
        var resistance;
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
    //checks which component this graphics belongs to 
    whoAmI(graphics) {
        this.inventory.forEach(function (item) {
            if (item.graphics == graphics) {
                return (item);
            }
        }

        );
        console.log("Inventory.whoIAm() couldn't find the component");
        return (null);
    }
}