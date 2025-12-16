/**
 * Iteration.
 *
 * Iteration with a "for" structure to construct repetitive forms.
 */

function runLiveSketch(s) {
  s.setup = () => {
    var y;
    var num = 14;

    s.createCanvas(640, 360);
    s.background(102);
    s.noStroke();

    // Draw gray bars
    s.fill(255);
    y = 60;
    for (var i = 0; i < num / 3; i++) {
      s.rect(50, y, 475, 10);
      y += 20;
    }

    // Gray bars
    s.fill(51);
    y = 40;
    for (var i = 0; i < num; i++) {
      s.rect(405, y, 30, 10);
      y += 20;
    }
    y = 50;
    for (var i = 0; i < num; i++) {
      s.rect(425, y, 30, 10);
      y += 20;
    }

    // Thin lines
    y = 45;
    s.fill(0);
    for (var i = 0; i < num - 1; i++) {
      s.rect(120, y, 40, 1);
      y += 20;
    }
    s.noLoop();
  };
}
