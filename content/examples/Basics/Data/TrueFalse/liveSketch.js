/**
 * True/False.
 *
 * A Boolean variable has only two possible values: true or false.
 * It is common to use Booleans with control statements to
 * determine the flow of a program. In this example, when the
 * boolean value "x" is true, vertical black lines are drawn and when
 * the boolean value "x" is false, horizontal gray lines are drawn.
 */

function runLiveSketch(s) {
  s.setup = () => {
    var b = false;

    s.createCanvas(640, 360);
    s.background(0);
    s.stroke(255);

    var d = 20;
    var middle = s.width / 2;

    for (var i = d; i <= s.width; i += d) {
      if (i < middle) {
        b = true;
      } else {
        b = false;
      }

      if (b === true) {
        // Vertical line
        s.line(i, d, i, s.height - d);
      }

      if (b === false) {
        // Horizontal line
        s.line(middle, i - middle + d, s.width - d, i - middle + d);
      }
    }
    s.noLoop();
  };
}
