/**
 * Background Image.
 *
 * This example presents the fastest way to load a background image
 * into Processing. To load an image as the background, it must be
 * the same width and height as the program.
 */

// The next line is needed if running in JavaScript Mode with Processing.js
/* @pjs preload="moonwalk.jpg"; */

function runLiveSketch(s) {
  var bg;
  var y = 0;

  s.preload = () => {
    // The background image must be the same size as the parameters
    // into the size() method. In this program, the size of the image
    // is 640 x 360 pixels.
    bg = s.loadImage('/moonwalk.jpg');
  };

  s.setup = () => {
    s.createCanvas(640, 360);
  };

  s.draw = () => {
    s.background(bg);

    s.stroke(226, 204, 0);
    s.line(0, y, s.width, y);

    y++;
    if (y > s.height) {
      y = 0;
    }
  };
}
