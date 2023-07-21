const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;
ctx.globalCompositeOperation = "multiply";

const center = {
    x: canvas.width / 2,
    y: canvas.height / 2
};

const inputs = {
    c: new Slider("cSlider", 15),
    m: new Slider("mSlider", 75),
    y: new Slider("ySlider", 0),
    k: new Slider("kSlider", 45),

    cOffsetX: new Slider("cOffsetX", 0),
    cOffsetY: new Slider("cOffsetY", 0),

    mOffsetX: new Slider("mOffsetX", 0),
    mOffsetY: new Slider("mOffsetY", 0),
    
    yOffsetX: new Slider("yOffsetX", 0),
    yOffsetY: new Slider("yOffsetY", 0),

    kOffsetX: new Slider("kOffsetX", 0),
    kOffsetY: new Slider("kOffsetY", 0),

    xSlider: new Slider("x-slider", 31),
    ySlider: new Slider("y-slider", 51),
    sizeSlider: new Slider("size-slider", 1)
};

const resetButton = document.getElementById("resetButton");

let dotsX;
let dotsY;

let radius;
let space;

let offsets = {
    "cyan": {x: 0, y: 0},
    "magenta": {x: 0, y: 0},
    "yellow": {x: 0, y: 0},
    "black": {x: 0, y: 0},
};

Object.values(inputs).forEach(input => {
    
    input.element.addEventListener("input", function() {
        input.value = input.element.value;
        input.text.data = input.value;
        requestAnimationFrame(draw);
    });
});

resetButton.addEventListener("click", () => {
    Object.values(inputs).forEach(input => {
        if(input.id != "size-slider" && input.id != "x-slider" && input.id != "y-slider")
        {
            input.value = input.defaultValue;
            input.element.value = input.value;
            input.text.data = input.value;
        }
    });

    requestAnimationFrame(draw);
});


function drawCircle(x, y)
{
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
}

function drawRectangle(color, angle)
{
    let radians = angle * Math.PI / 180;

    let rectWidth = dotsX * (radius * 2 + space) - space;
    let rectHeight = dotsY * (radius * 2 + space) - space;

    let offsetX = offsets[color].x * radius;
    let offsetY = -offsets[color].y * radius;

    ctx.fillStyle = color;

    let dx = -Math.cos(radians) * (rectWidth / 2 - radius) - Math.sin(radians) * (rectHeight / 2 - radius);
    let dy = -Math.cos(radians) * (rectHeight / 2 - radius) + Math.sin(radians) * (rectWidth / 2 - radius);

    ctx.beginPath();

    for(let i = 0; i < dotsY; ++i)
    {
        for(let j = 0; j < dotsX; ++j)
        {
            drawCircle(
                center.x + i * Math.sin(radians) * (radius * 2 + space) + j * Math.cos(radians) * (radius * 2 + space) + dx + offsetX,
                center.y + i * Math.cos(radians) * (radius * 2 + space) - j * Math.sin(radians) * (radius * 2 + space) + dy + offsetY);
        }
    }

    ctx.fill();
}

function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.globalAlpha = 1;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    dotsX = inputs.xSlider.value;
    dotsY = inputs.ySlider.value;

    radius = inputs.sizeSlider.value * 1.0;
    space = inputs.sizeSlider.value * 1.0;

    offsets["cyan"].x = inputs.cOffsetX.value * 1.0;
    offsets["cyan"].y = inputs.cOffsetY.value * 1.0;

    offsets["magenta"].x = inputs.mOffsetX.value * 1.0;
    offsets["magenta"].y = inputs.mOffsetY.value * 1.0;

    offsets["yellow"].x = inputs.yOffsetX.value * 1.0;
    offsets["yellow"].y = inputs.yOffsetY.value * 1.0;

    offsets["black"].x = inputs.kOffsetX.value * 1.0;
    offsets["black"].y = inputs.kOffsetY.value * 1.0;

    ctx.globalAlpha = 0.75;
    drawRectangle("yellow", -inputs.y.value);
    drawRectangle("cyan", -inputs.c.value);
    drawRectangle("magenta", -inputs.m.value);
    drawRectangle("black", -inputs.k.value);

    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

requestAnimationFrame(draw);