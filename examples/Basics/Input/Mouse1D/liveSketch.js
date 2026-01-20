/**
 * Mouse 1D.
 *
 * Move the mouse left and right to shift the balance.
 * The "mouseX" variable is used to control both the
 * size and color of the rectangles.
 */

function runLiveSketch(s) {
  s.setup = () => {
    s.createCanvas(640, 360);
    s.noStroke();
    s.colorMode(s.RGB, s.height, s.height, s.height);
    s.rectMode(s.CENTER);
  };

  s.draw = () => {
    s.background(0.0);

    var r1 = s.map(s.mouseX, 0, s.width, 0, s.height);
    var r2 = s.height - r1;

    s.fill(r1);
    s.rect(s.width / 2 + r1 / 2, s.height / 2, r1, r1);

    s.fill(r2);
    s.rect(s.width / 2 - r2 / 2, s.height / 2, r2, r2);
  };
}
