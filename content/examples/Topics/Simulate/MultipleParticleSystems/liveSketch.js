/**
 * Multiple Particle Systems
 * by Daniel Shiffman.
 *
 * Click the mouse to generate a burst of particles
 * at mouse location.
 *
 * Each burst is one instance of a particle system
 * with Particles and CrazyParticles (a subclass of Particle)
 * Note use of Inheritance and Polymorphism here.
 */

function runLiveSketch(s) {
  var systems = [];

  s.setup = () => {
    s.createCanvas(640, 360);
  };

  s.draw = () => {
    s.background(51);
    for (var i = 0; i < systems.length; i++) {
      systems[i].addParticle();
      systems[i].run();
    }
    if (systems.length === 0) {
      s.fill(255);
      s.noStroke();
      s.textAlign(s.CENTER);
      s.text('click mouse to add particle systems', s.width / 2, s.height / 2);
    }
  };

  s.mousePressed = () => {
    systems.push(new ParticleSystem(1, s.createVector(s.mouseX, s.mouseY)));
  };

  var Particle = function (position) {
    this.acceleration = s.createVector(0, 0.05);
    this.velocity = s.createVector(s.random(-1, 1), s.random(-2, 0));
    this.position = position.copy();
    this.lifespan = 255.0;

    this.run = function () {
      this.update();
      this.display();
    };

    // Method to update position
    this.update = function () {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.lifespan -= 2;
    };

    // Method to display
    this.display = function () {
      s.stroke(255, this.lifespan);
      s.fill(255, this.lifespan);
      s.ellipse(this.position.x, this.position.y, 8, 8);
    };

    // Is the particle still useful?
    this.isDead = function () {
      if (this.lifespan < 0.0) {
        return true;
      } else {
        return false;
      }
    };
  };

  var ParticleSystem = function (num, position) {
    this.origin = position.copy();
    this.particles = [];
    for (var i = 0; i < num; i++) {
      this.particles.push(new Particle(this.origin)); // Add "num" amount of particles to the arraylist
    }

    this.addParticle = function () {
      var p;
      // Add either a Particle or CrazyParticle to the system
      if (s.int(s.random(0, 2)) == 0) {
        p = new Particle(this.origin);
      } else {
        p = new CrazyParticle(this.origin);
      }
      this.particles.push(p);
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

    // A method to test if the particle system still has particles
    this.dead = function () {
      return particles.length === 0;
    };
  };

  function CrazyParticle(position) {
    this.theta = 0;

    Particle.call(this, position);

    // Method to update position
    this.update = function () {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.lifespan -= 2;
      var theta_vel = (this.velocity.x * this.velocity.mag()) / 10;
      this.theta += theta_vel;
    };

    // Override the display method
    this.display = function () {
      s.stroke(255, this.lifespan);
      s.fill(255, this.lifespan);
      s.ellipse(this.position.x, this.position.y, 8, 8);
      // Then add a rotating line
      s.push();
      s.translate(this.position.x, this.position.y);
      s.rotate(this.theta);
      s.stroke(255, this.lifespan);
      s.line(0, 0, 25, 0);
      s.pop();
    };
  }

  // Inherit from the parent class
  CrazyParticle.prototype = Object.create(Particle.prototype);
  this.constructor = CrazyParticle;
}
