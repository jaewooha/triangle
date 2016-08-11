// Codes Reference: http://p5js.org

// Circle class
function Circle(_x, _y, _d) {
  this.x = _x;
  this.y = _y;
  this.intDia = _d; // intial diameter
  this.dia = this.intDia; // set diameter
  this.xspeed = random(-5, 5); 
  this.yspeed = random(-1.5, 1.5);
  this.color = random(0, 255);
  this.isDone = false;

// move randomly, size changes randomly
  this.move = function() {
    this.x += this.xspeed;
    this.y += this.yspeed;
    this.dia += random(-.3, .5);
  };

// draw ellipse
  this.display = function() {
    fill(this.color);
    ellipse(this.x, this.y, this.dia, this.dia);
  };

// check edge
  this.edgeCheck = function() {
    if (this.x > width || this.x < 0) {
      this.xspeed = this.xspeed * (-1);
    }
    if (this.y > width || this.y < 0) {
      this.yspeed = this.yspeed * (-1);
    }
  };

// check size: if the bubble reaches a certain size, produce more
  this.sizeCheck = function() {
    if (this.dia > 80) {
      this.isDone = true;
      for (var i = 0; i < random(3,10); i++) {
        bubbles.push(new Circle(this.x, this.y, 0));
      }
    }
  };
}
var bubbles = [];

function setup() {
  createCanvas(500, 500);
  //Create objects
  for (var i = 0; i < 5; i++) {
    bubbles.push(new Circle(mouseX, mouseY, 0));
  }
}


function draw() {
  background('green');
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
    bubbles[i].edgeCheck();
    bubbles[i].sizeCheck();
  }
  
// reduce array (based on the size of the buble)
  
  for (var i=bubbles.length - 1; i>=0; i-- ){
    if (bubbles[i].isDone) {
      bubbles.splice(i, 1);
      print("Bubble Removed");
    }
  }
  print(bubbles.length);
}

// if mouse is dragged, create more

function mouseDragged() {
  bubbles.push(new Circle(mouseX, mouseY, 0));
}