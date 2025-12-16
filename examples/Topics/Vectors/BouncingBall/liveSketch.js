/**
 * Bouncing Ball with Vectors
 * by Daniel Shiffman.
 *
 * Demonstration of using vectors to control motion of body
 * This example is not object-oriented
 * See AccelerationWithVectors for an example of how to simulate motion using vectors in an object
 */
function runLiveSketch(s) {
  var position; // position of shape
  var velocity; // Velocity of shape
  var gravity; // Gravity acts at the shape's acceleration

  s.setup = () => {
    s.createCanvas(640, 360);
    position = s.createVector(100, 100);
    velocity = s.createVector(1.5, 2.1);
    gravity = s.createVector(0, 0.2);
  };

  s.draw = () => {
    s.background(0);

    // Add velocity to the position.
    position.add(velocity);
    // Add gravity to velocity
    velocity.add(gravity);

    // Bounce off edges
    if (position.x > s.width || position.x < 0) {
      velocity.x = velocity.x * -1;
    }
    if (position.y > s.height) {
      // We're reducing velocity ever so slightly
      // when it hits the bottom of the window
      velocity.y = velocity.y * -0.95;
      position.y = s.height;
    }

    // Display circle at position vector
    s.stroke(255);
    s.strokeWeight(2);
    s.fill(127);
    s.ellipse(position.x, position.y, 48, 48);
  };
}
