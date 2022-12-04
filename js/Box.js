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
        // console.log('box created');

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
        //   layer.add(rect1);
        this.graphics.add(this.rect1);



    }

    contains(invlevel) {
        for (let i = 0; i < invlevel.inventory.length; i++) {
            // console.log(invlevel.inventory[i]);
            let comp = invlevel.inventory[i]; //comp short for component
            // let compx = comp.getX();
            // let compy = comp.getY();
            // console.log(comp.position());
            // let rect = invlevel.inventory[i].getClientRect();
            // console.log(rect.x, rect.y);
            // console.log(invlevel.inventory[i].type, compx, compy);
            // if(comp.x - comp.width/2 > this.x - this.width && comp.x + comp.width/2 < this.x + this.width){

            // }

        }
    }


}



class Wire extends Box {
    constructor(x, y, width, height) {
        super(x, y, width, height);

    };

    drawBox() {
        // console.log('box created');

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
        //   layer.add(rect1);
        this.graphics.add(this.rect1);
    }

    contains() {
        return (null); //not applicable 
    }
}
