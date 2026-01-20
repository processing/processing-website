/**
 * Forces (Gravity and Fluid Resistence) with Vectors
 * by Daniel Shiffman.
 *
 * Demonstration of multiple force acting on bodies (Mover class)
 * Bodies experience gravity continuously
 * Bodies experience fluid resistance when in "water"
 *
 * For the basics of working with PVector, see
 * http://processing.org/learning/pvector/
 * as well as examples in Topics/Vectors/
 *
 */

function runLiveSketch(s) {
  // Five moving bodies
  var movers = [];

  // Liquid
  var liquid;

  s.setup = () => {
    s.createCanvas(640, 360);
    reset();
    // Create liquid object
    liquid = new Liquid(0, s.height / 2, s.width, s.height / 2, 0.1);
  };

  s.draw = () => {
    s.background(0);

    // Draw water
    liquid.display();

    for (var i = 0; i < movers.length; i++) {
      var mover = movers[i];

      // Is the Mover in the liquid?
      if (liquid.contains(mover)) {
        // Calculate drag force
        var drag = liquid.drag(mover);
        // Apply drag force to Mover
        mover.applyForce(drag);
      }

      // Gravity is scaled by mass here!
      var gravity = s.createVector(0, 0.1 * mover.mass);
      // Apply gravity
      mover.applyForce(gravity);

      // Update and display
      mover.update();
      mover.display();
      mover.checkEdges();
    }

    s.fill(255);
    s.noStroke();
    s.text('click mouse to reset', 10, 30);
  };

  s.mousePressed = () => {
    reset();
  };

  // Restart all the Mover objects randomly
  function reset() {
    for (var i = 0; i < 10; i++) {
      movers[i] = new Mover(s.random(0.5, 3), 40 + i * 70, 0);
    }
  }

  var Liquid = function (x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;

    // Is the Mover in the Liquid?
    this.contains = function (m) {
      var l = m.position;
      return (
        l.x > this.x &&
        l.x < this.x + this.w &&
        l.y > this.y &&
        l.y < this.y + this.h
      );
    };

    // Calculate drag force
    this.drag = function (m) {
      // Magnitude is coefficient * speed squared
      var speed = m.velocity.mag();
      var dragMagnitude = this.c * speed * speed;

      // Direction is inverse of velocity
      var dragForce = m.velocity.copy();
      dragForce.mult(-1);

      // Scale according to magnitude
      // dragForce.setMag(dragMagnitude);
      dragForce.normalize();
      dragForce.mult(dragMagnitude);
      return dragForce;
    };

    this.display = function () {
      s.noStroke();
      s.fill(127);
      s.rect(this.x, this.y, this.w, this.h);
    };
  };

  function Mover(m, x, y) {
    this.mass = m;
    this.position = s.createVector(x, y);
    this.velocity = s.createVector(0, 0);
    this.acceleration = s.createVector(0, 0);

    // Newton's 2nd law: F = M * A
    // or A = F / M
    this.applyForce = function (force) {
      var f = p5.Vector.div(force, this.mass);
      this.acceleration.add(f);
    };

    this.update = function () {
      // Velocity changes according to acceleration
      this.velocity.add(this.acceleration);
      // position changes by velocity
      this.position.add(this.velocity);
      // We must clear acceleration each frame
      this.acceleration.mult(0);
    };

    this.display = function () {
      s.stroke(255);
      s.strokeWeight(2);
      s.fill(255, 200);
      s.ellipse(
        this.position.x,
        this.position.y,
        this.mass * 16,
        this.mass * 16
      );
    };

    // Bounce off bottom of window
    this.checkEdges = function () {
      if (this.position.y > s.height) {
        this.velocity.y *= -0.9; // A little dampening when hitting the bottom
        this.position.y = s.height;
      }
    };
  }
}
