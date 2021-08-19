/**
 * Mouse Signals.
 *
 * Move and click the mouse to generate signals.
 * The top row is the signal from "mouseX",
 * the middle row is the signal from "mouseY",
 * and the bottom row is the signal from "mousePressed".
 */
function runLiveSketch(s) {
  var xvals;
  var yvals;
  var bvals;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.noSmooth();
    xvals = [];
    yvals = [];
    bvals = [];
    for (var i = 0; i < s.width; i++) {
      xvals[i] = 0;
      yvals[i] = 0;
      bvals[i] = 0;
    }
  };

  var arrayindex = 0;

  s.draw = () => {
    s.background(102);

    for (var i = 1; i < s.width; i++) {
      xvals[i - 1] = xvals[i];
      yvals[i - 1] = yvals[i];
      bvals[i - 1] = bvals[i];
    }
    // Add the new values to the end of the array
    xvals[s.width - 1] = s.mouseX;
    yvals[s.width - 1] = s.mouseY;
    if (s.mouseIsPressed) {
      bvals[s.width - 1] = 0;
    } else {
      bvals[s.width - 1] = 255;
    }

    s.fill(255);
    s.noStroke();
    s.rect(0, s.height / 3, s.width, s.height / 3 + 1);

    for (var i = 1; i < s.width; i++) {
      s.stroke(255);
      s.point(i, s.map(xvals[i], 0, s.width, 0, s.height / 3 - 1));
      s.stroke(0);
      s.point(i, s.height / 3 + yvals[i] / 3);
      s.stroke(255);
      s.line(
        i,
        (2 * s.height) / 3 + bvals[i],
        i,
        (2 * s.height) / 3 + bvals[i - 1]
      );
    }
  };
}
