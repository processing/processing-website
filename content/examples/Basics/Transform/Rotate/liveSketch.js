/**
 * Rotate.
 *
 * Rotating a square around the Z axis. To get the results
 * you expect, send the rotate function angle parameters that are
 * values between 0 and PI*2 (TWO_PI which is roughly 6.28). If you prefer to
 * think about angles as degrees (0-360), you can use the radians()
 * method to convert your values. For example: scale(radians(90))
 * is identical to the statement scale(PI/2).
 */

function runLiveSketch(s) {
  var angle = 0;
  var jitter = 0;
  
  s.setup = () => {
    s.createCanvas(640, 360);
    s.noStroke();
    s.fill(255);
    s.rectMode(s.CENTER);
  };

  s.draw = () => {
    s.background(51);

    // during even-numbered seconds (0, 2, 4, 6...)
    if (s.second() % 2 == 0) {
      jitter = s.random(-0.1, 0.1);
    }
    angle = angle + jitter;
    var c = s.cos(angle);
    s.translate(s.width / 2, s.height / 2);
    s.rotate(c);
    s.rect(0, 0, 180, 180);
  };
}
