/**
 * Radial Gradient.
 *
 * Draws a series of concentric circles to create a gradient
 * from one color to another.
 */

function runLiveSketch(s) {
  var dim;

  s.setup = () => {
    s.createCanvas(640, 360);
    dim = s.width / 2;
    s.background(0);
    s.colorMode(s.HSB, 360, 100, 100);
    s.noStroke();
    s.ellipseMode(s.RADIUS);
    s.frameRate(1);
  };

  s.draw = () => {
    s.background(0);
    for (var x = 0; x <= s.width; x += dim) {
      drawGradient(x, s.height / 2);
    }
  };

  function drawGradient(x, y) {
    var radius = dim / 2;
    var h = s.random(0, 360);
    for (var r = radius; r > 0; --r) {
      s.fill(h, 90, 90);
      s.ellipse(x, y, r, r);
      h = (h + 1) % 360;
    }
  }
}
