// setup canvas
const para3 = document.getElementById("total");
const para1 = document.getElementById("goodCount");
const para2 = document.getElementById("evilCount");
var total = 100
let count1 = 0;
let count2 = 0;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}

function Shape(x, y, velX, velY, exists) {
    this.x = x
    this.y = y
    this.velX = velX
    this.velY = velY
    this.exists = exists

}


// function to create the balls
function Ball(x, y, velX, velY, exists, color, size) {
    Shape.call(this, x, y, velX, velY, exists);
    this.color = color;
    this.size = size;
}
Ball.prototype = Object.create(Shape.prototype);

function Circle(x, y, velX, velY, exists, color, size) {
    Shape.call(this, x, y, velX, velY, exists);
    this.color = color;
    this.size = size;

}
Circle.prototype = Object.create(Shape.prototype);
// function to draw the balls
Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}
Circle.prototype.draw = function() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
}

Circle.prototype.setControls = function(array) {
    let evil_ball = array[0];
    let good_ball = array[1];
    // console.log("red")
    window.onkeydown = function(e) {
        // if (_this.color == "red") {
        if (e.key === 'j') {
            good_ball.x -= good_ball.velX;
        } else if (e.key === 'l') {
            good_ball.x += good_ball.velX;
        } else if (e.key === 'i') {
            good_ball.y -= good_ball.velY;
        } else if (e.key === 'k') {
            good_ball.y += good_ball.velY;
        }
        // } else if (_this.color == "green") {
        if (e.key === 'a') {
            evil_ball.x -= evil_ball.velX;
        } else if (e.key === 'd') {
            evil_ball.x += evil_ball.velX;
        } else if (e.key === 'w') {
            evil_ball.y -= evil_ball.velY;
        } else if (e.key === 's') {
            evil_ball.y += evil_ball.velY;
        }
        // }
    }
}


// updates the balls position 
Ball.prototype.update = function() {
    // if ((this.x + this.size) >= width) {
    //     this.velX = -(this.velX);
    // }
    // if ((this.x - this.size) <= 0) {
    //     this.velX = -(this.velX);
    // }
    // if ((this.y + this.size) >= height) {
    //     this.velY = -(this.velY);
    // }
    // if ((this.y - this.size) <= 0) {
    //     this.velY = -(this.velY);
    // }
    if ((this.x + this.size) >= width) {
        this.x = 0 + this.size + 5;
    }
    if ((this.x - this.size) <= 0) {
        // this.velX = -(this.velX);
        this.x = width - this.size - 5
    }
    if ((this.y + this.size) >= height) {
        // this.velY = -(this.velY);
        this.y = 0 + this.size + 5;
    }
    if ((this.y - this.size) <= 0) {
        // this.velY = -(this.velY);
        this.y = height - this.size - 5
    }
    this.x += this.velX;
    this.y += this.velY;
}
Ball.prototype.collisionDetect = function() {
    for (let j = 0; j < balls.length; j++) {
        if (!(this === balls[j])) {
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.size + balls[j].size) {
                // balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
                balls[j].size = random(5, 20)
            }
        }
    }
}

Circle.prototype.checkbounds = function() {
    if ((this.x + this.size) >= width) {
        this.x = 0 + this.size + 5;
    }
    if ((this.x - this.size) <= 0) {
        // this.velX = -(this.velX);
        this.x = width - this.size - 5
    }
    if ((this.y + this.size) >= height) {
        // this.velY = -(this.velY);
        this.y = 0 + this.size + 5;
    }
    if ((this.y - this.size) <= 0) {
        // this.velY = -(this.velY);
        this.y = height - this.size - 5
    }
}
Circle.prototype.collisionDetect = function(array) {
    let evilBall = arr[0]
    let goodBall = arr[1]
    for (let j = 0; j < balls.length; j++) {
        if (balls[j].exists) {
            var dx = evilBall.x - balls[j].x;
            var dy = evilBall.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < evilBall.size + balls[j].size) {
                balls[j].exists = false;
                total--
                count2++;
                para2.textContent = 'Player 2: ' + count2;
                para3.textContent = "Total count: " + total;
            }
            dx = goodBall.x - balls[j].x;
            dy = goodBall.y - balls[j].y;
            distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < goodBall.size + balls[j].size) {
                balls[j].exists = false;
                total--
                count1++;
                para1.textContent = 'Player 1: ' + count1;
                para3.textContent = "Total count: " + total;
            }
        }
    }
}
let balls = [];
let evil = new Circle(width * .75, height / 2, 20, 20, true, "red", 10)
let good = new Circle(width * .25, height / 2, 20, 20, true, "green", 10)
let arr = [good, evil]
evil.setControls(arr);
good.setControls(arr);
// creates 25 balls to display on the screen 
while (balls.length < 25) {
    let size = random(10, 20);
    let ball = new Ball(
        // ball position always drawn at least one ball width
        // away from the edge of the canvas, to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        exists = true,
        'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
        size
    );
    balls.push(ball);
}
// creates the animation loop to show the balls moving  
function loop() {
    // evil.setControls();
    // good.setControls();
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < balls.length; i++) {
        if (balls[i].exists) {
            balls[i].draw();
        }
        balls[i].update();
        balls[i].collisionDetect();
    }
    requestAnimationFrame(loop);
    evil.draw();
    evil.checkbounds();
    evil.collisionDetect();
    good.draw();
    good.checkbounds();
    good.collisionDetect();
}

loop();