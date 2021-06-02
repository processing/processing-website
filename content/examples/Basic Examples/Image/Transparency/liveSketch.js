/**
 * Transparency.
 *
 * Move the pointer left and right across the image to change
 * its position. This program overlays one image over another
 * by modifying the alpha value of the image with the tint() function.
 */

// The next line is needed if running in JavaScript Mode with Processing.js
/* @pjs preload="moonwalk.jpg"; */

function runLiveSketch(s) {
  var img;
  var offset = 0;
  var easing = 0.05;

  s.preload = () => {
    img = s.loadImage('/moonwalk.jpg'); // Load an image into the program
  };

  s.setup = () => {
    s.createCanvas(640, 360);
  };

  s.draw = () => {
    s.image(img, 0, 0); // Display at full opacity
    var dx = s.mouseX - img.width / 2 - offset;
    offset += dx * easing;
    s.tint(255, 127); // Display at half opacity
    s.image(img, offset, 0);
  };
}
