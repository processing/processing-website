/**
 * Embedding Iteration.
 *
 * Embedding "for" structures allows repetition in two dimensions.
 *
 */

function runLiveSketch(s) {
  s.setup = () => {
    s.createCanvas(640, 360);
    s.background(0);
    s.noStroke();

    var gridSize = 40;

    for (var x = gridSize; x <= s.width - gridSize; x += gridSize) {
      for (var y = gridSize; y <= s.height - gridSize; y += gridSize) {
        s.noStroke();
        s.fill(255);
        s.rect(x - 1, y - 1, 3, 3);
        s.stroke(255, 50);
        s.line(x, y, s.width / 2, s.height / 2);
      }
    }

    s.noLoop();
  };
}
