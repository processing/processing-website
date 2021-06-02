/**
 * Random Gaussian.
 *
 * This sketch draws ellipses with x and y locations tied to a gaussian distribution of random numbers.
 */

function runLiveSketch(s) {
  s.setup = () => {
    s.createCanvas(640, 360);
    s.background(0);
  };

  s.draw = () => {
    // Get a gaussian random number w/ mean of 0 and standard deviation of 1.0
    var val = s.randomGaussian();

    var sd = 60; // Define a standard deviation
    var mean = s.width / 2; // Define a mean value (middle of the screen along the x-axis)
    var x = val * sd + mean; // Scale the gaussian random number by standard deviation and mean

    s.noStroke();
    s.fill(255, 10);
    s.noStroke();
    s.ellipse(x, s.height / 2, 32, 32); // Draw an ellipse at our "normal" random location
  };
}
