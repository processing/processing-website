/**
 * Hue.
 *
 * Hue is the color reflected from or transmitted through an object
 * and is typically referred to as the name of the color (red, blue, yellow, etc.)
 * Move the cursor vertically over each bar to alter its hue.
 */

function runLiveSketch(s) {
  var barWidth = 20;
  var lastBar = -1;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.colorMode(s.HSB, s.height, s.height, s.height);
    s.noStroke();
    s.background(0);
  };

  s.draw = () => {
    var whichBar = s.mouseX / barWidth;
    if (whichBar != lastBar) {
      var barX = whichBar * barWidth;
      s.fill(s.mouseY, s.height, s.height);
      s.rect(barX, 0, barWidth, s.height);
      lastBar = whichBar;
    }
  };
}
