/**
 * Recursion.
 *
 * A demonstration of recursion, which means functions call themselves.
 * Notice how the drawCircle() function calls itself at the end of its block.
 * It continues to do this until the variable "level" is equal to 1.
 */
function runLiveSketch(s) {
  s.setup = () => {
    s.createCanvas(640, 360);
    s.noStroke();
    s.noLoop();
  };

  s.draw = () => {
    drawCircle(s.width / 2, 280, 6);
  };

  function drawCircle(x, radius, level) {
    var tt = (126 * level) / 4.0;
    s.fill(tt);
    s.ellipse(x, s.height / 2, radius * 2, radius * 2);
    if (level > 1) {
      level = level - 1;
      drawCircle(x - radius / 2, radius / 2, level);
      drawCircle(x + radius / 2, radius / 2, level);
    }
  }
}
