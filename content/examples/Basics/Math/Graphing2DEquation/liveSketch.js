/**
 * Graphing 2D Equations
 * by Daniel Shiffman.
 *
 * Graphics the following equation:
 * sin(n*cos(r) + 5*theta)
 * where n is a function of horizontal mouse location.
 */

function runLiveSketch(s) {
  s.setup = () => {
    s.createCanvas(640, 360);
    // Temporary-ish fix for retina machines
    s.pixelDensity(1);
  };

  s.draw = () => {
    s.loadPixels();
    var n = (s.mouseX * 10.0) / s.width;
    var w = 16.0; // 2D space width
    var h = 16.0; // 2D space height
    var dx = w / s.width; // Increment x this amount per pixel
    var dy = h / s.height; // Increment y this amount per pixel
    var x = -w / 2; // Start x at -1 * width / 2
    for (var i = 0; i < s.width; i++) {
      var y = -h / 2; // Start y at -1 * height / 2
      for (var j = 0; j < s.height; j++) {
        var r = s.sqrt(x * x + y * y); // Convert cartesian to polar
        var theta = s.atan2(y, x); // Convert cartesian to polar
        // Compute 2D polar coordinate function
        var val = s.sin(n * s.cos(r) + 5 * theta); // Results in a value between -1 and 1
        //var val = cos(r);                            // Another simple function
        //var val = sin(theta);                        // Another simple function
        // Map resulting vale to grayscale value
        var loc = (i + j * s.width) * 4;
        var b = s.map(val, -1, 1, 0, 255); // Scale to between 0 and 255
        s.pixels[loc] = b;
        s.pixels[loc + 1] = b;
        s.pixels[loc + 2] = b;
        s.pixels[loc + 3] = 255; // Scale to between 0 and 255
        y += dy; // Increment y
      }
      x += dx; // Increment x
    }
    s.updatePixels();
  };
}
