var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

class Inventory {
    //the constructor recives the game's level 
    constructor(level) {
        //array of the inventory components
        this.inventory = [];
        // //initiate the graphics of the inventory as a konva group
        // this.graphics = new Konva.Group({
        //     x: 0,
        //     y: 0,
        //     rotation: 0,
        //     draggable: false,

        // });
        // //inventory's fixed background
        // var rect = new Konva.Rect({
        //     width: 200,
        //     height: 600,
        //     fill: '#B0AFAF',
        //     x: 0,
        //     y: 0
        // });
        // this.graphics.add(rect);
        // //inventory's border
        // var border = new Konva.Rect({
        //     width: 2,
        //     height: rect.height(),
        //     fill: '#B0AFAF',
        //     //fill: 'yellow',
        //     x: rect.width() - 2,
        //     y: 0
        // });
        // this.graphics.add(border);
        // console.log(border.x, border.y, border.height);

        



        this.level = level;
        //initiates the componentTypes arrAy based on the level provided
        switch (level) {
            //level 1
            case 1:
                this.componentTypes = ["LIGHTBULB", "SWITCH", "BATTARY", "RESISTOR_10", "RESISTOR_30", "RESISTOR_50"];
                break;
            default:
                this.componentTypes = ["LIGHTBULB", "SWITCH", "BATTARY", "RESISTOR_10"];
                break;
        }
        //build the inventory array of components,calling the createComponent function to create the appropriate circuit components for the given level
        for (var i = 0; i < this.componentTypes.length; i++) {
            this.inventory.push(this.createComponent(this.componentTypes[i], 20, 20 + 40 * i));
            //add the component's graphics to the inventory's graphics' Group
            // this.graphics.add(this.inventory[i].graphics);

        }

    }

    drawInvBox(){
        // ctx.beginPath();
        // ctx.rect(0,0,200,700);
        // ctx.fillStyle = "#B0AFAF";
        // ctx.fill();
        
        // ctx.closePath();
        // ctx.fillRect(0,0, 200, canvas,getBoundingClientRect().height);
    }

    //create the components based on the given types
    createComponent(componentType, x, y) {
        //split the componentType string where _ appears. this is done to seperate the resistor from the resistance provided
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

window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
    // drawInvBox();
  });