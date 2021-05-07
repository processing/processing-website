/**
 * Regular Polygon
 *
 * What is your favorite? Pentagon? Hexagon? Heptagon?
 * No? What about the icosagon? The polygon() function
 * created for this example is capable of drawing any
 * regular polygon. Try placing different numbers into the
 * polygon() function calls within draw() to explore.
 */

function runLiveSketch(s) {
  s.setup = () => {
    s.createCanvas(640, 360);
  };

  s.draw = () => {
    s.background(102);

    s.push();
    s.translate(s.width * 0.2, s.height * 0.5);
    s.rotate(s.frameCount / 200.0);
    polygon(0, 0, 82, 3);
    s.pop();

    s.push();
    s.translate(s.width * 0.5, s.height * 0.5);
    s.rotate(s.frameCount / 50.0);
    polygon(0, 0, 80, 20);
    s.pop();

    s.push();
    s.translate(s.width * 0.8, s.height * 0.5);
    s.rotate(s.frameCount / -100.0);
    polygon(0, 0, 70, 7);
    s.pop();
  };

  function polygon(x, y, radius, npoints) {
    var angle = s.TWO_PI / npoints;
    s.beginShape();
    for (var a = 0; a < s.TWO_PI; a += angle) {
      var sx = x + s.cos(a) * radius;
      var sy = y + s.sin(a) * radius;
      s.vertex(sx, sy);
    }
    s.endShape(s.CLOSE);
  }
}
