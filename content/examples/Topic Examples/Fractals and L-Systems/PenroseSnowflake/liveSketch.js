/**
 * Penrose Snowflake L-System
 * by Geraldine Sarmiento.
 *
 * This code was based on Patrick Dwyer's L-System class.
 */
function runLiveSketch(s) {
  var ps;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.stroke(255);
    s.noFill();
    ps = new PenroseSnowflakeLSystem();
    ps.simulate(4);
  };

  s.draw = () => {
    s.background(0);
    ps.render();
  };

  // Child class constructor
  function PenroseSnowflakeLSystem() {
    LSystem.call(this);
    this.steps = 0;
    this.axiom = 'F3-F3-F3-F3-F';
    this.ruleF = 'F3-F3-F45-F++F3-F';
    this.startLength = 450.0;
    this.theta = s.radians(18);
    this.reset();
  }

  // Inherit from the parent class
  PenroseSnowflakeLSystem.prototype = Object.create(LSystem.prototype);
  this.constructor = PenroseSnowflakeLSystem;

  PenroseSnowflakeLSystem.prototype.useRule = function (r_) {
    this.rule = r_;
  };

  PenroseSnowflakeLSystem.prototype.useAxiom = function (a_) {
    this.axiom = a_;
  };

  PenroseSnowflakeLSystem.prototype.useLength = function (l_) {
    this.startLength = l_;
  };

  PenroseSnowflakeLSystem.prototype.useTheta = function (t_) {
    this.theta = radians(t_);
  };

  PenroseSnowflakeLSystem.prototype.reset = function () {
    this.production = this.axiom;
    this.drawLength = this.startLength;
    this.generations = 0;
  };

  PenroseSnowflakeLSystem.prototype.getAge = function () {
    return this.generations;
  };

  PenroseSnowflakeLSystem.prototype.render = function () {
    s.translate(s.width, s.height);
    var repeats = 1;

    this.steps += 3;
    if (this.steps > this.production.length) {
      this.steps = this.production.length;
    }

    for (var i = 0; i < this.steps; i++) {
      var step = this.production.charAt(i);
      if (step == 'F') {
        for (var j = 0; j < repeats; j++) {
          s.line(0, 0, 0, -this.drawLength);
          s.translate(0, -this.drawLength);
        }
        repeats = 1;
      } else if (step == '+') {
        for (var j = 0; j < repeats; j++) {
          s.rotate(this.theta);
        }
        repeats = 1;
      } else if (step == '-') {
        for (var j = 0; j < repeats; j++) {
          s.rotate(-this.theta);
        }
        repeats = 1;
      } else if (step == '[') {
        s.push();
      } else if (step == ']') {
        s.pop();
      } else if (step.charCodeAt(0) >= 48 && step.charCodeAt(0) <= 57) {
        repeats += step.charCodeAt(0) - 48;
      }
    }
  };

  PenroseSnowflakeLSystem.prototype.iterate = function (prod_, rule_) {
    var newProduction = '';
    for (var i = 0; i < prod_.length; i++) {
      var step = this.production.charAt(i);
      if (step == 'F') {
        newProduction = newProduction + this.ruleF;
      } else {
        if (step != 'F') {
          newProduction = newProduction + step;
        }
      }
    }
    this.drawLength = this.drawLength * 0.4;
    this.generations++;
    return newProduction;
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
    newProduction = newProduction.replaceAll('F', rule_);
    return newProduction;
  };
}
