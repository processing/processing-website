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
    s.describe(
      'There is a canvas with a series of vertical bars. As the mouse moves over each bar, the saturation of the color changes. The bar is determined by the x-coordinate of the mouse and the saturation of the bar is determined by the y-coordinate of the mouse. As the move mouse up in the bar, the saturation increases. As the mouse moves down in the bar, the saturation decreases.'
    );
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
