/**
 * Simple Linear Gradient
 *
 * The lerpColor() function is useful for interpolating
 * between two colors.
 */

function runLiveSketch(s) {
  // Constants
  var Y_AXIS = 1;
  var X_AXIS = 2;
  var b1, b2, c1, c2;

  s.setup = () => {
    s.createCanvas(640, 360);

    // Define colors
    b1 = s.color(255);
    b2 = s.color(0);
    c1 = s.color(204, 102, 0);
    c2 = s.color(0, 102, 153);

    s.noLoop();
  };

  s.draw = () => {
    // Background
    s.setGradient(0, 0, s.width / 2, s.height, b1, b2, X_AXIS);
    s.setGradient(s.width / 2, 0, s.width / 2, s.height, b2, b1, X_AXIS);
    // Foreground
    s.setGradient(50, 90, 540, 80, c1, c2, Y_AXIS);
    s.setGradient(50, 190, 540, 80, c2, c1, X_AXIS);
  };

  s.setGradient = (x, y, w, h, c1, c2, axis) => {
    s.noFill();

    if (axis === Y_AXIS) {
      // Top to bottom gradient
      for (var i = y; i <= y + h; i++) {
        var inter = s.map(i, y, y + h, 0, 1);
        var c = s.lerpColor(c1, c2, inter);
        s.stroke(c);
        s.line(x, i, x + w, i);
      }
    } else if (axis === X_AXIS) {
      // Left to right gradient
      for (var i = x; i <= x + w; i++) {
        var inter = s.map(i, x, x + w, 0, 1);
        var c = s.lerpColor(c1, c2, inter);
        s.stroke(c);
        s.line(i, y, i, y + h);
      }
    }
  };
}
