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

    drawBox(x,y,width,height){
        console.log('box created');
        // let box = new Konva.Rect({
        //     x: this.x,
        //     y: this.y,
        //     width: this.width,
        //     height: this.height,
        //     fill: 'red',
        //     stroke: 'black',
        //     strokeWidth: 4
        // })
        // this.graphics.add(box);

        this.rect1 = new Konva.Rect({
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4,
          });
          // add the shape to the layer
        //   layer.add(rect1);
        this.graphics.add(this.rect1);
        

        
    }

    // contains(){

    // }
        

    }