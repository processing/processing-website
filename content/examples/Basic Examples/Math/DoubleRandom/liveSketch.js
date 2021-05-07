/**
 * Double Random
 * by Ira Greenberg.
 *
 * Using two random() calls and the point() function
 * to create an irregular sawtooth line.
 */
function runLiveSketch(s) {
  var totalPts = 300;
  var steps = totalPts + 1;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.stroke(255);
    s.frameRate(1);
  };

  s.draw = () => {
    s.background(0);
    var rand = 0;
    for (var i = 1; i < steps; i++) {
      s.point((s.width / steps) * i, s.height / 2 + s.random(-rand, rand));
      rand += s.random(-5, 5);
    }
  };
}
