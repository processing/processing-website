/**
 * Inheritance
 *
 * A class can be defined using another class as a foundation. In object-oriented
 * programming terminology, one class can inherit fi elds and methods from another.
 * An object that inherits from another is called a subclass, and the object it
 * inherits from is called a superclass. A subclass extends the superclass.
 */

function runLiveSketch(s) {
  var spots;
  var arm;

  s.setup = () => {
    s.createCanvas(640, 360);
    arm = new SpinArm(s.width / 2, s.height / 2, 0.01);
    spots = new SpinSpots(s.width / 2, s.height / 2, -0.02, 90.0);
  };

  s.draw = () => {
    s.background(204);
    arm.update();
    arm.display();
    spots.update();
    spots.display();
  };

  function Spin(xpos, ypos, s) {
    this.x = xpos;
    this.y = ypos;
    this.speed = s;
    this.angle = 0;

    this.update = function () {
      this.angle += this.speed;
    };
  }

  // Child class constructor
  function SpinArm(x, y, sp) {
    Spin.call(this, x, y, sp);

    // Override the display method
    this.display = function () {
      s.strokeWeight(1);
      s.stroke(0);
      s.push();
      s.translate(this.x, this.y);
      this.angle += this.speed;
      s.rotate(this.angle);
      s.line(0, 0, 165, 0);
      s.pop();
    };
  }

  // Inherit from the parent class
  SpinArm.prototype = Object.create(Spin.prototype);
  this.constructor = SpinArm;

  // Child class constructor
  function SpinSpots(x, y, sp, d) {
    this.dim = d;
    Spin.call(this, x, y, sp);

    // Override the display method
    this.display = function () {
      s.noStroke();
      s.push();
      s.translate(this.x, this.y);
      this.angle += this.speed;
      s.rotate(this.angle);
      s.ellipse(-this.dim / 2, 0, this.dim, this.dim);
      s.ellipse(this.dim / 2, 0, this.dim, this.dim);
      s.pop();
    };
  }

  // Inherit from the parent class
  SpinSpots.prototype = Object.create(Spin.prototype);
  this.constructor = SpinSpots;
}
