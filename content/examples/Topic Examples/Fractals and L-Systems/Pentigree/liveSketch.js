/**
 * Pentigree L-System
 * by Geraldine Sarmiento.
 *
 * This code was based on Patrick Dwyer's L-System class.
 */

function runLiveSketch(s) {
  var ps;

  s.setup = () => {
    s.createCanvas(640, 360);
    ps = new PentigreeLSystem();
    ps.simulate(3);
  };

  s.draw = () => {
    s.background(0);
    ps.render();
  };

  // Child class constructor
  function PentigreeLSystem() {
    LSystem.call(this);
    this.steps = 0;
    this.somestep = 0.1;
    this.xoff = 0.01;
    this.axiom = 'F-F-F-F-F';
    this.rule = 'F-F++F+F-F-F';
    this.startLength = 60.0;
    this.theta = s.radians(72);
    this.reset();
  }

  // Inherit from the parent class
  PentigreeLSystem.prototype = Object.create(LSystem.prototype);
  this.constructor = PentigreeLSystem;

  PentigreeLSystem.prototype.useRule = function (r_) {
    this.rule = r_;
  };

  PentigreeLSystem.prototype.useAxiom = function (a_) {
    this.axiom = a_;
  };

  PentigreeLSystem.prototype.useLength = function (l_) {
    this.startLength = l_;
  };

  PentigreeLSystem.prototype.useTheta = function (t_) {
    this.theta = radians(t_);
  };

  PentigreeLSystem.prototype.reset = function () {
    this.production = this.axiom;
    this.drawLength = this.startLength;
    this.generations = 0;
  };

  PentigreeLSystem.prototype.getAge = function () {
    return this.generations;
  };

  PentigreeLSystem.prototype.render = function () {
    s.translate(s.width / 4, s.height / 2);
    this.steps += 3;
    if (this.steps > this.production.length) {
      this.steps = this.production.length;
    }

    for (var i = 0; i < this.steps; i++) {
      var step = this.production.charAt(i);
      if (step == 'F') {
        s.noFill();
        s.stroke(255);
        s.line(0, 0, 0, -this.drawLength);
        s.translate(0, -this.drawLength);
      } else if (step == '+') {
        s.rotate(this.theta);
      } else if (step == '-') {
        s.rotate(-this.theta);
      } else if (step == '[') {
        s.push();
      } else if (step == ']') {
        s.pop();
      }
    }
  };

  function LSystem() {
    this.steps = 0;
    this.axiom = 'F';
    this.rule = 'F+F-F';
    this.startLength = 90.0;
    this.theta = s.radians(120.0);
    this.reset();
  }

  LSystem.prototype.reset = function () {
    this.production = this.axiom;
    this.drawLength = this.startLength;
    this.generations = 0;
  };

  LSystem.prototype.getAge = function () {
    return this.generations;
  };

  LSystem.prototype.render = function () {
    s.translate(s.width / 2, s.height / 2);
    this.steps += 5;
    if (this.steps > this.production.length()) {
      this.steps = this.production.length();
    }
    for (var i = 0; i < steps; i++) {
      var step = this.production.charAt(i);
      if (step == 'F') {
        s.rect(0, 0, -this.drawLength, -this.drawLength);
        s.noFill();
        s.translate(0, -this.drawLength);
      } else if (step == '+') {
        s.rotate(this.theta);
      } else if (step == '-') {
        s.rotate(-this.theta);
      } else if (step == '[') {
        s.push();
      } else if (step == ']') {
        s.pop();
      }
    }
  };

  LSystem.prototype.simulate = function (gen) {
    while (this.getAge() < gen) {
      this.production = this.iterate(this.production, this.rule);
    }
  };

  LSystem.prototype.iterate = function (prod_, rule_) {
    this.drawLength = this.drawLength * 0.6;
    this.generations++;
    var newProduction = prod_;
    //println(newProduction);
    newProduction = newProduction.replace(/F/g, rule_);
    return newProduction;
  };
}
