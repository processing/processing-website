/**
 * Milliseconds.
 *
 * A millisecond is 1/1000 of a second.
 * Processing keeps track of the number of milliseconds a program has run.
 * By modifying this number with the modulo(%) operator,
 * different patterns in time are created.
 */

function runLiveSketch(s) {
  var scale;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.noStroke();
    scale = s.width / 20;
  };

  s.draw = () => {
    for (var i = 0; i < scale; i++) {
      s.colorMode(s.RGB, (i + 1) * scale * 10);
      s.fill(s.millis() % ((i + 1) * scale * 10));
      s.rect(i * scale, 0, scale, s.height);
    }
  };
}
