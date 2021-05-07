/**
 * Logical Operators.
 *
 * The logical operators for AND (&&) and OR (||) are used to
 * combine simple relational statements into more complex expressions.
 * The NOT (!) operator is used to negate a boolean statement.
 */

function runLiveSketch(s) {
  s.setup = () => {
    s.createCanvas(640, 360);
    s.background(126);

    var test = false;

    for (var i = 5; i <= s.height; i += 5) {
      // Logical AND
      s.stroke(0);
      if (i > 35 && i < 100) {
        s.line(s.width / 4, i, s.width / 2, i);
        test = false;
      }

      // Logical OR
      s.stroke(76);
      if (i <= 35 || i >= 100) {
        s.line(s.width / 2, i, s.width, i);
        test = true;
      }

      // Testing if a boolean value is "true"
      // The expression "if(test)" is equivalent to "if(test == true)"
      if (test) {
        s.stroke(0);
        s.point(s.width / 3, i);
      }

      // Testing if a boolean value is "false"
      // The expression "if(!test)" is equivalent to "if(test == false)"
      if (!test) {
        s.stroke(255);
        s.point(s.width / 4, i);
      }
    }

    s.noLoop();
  };
}
