/**
 * Shape Primitives.
 *
 * The basic shape primitive functions are triangle(),
 * rect(), quad(), ellipse(), and arc(). Squares are made
 * with rect() and circles are made with ellipse(). Each
 * of these functions requires a number of parameters to
 * determine the shape's position and size.
 */

function runLiveSketch(s) {
  s.setup = () => {
    s.createCanvas(640, 360);
    s.background(0);
    s.noStroke();

    s.fill(204);
    s.triangle(18, 18, 18, 360, 81, 360);

    s.fill(102);
    s.rect(81, 81, 63, 63);

    s.fill(204);
    s.quad(189, 18, 216, 18, 216, 360, 144, 360);

    s.fill(255);
    s.ellipse(252, 144, 72, 72);

    s.fill(204);
    s.triangle(288, 18, 351, 360, 288, 360);

    s.fill(255);
    s.arc(479, 300, 280, 280, s.PI, s.TWO_PI);
  };
}
