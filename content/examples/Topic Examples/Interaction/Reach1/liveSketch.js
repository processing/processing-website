/**
 * Reach 1
 * based on code from Keith Peters.
 *
 * The arm follows the position of the mouse by
 * calculating the angles with atan2().
 */

function runLiveSketch(s) {
  var segLength = 80;
  var x, y, x2, y2;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.strokeWeight(20.0);
    s.stroke(255, 100);

    x = s.width / 2;
    y = s.height / 2;
    x2 = x;
    y2 = y;
  };

  s.draw = () => {
    s.background(0);

    var dx = s.mouseX - x;
    var dy = s.mouseY - y;
    var angle1 = s.atan2(dy, dx);

    var tx = s.mouseX - s.cos(angle1) * segLength;
    var ty = s.mouseY - s.sin(angle1) * segLength;
    dx = tx - x2;
    dy = ty - y2;
    var angle2 = s.atan2(dy, dx);
    x = x2 + s.cos(angle2) * segLength;
    y = y2 + s.sin(angle2) * segLength;

    segment(x, y, angle1);
    segment(x2, y2, angle2);
  };

  function segment(x, y, a) {
    s.push();
    s.translate(x, y);
    s.rotate(a);
    s.line(0, 0, segLength, 0);
    s.pop();
  }
}
