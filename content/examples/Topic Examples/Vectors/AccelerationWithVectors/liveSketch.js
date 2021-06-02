/**
 * Acceleration with Vectors
 * by Daniel Shiffman.
 *
 * Demonstration of the basics of motion with vector.
 * A "Mover" object stores location, velocity, and acceleration as vectors
 * The motion is controlled by affecting the acceleration (in this case towards the mouse)
 *
 * For more examples of simulating motion and physics with vectors, see
 * Simulate/ForcesWithVectors, Simulate/GravitationalAttraction3D
 */

function runLiveSketch(s) {
  // A Mover object
  var mover;

  s.setup = () => {
    s.createCanvas(640, 360);
    mover = new Mover();
  };

  s.draw = () => {
    s.background(0);

    // Update the location
    mover.update();
    // Display the Mover
    mover.display();
  };

  function Mover() {
    // Start in the center
    // The Mover tracks location, velocity, and acceleration
    this.location = s.createVector(s.width / 2, s.height / 2);
    this.velocity = s.createVector(0, 0);
    // The Mover's maximum speed
    this.topspeed = 5;

    this.update = function () {
      // Compute a vector that points from location to mouse
      var mouse = s.createVector(s.mouseX, s.mouseY);
      var acceleration = p5.Vector.sub(s.mouse, this.location);
      // Set magnitude of acceleration
      acceleration.setMag(0.2);

      // Velocity changes according to acceleration
      this.velocity.add(acceleration);
      // Limit the velocity by topspeed
      this.velocity.limit(this.topspeed);
      // Location changes by velocity
      this.location.add(this.velocity);
    };

    this.display = function () {
      s.stroke(255);
      s.strokeWeight(2);
      s.fill(127);
      s.ellipse(this.location.x, this.location.y, 48, 48);
    };
  }
}
