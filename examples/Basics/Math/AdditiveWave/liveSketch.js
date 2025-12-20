/**
 * Additive Wave
 * by Daniel Shiffman.
 *
 * Create a more complex wave by adding two waves together.
 */

function runLiveSketch(s) {
  var xspacing = 8; // How far apart should each horizontal location be spaced
  var w; // Width of entire wave
  var maxwaves = 4; // total # of waves to add together

  var theta = 0.0;
  var amplitude = new Array(maxwaves); // Height of wave
  var dx = new Array(maxwaves); // Value for incrementing X, to be calculated as a function of period and xspacing
  var yvalues; // Using an array to store height values for the wave (not entirely necessary)

  s.setup = () => {
    s.createCanvas(640, 360);
    s.frameRate(30);
    s.colorMode(s.RGB, 255, 255, 255, 100);
    w = s.width + 16;

    for (var i = 0; i < maxwaves; i++) {
      amplitude[i] = s.random(10, 30);
      var period = s.random(100, 300); // How many pixels before the wave repeats
      dx[i] = (s.TWO_PI / period) * xspacing;
    }

    yvalues = new Array(w / xspacing);
  };

  s.draw = () => {
    s.background(0);
    calcWave();
    renderWave();
  };

  function calcWave() {
    // Increment theta (try different values for 'angular velocity' here
    theta += 0.02;

    // Set all height values to zero
    for (var i = 0; i < yvalues.length; i++) {
      yvalues[i] = 0;
    }

    // Accumulate wave height values
    for (var j = 0; j < maxwaves; j++) {
      var x = theta;
      for (var i = 0; i < yvalues.length; i++) {
        // Every other wave is cosine instead of sine
        if (j % 2 == 0) yvalues[i] += s.sin(x) * amplitude[j];
        else yvalues[i] += s.cos(x) * amplitude[j];
        x += dx[j];
      }
    }
  }

  function renderWave() {
    // A simple way to draw the wave with an ellipse at each location
    s.noStroke();
    s.fill(255, 50);
    s.ellipseMode(s.CENTER);
    for (var x = 0; x < yvalues.length; x++) {
      s.ellipse(x * xspacing, s.height / 2 + yvalues[x], 16, 16);
    }
  }
}
