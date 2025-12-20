/**
 * Composite Objects
 *
 * An object can include several other objects. Creating such composite objects
 * is a good way to use the principles of modularity and build higher levels of
 * abstraction within a program.
 */
function runLiveSketch(s) {
  var er1, er2;

  s.setup = () => {
    s.createCanvas(640, 360);
    er1 = new EggRing(s.width * 0.45, s.height * 0.5, 0.1, 120);
    er2 = new EggRing(s.width * 0.65, s.height * 0.8, 0.05, 180);
  };

  s.draw = () => {
    s.background(0);
    er1.transmit();
    er2.transmit();
  };

  function EggRing(x, y, t, sp) {
    this.ovoid = new Egg(x, y, t, sp);
    this.circle = new Ring();
    this.circle.start(x, y - sp / 2);

    this.transmit = function () {
      this.ovoid.wobble();
      this.ovoid.display();
      this.circle.grow();
      this.circle.display();
      if (this.circle.on == false) {
        this.circle.on = true;
      }
    };
  }

  // Constructor
  function Egg(xpos, ypos, t, sp) {
    this.x = xpos;
    this.y = ypos;
    this.tilt = t;
    this.scalar = sp / 100.0;
    this.angle = 0;

    this.wobble = function () {
      this.tilt = s.cos(this.angle) / 8;
      this.angle += 0.1;
    };

    this.display = function () {
      s.noStroke();
      s.fill(255);
      s.push();
      s.translate(this.x, this.y);
      s.rotate(this.tilt);
      s.scale(this.scalar);
      s.beginShape();
      s.vertex(0, -100);
      s.bezierVertex(25, -100, 40, -65, 40, -40);
      s.bezierVertex(40, -15, 25, 0, 0, 0);
      s.bezierVertex(-25, 0, -40, -15, -40, -40);
      s.bezierVertex(-40, -65, -25, -100, 0, -100);
      s.endShape();
      s.pop();
    };
  }

  function Ring() {
    this.x = 0;
    this.y = 0;
    this.on = false;
    this.diameter = 0;

    this.start = function (xpos, ypos) {
      this.x = xpos;
      this.y = ypos;
      this.on = true;
      this.diameter = 1;
    };

    this.grow = function () {
      if (this.on == true) {
        this.diameter += 0.5;
        if (this.diameter > s.width * 2) {
          this.diameter = 0.0;
        }
      }
    };

    this.display = function () {
      if (this.on == true) {
        s.noFill();
        s.strokeWeight(4);
        s.stroke(155, 153);
        s.ellipse(this.x, this.y, this.diameter, this.diameter);
      }
    };
  }
}
