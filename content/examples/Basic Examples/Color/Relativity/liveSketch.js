/**
 * Relativity.
 *
 * Each color is perceived in relation to other colors. The top and bottom
 * bars each contain the same component colors, but a different display order
 * causes individual colors to appear differently.
 */

function runLiveSketch(s) {
  var a, b, c, d, e;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.noStroke();
    a = s.color(165, 167, 20);
    b = s.color(77, 86, 59);
    c = s.color(42, 106, 105);
    d = s.color(165, 89, 20);
    e = s.color(146, 150, 127);
    s.noLoop(); // Draw only one time
  };

  s.draw = () => {
    drawBand(a, b, c, d, e, 0, s.width / 128);
    drawBand(c, a, d, b, e, s.height / 2, s.width / 128);
  };

  function drawBand(v, w, x, y, z, ypos, barWidth) {
    var num = 5;
    var colorOrder = [v, w, x, y, z];
    for (var i = 0; i < s.width; i += barWidth * num) {
      for (var j = 0; j < num; j++) {
        s.fill(colorOrder[j]);
        s.rect(i + j * barWidth, ypos, barWidth, s.height / 2);
      }
    }
  }
}
