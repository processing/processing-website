/**
 * Star
 *
 * The star() function created for this example is capable of drawing a
 * wide range of different forms. Try placing different numbers into the
 * star() function calls within draw() to explore.
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
    star(0, 0, 5, 70, 3);
    s.pop();

    s.push();
    s.translate(s.width * 0.5, s.height * 0.5);
    s.rotate(s.frameCount / 50.0);
    star(0, 0, 80, 100, 40);
    s.pop();

    s.push();
    s.translate(s.width * 0.8, s.height * 0.5);
    s.rotate(s.frameCount / -100.0);
    star(0, 0, 30, 70, 5);
    s.pop();
  };

  function star(x, y, radius1, radius2, npoints) {
    var angle = s.TWO_PI / npoints;
    var halfAngle = angle / 2.0;
    s.beginShape();
    for (var a = 0; a < s.TWO_PI; a += angle) {
      var sx = x + s.cos(a) * radius2;
      var sy = y + s.sin(a) * radius2;
      s.vertex(sx, sy);
      sx = x + s.cos(a + halfAngle) * radius1;
      sy = y + s.sin(a + halfAngle) * radius1;
      s.vertex(sx, sy);
    }
    s.endShape(s.CLOSE);
  }
}
