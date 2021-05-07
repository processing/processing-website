/**
 * Translate.
 *
 * The translate() function allows objects to be moved
 * to any location within the window. The first parameter
 * sets the x-axis offset and the second parameter sets the
 * y-axis offset.
 */
function runLiveSketch(s) {
  var x = 0;
  var dim = 80.0;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.noStroke();
  };

  s.draw = () => {
    s.background(102);

    x = x + 0.8;

    if (x > s.width + dim) {
      x = -dim;
    }

    s.translate(x, s.height / 2 - dim / 2);
    s.fill(255);
    s.rect(-dim / 2, -dim / 2, dim, dim);

    // Transforms accumulate. Notice how this rect moves
    // twice as fast as the other, but it has the same
    // parameter for the x-axis value
    s.translate(x, dim);
    s.fill(0);
    s.rect(-dim / 2, -dim / 2, dim, dim);
  };
}
