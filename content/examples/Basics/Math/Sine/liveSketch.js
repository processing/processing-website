/**
 * Sine.
 *
 * Smoothly scaling size with the sin() function.
 */
function runLiveSketch(s) {
  var diameter;
  var angle = 0;

  s.setup = () => {
    s.createCanvas(640, 360);
    diameter = s.height - 10;
    s.noStroke();
    s.noStroke();
    s.fill(255, 204, 0);
  };

  s.draw = () => {
    s.background(0);

    var d1 = 10 + (s.sin(angle) * diameter) / 2 + diameter / 2;
    var d2 = 10 + (s.sin(angle + s.PI / 2) * diameter) / 2 + diameter / 2;
    var d3 = 10 + (s.sin(angle + s.PI) * diameter) / 2 + diameter / 2;

    s.ellipse(0, s.height / 2, d1, d1);
    s.ellipse(s.width / 2, s.height / 2, d2, d2);
    s.ellipse(s.width, s.height / 2, d3, d3);

    angle += 0.02;
  };
}
