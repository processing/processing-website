/**
 * Brownian motion.
 *
 * Recording random movement as a continuous line.
 */
function runLiveSketch(s) {
  var num = 2000;
  var range = 6;

  var ax = [];
  var ay = [];

  s.setup = () => {
    s.createCanvas(640, 360);
    for (var i = 0; i < num; i++) {
      ax[i] = s.width / 2;
      ay[i] = s.height / 2;
    }
    s.frameRate(30);
  };

  s.draw = () => {
    s.background(51);

    // Shift all elements 1 place to the left
    for (var i = 1; i < num; i++) {
      ax[i - 1] = ax[i];
      ay[i - 1] = ay[i];
    }

    // Put a new value at the end of the array
    ax[num - 1] += s.random(-range, range);
    ay[num - 1] += s.random(-range, range);

    // Constrain all points to the screen
    ax[num - 1] = s.constrain(ax[num - 1], 0, s.width);
    ay[num - 1] = s.constrain(ay[num - 1], 0, s.height);

    // Draw a line connecting the points
    for (var i = 1; i < num; i++) {
      var val = (s.float(i) / num) * 204.0 + 51;
      s.stroke(val);
      s.line(ax[i - 1], ay[i - 1], ax[i], ay[i]);
    }
  };
}
