/**
 * Brightness
 * by Rusty Robison.
 *
 * Brightness is the relative lightness or darkness of a color.
 * Move the cursor vertically over each bar to alter its brightness.
 */

function runLiveSketch(s) {
  var barWidth = 20;
  var lastBar = -1;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.colorMode(s.HSB, s.width, 100, s.width);
    s.noStroke();
    s.background(0);
  };

  s.draw = () => {
    var whichBar = mouseX / barWidth;
    if (whichBar != lastBar) {
      var barX = whichBar * barWidth;
      s.fill(barX, 100, s.mouseY);
      s.rect(barX, 0, barWidth, s.height);
      lastBar = whichBar;
    }
  };
}
