/**
 * Sine Cosine.
 *
 * Linear movement with sin() and cos().
 * Numbers between 0 and PI*2 (TWO_PI which angles roughly 6.28)
 * are put into these functions and numbers between -1 and 1 are
 * returned. These values are then scaled to produce larger movements.
 */

function runLiveSketch(s) {
  var x1, x2, y1, y2;
  var angle1 = 0;
  var angle2 = 0;
  var scalar = 70;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.noStroke();
    s.rectMode(s.CENTER);
  };

  s.draw = () => {
    s.background(0);

    var ang1 = s.radians(angle1);
    var ang2 = s.radians(angle2);

    x1 = s.width / 2 + scalar * s.cos(ang1);
    x2 = s.width / 2 + scalar * s.cos(ang2);

    y1 = s.height / 2 + scalar * s.sin(ang1);
    y2 = s.height / 2 + scalar * s.sin(ang2);

    s.fill(255);
    s.rect(s.width * 0.5, s.height * 0.5, 140, 140);

    s.fill(0, 102, 153);
    s.ellipse(x1, s.height * 0.5 - 120, scalar, scalar);
    s.ellipse(x2, s.height * 0.5 + 120, scalar, scalar);

    s.fill(255, 204, 0);
    s.ellipse(s.width * 0.5 - 120, y1, scalar, scalar);
    s.ellipse(s.width * 0.5 + 120, y2, scalar, scalar);

    angle1 += 2;
    angle2 += 3;
  };
}
