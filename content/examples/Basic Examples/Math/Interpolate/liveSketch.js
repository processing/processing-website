/**
 * Linear Interpolation.
 *
 * Move the mouse across the screen and the symbol will follow.
 * Between drawing each frame of the animation, the ellipse moves
 * part of the distance (0.05) from its current position toward
 * the cursor using the lerp() function
 *
 * This is the same as the Easing under input only with lerp() instead.
 */

function runLiveSketch(s) {
  var x = 0;
  var y = 0;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.noStroke();
  };

  s.draw = () => {
    s.background(51);

    // lerp() calculates a number between two numbers at a specific increment.
    // The amt parameter is the amount to interpolate between the two values
    // where 0.0 equal to the first point, 0.1 is very near the first point, 0.5
    // is half-way in between, etc.

    // Here we are moving 5% of the way to the mouse location each frame
    x = s.lerp(x, s.mouseX, 0.05);
    y = s.lerp(y, s.mouseY, 0.05);

    s.fill(255);
    s.stroke(255);
    s.ellipse(x, y, 66, 66);
  };
}
