/**
 * Reach 2
 * based on code from Keith Peters.
 *
 * The arm follows the position of the mouse by
 * calculating the angles with atan2().
 */

function runLiveSketch(s) {
  var numSegments = 10;
  var x = new Array(numSegments);
  var y = new Array(numSegments);
  var angle = new Array(numSegments);
  var segLength = 26;
  var targetX,
    targetY = 0;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.strokeWeight(20.0);
    s.stroke(255, 100);
    for (var i = 0; i < x.length; i++) {
      x[i] = 0;
      y[i] = 0;
    }
    x[x.length - 1] = s.width / 2; // Set base x-coordinate
    y[x.length - 1] = s.height; // Set base y-coordinate
  };

  s.draw = () => {
    s.background(0);

    reachSegment(0, s.mouseX, s.mouseY);
    for (var i = 1; i < numSegments; i++) {
      reachSegment(i, targetX, targetY);
    }
    for (var i = x.length - 1; i >= 1; i--) {
      positionSegment(i, i - 1);
    }
    for (var i = 0; i < x.length; i++) {
      segment(x[i], y[i], angle[i], (i + 1) * 2);
    }
  };

  function positionSegment(a, b) {
    x[b] = x[a] + s.cos(angle[a]) * segLength;
    y[b] = y[a] + s.sin(angle[a]) * segLength;
  }

  function reachSegment(i, xin, yin) {
    var dx = xin - x[i];
    var dy = yin - y[i];
    angle[i] = s.atan2(dy, dx);
    targetX = xin - s.cos(angle[i]) * segLength;
    targetY = yin - s.sin(angle[i]) * segLength;
  }

  function segment(x, y, a, sw) {
    s.strokeWeight(sw);
    s.push();
    s.translate(x, y);
    s.rotate(a);
    s.line(0, 0, segLength, 0);
    s.pop();
  }
}
