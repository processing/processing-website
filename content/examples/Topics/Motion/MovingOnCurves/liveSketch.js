/**
 * Moving On Curves.
 *
 * In this example, the circles moves along the curve y = x^4.
 * Click the mouse to have it move to a new position.
 */

function runLiveSketch(s) {
  var beginX = 20.0; // Initial x-coordinate
  var beginY = 10.0; // Initial y-coordinate
  var endX = 570.0; // Final x-coordinate
  var endY = 320.0; // Final y-coordinate
  var distX; // X-axis distance to move
  var distY; // Y-axis distance to move
  var exponent = 4; // Determines the curve
  var x = 0.0; // Current x-coordinate
  var y = 0.0; // Current y-coordinate
  var step = 0.01; // Size of each step along the path
  var pct = 0.0; // Percentage traveled (0.0 to 1.0)

  s.setup = () => {
    s.createCanvas(640, 360);
    s.noStroke();
    distX = endX - beginX;
    distY = endY - beginY;
  };

  s.draw = () => {
    s.fill(0, 2);
    s.rect(0, 0, s.width, s.height);
    pct += step;
    if (pct < 1.0) {
      x = beginX + pct * distX;
      y = beginY + s.pow(pct, exponent) * distY;
    }
    s.fill(255);
    s.ellipse(x, y, 20, 20);
  };

  s.mousePressed = () => {
    pct = 0.0;
    beginX = x;
    beginY = y;
    endX = s.mouseX;
    endY = s.mouseY;
    distX = endX - beginX;
    distY = endY - beginY;
  };
}
