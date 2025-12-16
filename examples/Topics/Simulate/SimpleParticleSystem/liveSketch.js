/**
 * Simple Particle System
 * by Daniel Shiffman.
 *
 * Particles are generated each cycle through draw(),
 * fall with gravity and fade out over time
 * A ParticleSystem object manages a variable size (ArrayList)
 * list of particles.
 */
function runLiveSketch(s) {
  var ps;

  s.setup = () => {
    s.createCanvas(640, 360);
    ps = new ParticleSystem(s.createVector(s.width / 2, 50));
  };

  s.draw = () => {
    s.background(0);
    ps.addParticle();
    ps.run();
  };

  var ParticleSystem = function (position) {
    this.origin = position.copy();
    this.particles = [];

    this.addParticle = function () {
      this.particles.push(new Particle(this.origin));
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
      this.lifespan -= 1;
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
}
