/**
 * Triangle Strip
 * by Ira Greenberg.
 *
 * Generate a closed ring using the vertex() function and
 * beginShape(TRIANGLE_STRIP) mode. The outsideRadius and insideRadius
 * variables control ring's radii respectively.
 */

function runLiveSketch(s) {
  var x;
  var y;
  var outsideRadius = 150;
  var insideRadius = 100;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.background(204);
    x = s.width / 2;
    y = s.height / 2;
  };

  s.draw = () => {
    s.background(204);

    var numPoints = s.int(s.map(s.mouseX, 0, s.width, 6, 60));
    var angle = 0;
    var angleStep = 180.0 / numPoints;

    s.beginShape(s.TRIANGLE_STRIP);
    for (var i = 0; i <= numPoints; i++) {
      var px = x + s.cos(s.radians(angle)) * outsideRadius;
      var py = y + s.sin(s.radians(angle)) * outsideRadius;
      angle += angleStep;
      s.vertex(px, py);
      px = x + s.cos(s.radians(angle)) * insideRadius;
      py = y + s.sin(s.radians(angle)) * insideRadius;
      s.vertex(px, py);
      angle += angleStep;
    }
    s.endShape();
  };
}
