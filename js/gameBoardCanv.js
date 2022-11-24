document.getElementById("body").onload = function () { playGame() };


function playGame() {
    console.log("play game");
    width = window.innerWidth;
    height = window.innerHeight;

    drawInvBox();

    let battery = new Battery(20,20,20);
    battery.createImg();
}

function drawInvBox(){
    ctx.beginPath();
    ctx.rect(0, 0, width/7, height);
    ctx.fillStyle = "#B0AFAF";
    ctx.fill();
}