/**
 * Random.
 *
 * Random numbers create the basis of this image.
 * Each time the program is loaded the result is different.
 */
function runLiveSketch(s) {
  s.setup = () => {
    s.createCanvas(640, 360);
    s.background(0);
    s.strokeWeight(20);
    s.frameRate(2);
  };

  s.draw = () => {
    for (var i = 0; i < s.width; i++) {
      var r = s.random(255);
      s.stroke(r);
      s.line(i, 0, i, s.height);
    }
  };
}
