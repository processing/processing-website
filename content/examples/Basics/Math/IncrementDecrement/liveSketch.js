/**
 * Increment Decrement.
 *
 * Writing "a++" is equivalent to "a = a + 1".
 * Writing "a--" is equivalent to "a = a - 1".
 */

function runLiveSketch(s) {
  var a;
  var b;
  var direction;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.colorMode(s.RGB, s.width);
    a = 0;
    b = s.width;
    direction = true;
    s.frameRate(30);
  };

  s.draw = () => {
    a++;
    if (a > s.width) {
      a = 0;
      direction = !direction;
    }
    if (direction == true) {
      s.stroke(a);
    } else {
      s.stroke(s.width - a);
    }
    s.line(a, 0, a, s.height / 2);

    b--;
    if (b < 0) {
      b = s.width;
    }
    if (direction == true) {
      s.stroke(s.width - b);
    } else {
      s.stroke(b);
    }
    s.line(b, s.height / 2 + 1, b, s.height);
  };
}
