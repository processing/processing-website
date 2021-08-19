/**
 * Noise Wave
 * by Daniel Shiffman.
 *
 * Using Perlin Noise to generate a wave-like pattern.
 */

function runLiveSketch(s) {
  var yoff = 0.0; // 2nd dimension of perlin noise

  s.setup = () => {
    s.createCanvas(640, 360);
  };

  s.draw = () => {
    s.background(51);

    s.fill(255);
    // We are going to draw a polygon out of the wave points
    s.beginShape();

    var xoff = 0; // Option #1: 2D Noise
    // var xoff = yoff; // Option #2: 1D Noise

    // Iterate over horizontal pixels
    for (var x = 0; x <= s.width; x += 10) {
      // Calculate a y value according to noise, map to
      var y = s.map(s.noise(xoff, yoff), 0, 1, 200, 300); // Option #1: 2D Noise
      // var y = map(noise(xoff), 0, 1, 200,300);    // Option #2: 1D Noise

      // Set the vertex
      s.vertex(x, y);
      // Increment x dimension for noise
      xoff += 0.05;
    }
    // increment y dimension for noise
    yoff += 0.01;
    s.vertex(s.width, s.height);
    s.vertex(0, s.height);
    s.endShape(s.CLOSE);
  };
}
