/**
 * Follow 1
 * based on code from Keith Peters.
 *
 * A line segment is pushed and pulled by the cursor.
 */
function runLiveSketch(s) {
  var x = 100;
  var y = 100;
  var angle1 = 0.0;
  var segLength = 50;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.strokeWeight(20.0);
    s.stroke(255, 100);
  };

  s.draw = () => {
    s.background(0);

    var dx = s.mouseX - x;
    var dy = s.mouseY - y;
    angle1 = s.atan2(dy, dx);
    x = s.mouseX - s.cos(angle1) * segLength;
    y = s.mouseY - s.sin(angle1) * segLength;

    segment(x, y, angle1);
    s.ellipse(x, y, 20, 20);
  };

  function segment(x, y, a) {
    s.push();
    s.translate(x, y);
    s.rotate(a);
    s.line(0, 0, segLength, 0);
    s.pop();
  }
}
