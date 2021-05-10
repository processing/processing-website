/**
 * Load and Display
 *
 * Images can be loaded and displayed to the screen at their actual size
 * or any other size.
 */

function runLiveSketch(s) {
  var img; // Declare variable "a" of type PImage

  s.preload = () => {
    // The image file must be in the data folder of the current sketch
    // to load successfully
    img = s.loadImage('/moonwalk.jpg');
  };

  s.setup = () => {
    s.createCanvas(640, 360);
  };

  s.draw = () => {
    // Displays the image at its actual size at point (0,0)
    s.image(img, 0, 0);
    // Displays the image at point (0, height/2) at half of its size
    s.image(img, 0, s.height / 2, img.width / 2, img.height / 2);
    s.noLoop();
  };
}
