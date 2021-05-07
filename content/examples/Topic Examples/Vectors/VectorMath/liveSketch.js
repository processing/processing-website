/**
 * Vector
 * by Daniel Shiffman.
 *
 * Demonstration some basic vector math: subtraction, normalization, scaling
 * Normalizing a vector sets its length to 1.
 */

function runLiveSketch(s) {
  s.setup = () => {
    s.createCanvas(640, 360);
  };

  s.draw = () => {
    s.background(0);

    // A vector that points to the mouse location
    var mouse = s.createVector(s.mouseX, s.mouseY);
    // A vector that points to the center of the window
    var center = s.createVector(s.width / 2, s.height / 2);
    // Subtract center from mouse which results in a vector that points from center to mouse
    mouse.sub(center);

    // Normalize the vector
    mouse.normalize();

    // Multiply its length by 150 (Scaling its length)
    mouse.mult(150);

    s.translate(s.width / 2, s.height / 2);
    // Draw the resulting vector
    s.stroke(255);
    s.strokeWeight(4);
    s.line(0, 0, mouse.x, mouse.y);
  };
}
