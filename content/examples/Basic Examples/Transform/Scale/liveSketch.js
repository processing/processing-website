/**
 * Scale
 * by Denis Grutze.
 *
 * Paramenters for the scale() function are values specified
 * as decimal percentages. For example, the method call scale(2.0)
 * will increase the dimension of the shape by 200 percent.
 * Objects always scale from the origin.
 */

function runLiveSketch(s) {
  var a = 0.0;
  var s = 0.0;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.noStroke();
    s.rectMode(s.CENTER);
    s.frameRate(30);
  };

  s.draw = () => {
    s.background(102);

    a = a + 0.04;
    s = s.cos(a) * 2;

    s.translate(s.width / 2, s.height / 2);
    s.scale(s);
    s.fill(51);
    s.rect(0, 0, 50, 50);

    s.translate(75, 0);
    s.fill(255);
    s.scale(s);
    s.rect(0, 0, 50, 50);
  };
}
