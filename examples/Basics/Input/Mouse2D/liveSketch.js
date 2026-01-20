/**
 * Mouse 2D.
 *
 * Moving the mouse changes the position and size of each box.
 */

function runLiveSketch(s) {
  s.setup = () => {
    s.createCanvas(640, 360);
    s.noStroke();
    s.rectMode(s.CENTER);
  };

  s.draw = () => {
    s.background(51);
    s.fill(255, 204);
    s.rect(s.mouseX, s.height / 2, s.mouseY / 2 + 10, s.mouseY / 2 + 10);
    s.fill(255, 204);
    var inverseX = s.width - s.mouseX;
    var inverseY = s.height - s.mouseY;
    s.rect(inverseX, s.height / 2, inverseY / 2 + 10, inverseY / 2 + 10);
  };
}
