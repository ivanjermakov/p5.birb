let w = 500;
let h = 780;

let gravity = 0.7;

let x = w / 2;
let y = h / 2;
let xSpeed = 7;
let ySpeed = 0;
let size = 50;

let score = 0;
let hScore = 0;

let spikes = [];
let spikeCount = 3;
let spikeSize = 50;

const spikeStepCount = 10;
const spikeStep = h / spikeStepCount;

let side = true;

function setup() {
    createCanvas(w, h);
    angleMode(DEGREES);
}

function draw() {
    background(41);

    drawSpikeBounds();

    for (let i = 0; i < spikes.length; i++) {
        spikes[i].drawSpike();
    }
    showScore();
    birb();
}

function keyTyped() {
    if (keyCode === 32) {
        //jump
        ySpeed = -13;
        loop();
    }
}

function mouseClicked() {
    //jump
    ySpeed = -13;
    loop();
}

function drawSpikeBounds() {
    let boundSpikesCount = floor(w / 75);
    let boundSpikesStep = w / boundSpikesCount;

    for (let i = 1; i < boundSpikesCount; i++) {
        fill(255);
        noStroke();
        rectMode(CENTER);
        push();
        translate(i * boundSpikesStep, 0);
        rotate(45);
        rect(0, 0, spikeSize, spikeSize);
        pop();
        push();
        translate(i * boundSpikesStep, h);
        rotate(45);
        rect(0, 0, spikeSize, spikeSize);
        pop();
    }
}


function birb() {
    isHit();
    collisionBounds();

    drawBirb();

    movement();
}

function isHit() {
    let posX;

    for (let i = 0; i < spikes.length; i++) {

        if (!side) {
            posX = 0;
        } else if (side) {
            posX = width;
        }

        let d = dist(x, y, posX, spikes[i].posY);

        if (d < spikeSize) {
            gameOver();
        }
    }
}

function collisionBounds() {
    let boundX = size / 2;
    let boundY = size;

    if (x < boundX || x > w - boundX) {
        xSpeed *= -1;
        score++;

        if (!side) {
            side = true;
        } else if (side) {
            side = false;
        }

        spikes = [];

        for (let i = 0; i < spikeCount; i++) {
            let spike = new Spike();

            spike.setY();
            spikes.push(spike);
        }
    }

    if (y < boundY || y > h - boundY) {
        gameOver();
    }
}

function drawBirb() {
    noStroke();
    fill(255);
    ellipse(x, y, size, size);
}

function movement() {
    x = x + xSpeed;
    y = y + ySpeed;
    if (ySpeed < 18) {
        ySpeed = ySpeed + gravity;
    }
}

function gameOver() {
    if (score > hScore) {
        hScore = score;
    }
    score = 0;

    x = w / 2;
    y = h / 2;
    ySpeed = 0;
    xSpeed = abs(xSpeed);
    side = true;

    noLoop();
}


function showScore() {
    textAlign(CENTER);
    textSize(20);
    fill(255);
    text('High score: ' + hScore, w / 2, 55);

    fill(100, 100, 100, 150);
    ellipse(w / 2, h / 2, 300, 300);

    textSize(200);
    textFont('BIG ORANGE');
    fill(41);
    text(score, w / 2, h / 2 + 70);
}


function Spike() {
    let posY;
    let stepPos;
}

Spike.prototype.setY = function () {
    let isUsed = false;

    this.posY = floor(random(spikeStepCount - 1) + 1) * spikeStep;

    for (let i = 0; i < spikes.length; i++) {

        if (spikes[i].posY === this.posY) {
            isUsed = true;
        }
    }

    if (isUsed) {
        this.setY();
    }
};

Spike.prototype.drawSpike = function () {
    noStroke();
    fill(255);
    push();
    rectMode(CENTER);
    if (!side) {
        translate(0, this.posY);
        rotate(45);
        rect(0, 0, spikeSize, spikeSize);
    } else if (side) {
        translate(w, this.posY);
        rotate(45);
        rect(0, 0, spikeSize, spikeSize);
    }
    pop();
};