/**
 * Distance 2D.
 *
 * Move the mouse across the image to obscure and reveal the matrix.
 * Measures the distance from the mouse to each square and sets the
 * size proportionally.
 */

function runLiveSketch(s) {
  var max_distance;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.noStroke();
    max_distance = s.dist(0, 0, s.width, s.height);
  };

  s.draw = () => {
    s.background(0);

    for (var i = 0; i <= s.width; i += 20) {
      for (var j = 0; j <= s.height; j += 20) {
        var size = s.dist(s.mouseX, s.mouseY, i, j);
        size = (size / max_distance) * 66;
        s.ellipse(i, j, size, size);
      }
    }
  };
}
