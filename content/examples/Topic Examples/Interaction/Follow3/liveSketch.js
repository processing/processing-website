/**
 * Follow 3
 * based on code from Keith Peters.
 *
 * A segmented line follows the mouse. The relative angle from
 * each segment to the next is calculated with atan2() and the
 * position of the next is calculated with sin() and cos().
 */
function runLiveSketch(s) {
  var x = new Array(20);
  var y = new Array(20);
  var segLength = 18;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.strokeWeight(9);
    s.stroke(255, 100);
    for (var i = 0; i < x.length; i++) {
      x[i] = 0;
      y[i] = 0;
    }
  };

  s.draw = () => {
    s.background(0);
    dragSegment(0, s.mouseX, s.mouseY);
    for (var i = 0; i < x.length - 1; i++) {
      dragSegment(i + 1, x[i], y[i]);
    }
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
