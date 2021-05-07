/**
 * Variables.
 *
 * Variables are used for storing values. In this example, change
 * the values of variables to affect the composition.
 */

function runLiveSketch(s) {
  s.setup = () => {
    s.createCanvas(640, 360);
    s.background(0);
    s.stroke(153);
    s.strokeWeight(4);
    s.strokeCap(s.SQUARE);

    var a = 50;
    var b = 120;
    var c = 180;

    s.line(a, b, a + c, b);
    s.line(a, b + 10, a + c, b + 10);
    s.line(a, b + 20, a + c, b + 20);
    s.line(a, b + 30, a + c, b + 30);

    a = a + c;
    b = s.height - b;

    s.line(a, b, a + c, b);
    s.line(a, b + 10, a + c, b + 10);
    s.line(a, b + 20, a + c, b + 20);
    s.line(a, b + 30, a + c, b + 30);

    a = a + c;
    b = s.height - b;

    s.line(a, b, a + c, b);
    s.line(a, b + 10, a + c, b + 10);
    s.line(a, b + 20, a + c, b + 20);
    s.line(a, b + 30, a + c, b + 30);
    s.noLoop();
  };
}
