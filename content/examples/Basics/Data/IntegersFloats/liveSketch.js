/**
 * Integers Floats.
 *
 * Integers and floats are two different kinds of numerical data.
 * An integer (more commonly called an int) is a number without
 * a decimal point. A var is a floating-point number, which means
 * it is a number that has a decimal place. Floats are used when
 * more precision is needed.
 */

function runLiveSketch(s) {
  var a = 0; // Create a variable "a" of the datatype "int"
  var b = 0.0; // Create a variable "b" of the datatype "float"

  s.setup = () => {
    s.createCanvas(640, 360);
    s.stroke(255);
    s.frameRate(30);
  };

  s.draw = () => {
    s.background(0);

    a = a + 1;
    b = b + 0.2;
    s.line(a, 0, a, s.height / 2);
    s.line(b, s.height / 2, b, s.height);

    if (a > s.width) {
      a = 0;
    }
    if (b > s.width) {
      b = 0;
    }
  };
}
