/**
 * Smoke Particle System
 * by Daniel Shiffman.
 *
 * A basic smoke effect using a particle system. Each particle
 * is rendered as an alpha masked image.
 */

// pjs preload must be used to preload media if the program is
// running with Processing.js
/* @pjs preload="texture.png"; */

function runLiveSketch(s) {
  var ps;

  s.preload = () => {
    img = s.loadImage('/texture.png');
  };

  s.setup = () => {
    s.createCanvas(640, 360);
    ps = new ParticleSystem(0, s.createVector(s.width / 2, s.height - 60), img);
  };

  s.draw = () => {
    s.background(0);

    // Calculate a "wind" force based on mouse horizontal position
    var dx = s.map(s.mouseX, 0, s.width, -0.2, 0.2);
    var wind = s.createVector(dx, 0);
    ps.applyForce(wind);
    ps.run();
    for (var i = 0; i < 2; i++) {
      ps.addParticle();
    }

    // Draw an arrow representing the wind force
    drawVector(wind, s.createVector(s.width / 2, 50, 0), 500);
  };

  // Renders a vector object 'v' as an arrow and a location 'loc'
  function drawVector(v, loc, scayl) {
    s.push();
    var arrowsize = 4;
    // Translate to location to render vector
    s.translate(loc.x, loc.y);
    s.stroke(255);
    // Call vector heading function to get direction (note that pointing up is a heading of 0) and rotate
    s.rotate(v.heading());
    // Calculate length of vector & scale it to be bigger or smaller if necessary
    var len = v.mag() * scayl;
    // Draw three lines to make an arrow (draw pointing up since we've rotate to the proper direction)
    s.line(0, 0, len, 0);
    s.line(len, 0, len - arrowsize, +arrowsize / 2);
    s.line(len, 0, len - arrowsize, -arrowsize / 2);
    s.pop();
  }

  // A class to describe a group of Particles
  // An ArrayList is used to manage the list of Particles

  var ParticleSystem = function (num, v, img_) {
    this.origin = v.copy();
    this.img = img_;
    this.particles = [];
    for (var i = 0; i < num; i++) {
      particles.add(new Particle(this.origin, this.img)); // Add "num" amount of particles to the arraylist
    }

    this.addParticle = function () {
      this.particles.push(new Particle(this.origin, this.img));
    };

    this.run = function () {
      for (var i = this.particles.length - 1; i >= 0; i--) {
        var p = this.particles[i];
        p.run();
        if (p.isDead()) {
          this.particles.splice(i, 1);
        }
      }
    };

    // Method to add a force vector to all particles currently in the system
    this.applyForce = function (dir) {
      // Enhanced loop!!!
      for (var i = 0; i < this.particles.length; i++) {
        var p = this.particles[i];
        p.applyForce(dir);
      }
    };
  };

  // A simple Particle class, renders the particle as an image
  var Particle = function (l, img_) {
    this.acc = s.createVector(0, 0.05);
    var vx = s.randomGaussian() * 0.3;
    var vy = s.randomGaussian() * 0.3 - 1.0;
    this.vel = s.createVector(vx, vy);
    this.pos = l.copy();
    this.lifespan = 100.0;
    this.img = img_;

    this.run = function () {
      this.update();
      this.render();
    };

    // Method to apply a force vector to the Particle object
    // Note we are ignoring "mass" here
    this.applyForce = function (f) {
      this.acc.add(f);
    };

    // Method to update location
    this.update = function () {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.lifespan -= 2.5;
      this.acc.mult(0); // clear Acceleration
    };

    // Method to display
    this.render = function () {
      s.imageMode(s.CENTER);
      s.tint(255, this.lifespan);
      s.image(this.img, this.pos.x, this.pos.y);
      // Drawing a circle instead
      // fill(255,lifespan);
      // noStroke();
      // ellipse(loc.x,loc.y,img.width,img.height);
    };

    // Is the particle still useful?
    this.isDead = function () {
      if (this.lifespan <= 0.0) {
        return true;
      } else {
        return false;
      }
    };
  };
}
