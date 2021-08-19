/**
 * Follow 2
 * based on code from Keith Peters.
 *
 * A two-segmented arm follows the cursor position. The relative
 * angle between the segments is calculated with atan2() and the
 * position calculated with sin() and cos().
 */
function runLiveSketch(s) {
  var x = [0, 0];
  var y = [0, 0];
  var segLength = 50;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.strokeWeight(20.0);
    s.stroke(255, 100);
  };

  s.draw = () => {
    s.background(0);
    dragSegment(0, s.mouseX, s.mouseY);
    dragSegment(1, x[0], y[0]);
  };

  function dragSegment(i, xin, yin) {
    var dx = xin - x[i];
    var dy = yin - y[i];
    var angle = s.atan2(dy, dx);
    x[i] = xin - s.cos(angle) * segLength;
    y[i] = yin - s.sin(angle) * segLength;
    segment(x[i], y[i], angle);
  }

  function segment(x, y, a) {
    s.push();
    s.translate(x, y);
    s.rotate(a);
    s.line(0, 0, segLength, 0);
    s.pop();
  }
}
