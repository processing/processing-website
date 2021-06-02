/**
 * ArrayList of objects
 * by Daniel Shiffman.
 *
 * This example demonstrates how to use a Java ArrayList to store
 * a variable number of objects.  Items can be added and removed
 * from the ArrayList.
 *
 * Click the mouse to add bouncing balls.
 */
function runLiveSketch(s) {
  var balls = [];
  var ballWidth = 48;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.noStroke();

    // Start by adding one element
    balls.push(new Ball(s.width / 2, 0, ballWidth));
  };

  s.draw = () => {
    s.background(255);

    // With an array, we say balls.length, with an ArrayList, we say balls.size()
    // The length of an ArrayList is dynamic
    // Notice how we are looping through the ArrayList backwards
    // This is because we are deleting elements from the list
    for (var i = balls.length - 1; i >= 0; i--) {
      // An ArrayList doesn't know what it is storing so we have to cast the object coming out
      var ball = balls[i];
      ball.move();
      ball.display();
      if (ball.finished()) {
        // Items can be deleted with remove()
        balls.splice(i, 1);
      }
    }
  };

  s.mousePressed = () => {
    // A new ball object is added to the ArrayList (by default to the end)
    balls.push(new Ball(s.mouseX, s.mouseY, ballWidth));
  };

  // Simple bouncing ball class

  function Ball(tempX, tempY, tempW) {
    this.x = tempX;
    this.y = tempY;
    this.w = tempW;
    this.speed = 0;
    this.gravity = 0.1;
    this.life = 255;

    this.move = function () {
      // Add gravity to speed
      this.speed = this.speed + this.gravity;
      // Add speed to y location
      this.y = this.y + this.speed;
      // If square reaches the bottom
      // Reverse speed
      if (this.y > s.height) {
        // Dampening
        this.speed = this.speed * -0.8;
        this.y = s.height;
      }
    };

    this.finished = function () {
      // Balls fade out
      this.life--;
      if (this.life < 0) {
        return true;
      } else {
        return false;
      }
    };

    this.display = function () {
      // Display the circle
      s.fill(0, this.life);
      //stroke(0,life);
      s.ellipse(this.x, this.y, this.w, this.w);
    };
  }
}
