/**
 * Noise2D
 * by Daniel Shiffman.
 *
 * Using 2D noise to create simple texture.
 */

function runLiveSketch(s) {
  var increment = 0.02;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.pixelDensity(1);
  };

  s.draw = () => {
    s.loadPixels();

    var xoff = 0.0; // Start xoff at 0
    var detail = s.map(s.mouseX, 0, s.width, 0.1, 0.6);
    s.noiseDetail(8, detail);

    // For every x,y coordinate in a 2D space, calculate a noise value and produce a brightness value
    for (var x = 0; x < s.width; x++) {
      xoff += increment; // Increment xoff
      var yoff = 0.0; // For every xoff, start yoff at 0
      for (var y = 0; y < s.height; y++) {
        yoff += increment; // Increment yoff

        // Calculate noise and scale by 255
        var bright = s.noise(xoff, yoff) * 255;

        // Try using this line instead
        //var bright = random(0,255);

        // Set each pixel onscreen to a grayscale value
        var loc = (x + y * s.width) * 4;
        s.pixels[loc] = bright;
        s.pixels[loc + 1] = bright;
        s.pixels[loc + 2] = bright;
        s.pixels[loc + 3] = 255; // Scale to between 0 and 255
      }
    }

    s.updatePixels();
  };
}
