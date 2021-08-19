/**
 * Create Image.
 *
 * The createImage() function provides a fresh buffer of pixels to play with.
 * This example creates an image gradient.
 */

function runLiveSketch(s) {
  var img;

  s.setup = () => {
    s.createCanvas(640, 360);
    img = s.createImage(230, 230);
    img.loadPixels();
    for (var i = 0; i < img.pixels.length; i += 4) {
      var a = s.map(i, 0, img.pixels.length, 255, 0);
      img.pixels[i] = 0;
      img.pixels[i + 1] = 153;
      img.pixels[i + 2] = 204;
      img.pixels[i + 3] = a;
    }
    img.updatePixels();
  };

  s.draw = () => {
    s.background(0);
    s.image(img, 90, 80);
    s.image(img, s.mouseX - img.width / 2, s.mouseY - img.height / 2);
  };
}
