/**
 * Brightness
 * by Daniel Shiffman.
 *
 * This program adjusts the brightness of a part of the image by
 * calculating the distance of each pixel to the mouse.
 */

// The next line is needed if running in JavaScript Mode with Processing.js
/* @pjs preload="moon-wide.jpg"; */

function runLiveSketch(s) {
  var img;

  s.preload = () => {
    img = s.loadImage('/moon-wide.jpg');
  };

  s.setup = () => {
    s.createCanvas(640, 360);
    s.pixelDensity(1);
    s.frameRate(30);
    img.loadPixels();
    // Only need to load the pixels[] array once, because we're only
    // manipulating pixels[] inside draw(), not drawing shapes.
    s.loadPixels();
  };

  s.draw = () => {
    for (var x = 0; x < img.width; x++) {
      for (var y = 0; y < img.height; y++) {
        // Calculate the 1D location from a 2D grid
        var loc = (x + y * img.width) * 4;
        // Get the R,G,B values from image
        var r, g, b;
        r = img.pixels[loc];
        //g = green (img.pixels[loc]);
        //b = blue (img.pixels[loc]);
        // Calculate an amount to change brightness based on proximity to the mouse
        var maxdist = 50; //dist(0,0,width,height);
        var d = s.dist(x, y, s.mouseX, s.mouseY);
        var adjustbrightness = (255 * (maxdist - d)) / maxdist;
        r += adjustbrightness;
        //g += adjustbrightness;
        //b += adjustbrightness;
        // Constrain RGB to make sure they are within 0-255 color range
        r = s.constrain(r, 0, 255);
        //g = constrain(g, 0, 255);
        //b = constrain(b, 0, 255);
        // Make a new color and set pixel in the window
        //color c = color(r, g, b);
        var pixloc = (y * s.width + x) * 4;
        s.pixels[pixloc] = r;
        s.pixels[pixloc + 1] = r;
        s.pixels[pixloc + 2] = r;
        s.pixels[pixloc + 3] = 255;
      }
    }
    s.updatePixels();
  };
}
