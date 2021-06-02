/**
 * Noise1D.
 *
 * Using 1D Perlin Noise to assign location.
 */

function runLiveSketch(s) {
  var xoff = 0.0;
  var xincrement = 0.01;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.background(0);
    s.noStroke();
  };

  s.draw = () => {
    // Create an alpha blended background
    s.fill(0, 10);
    s.rect(0, 0, s.width, s.height);

    //var n = random(0,width);  // Try this line instead of noise

    // Get a noise value based on xoff and scale it according to the window's width
    var n = s.noise(xoff) * s.width;

    // With each cycle, increment xoff
    xoff += xincrement;

    // Draw the ellipse at the value produced by perlin noise
    s.fill(200);
    s.ellipse(n, s.height / 2, 64, 64);
  };
}
