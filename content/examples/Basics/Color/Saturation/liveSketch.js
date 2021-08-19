/**
 * Saturation.
 *
 * Saturation is the strength or purity of the color and represents the
 * amount of gray in proportion to the hue. A "saturated" color is pure
 * and an "unsaturated" color has a large percentage of gray.
 * Move the cursor vertically over each bar to alter its saturation.
 */

function runLiveSketch(s) {
  var barWidth = 20;
  var lastBar = -1;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.colorMode(s.HSB, s.width, s.height, 100);
    s.noStroke();
  };

  s.draw = () => {
    var whichBar = s.mouseX / barWidth;
    if (whichBar != lastBar) {
      var barX = whichBar * barWidth;
      s.fill(barX, s.mouseY, 66);
      s.rect(barX, 0, barWidth, s.height);
      lastBar = whichBar;
    }
  };
}
