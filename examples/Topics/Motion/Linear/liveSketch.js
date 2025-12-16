/**
 * Linear Motion.
 *
 * Changing a variable to create a moving line.
 * When the line moves off the edge of the window,
 * the variable is set to 0, which places the line
 * back at the bottom of the screen.
 */

function runLiveSketch(s) {
  var a;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.stroke(255);
    a = s.height / 2;
  };

  s.draw = () => {
    s.background(51);
    s.line(0, a, s.width, a);
    a = a - 0.5;
    if (a < 0) {
      a = s.height;
    }
  };
}
