/**
 * Arm.
 *
 * The angle of each segment is controlled with the mouseX and
 * mouseY position. The transformations applied to the first segment
 * are also applied to the second segment because they are inside
 * the same push() and pop() group.
 */
function runLiveSketch(s) {
  var x, y;
  var angle1 = 0.0;
  var angle2 = 0.0;
  var segLength = 100;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.strokeWeight(30);
    s.stroke(255, 160);

    x = s.width * 0.3;
    y = s.height * 0.5;
  };

  s.draw = () => {
    s.background(0);

    angle1 = (s.mouseX / s.float(s.width) - 0.5) * -s.PI;
    angle2 = (s.mouseY / s.float(s.height) - 0.5) * s.PI;

    s.push();
    segment(x, y, angle1);
    segment(segLength, 0, angle2);
    s.pop();
  };

  function segment(x, y, a) {
    s.translate(x, y);
    s.rotate(a);
    s.line(0, 0, segLength, 0);
  }
}
