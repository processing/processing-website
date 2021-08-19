/**
 * Alpha Mask.
 *
 * Loads a "mask" for an image to specify the transparency
 * in different parts of the image. The two images are blended
 * together using the mask() method of PImage.
 */

function runLiveSketch(s) {
  var img;
  var imgMask;

  s.preload = () => {
    img = s.loadImage('/livesketch/alphamask/moonwalk.jpg');
    imgMask = s.loadImage('/livesketch-manual/mask.png');
  };

  s.setup = () => {
    s.createCanvas(640, 360);
    // Temporary fix until https://github.com/lmccart/p5.js/pull/533
    imgMask.loadPixels();
    for (var i = 0; i < imgMask.pixels.length; i += 4) {
      imgMask.pixels[i] = 255;
      imgMask.pixels[i + 1] = 255;
      imgMask.pixels[i + 2] = 255;
      imgMask.pixels[i + 3] = 255 - imgMask.pixels[i + 3];
    }
    imgMask.updatePixels();
    img.mask(imgMask);
    s.imageMode(s.CENTER);
  };

  s.draw = () => {
    s.background(0, 102, 153);
    s.image(img, s.width / 2, s.height / 2);
    s.image(img, s.mouseX, s.mouseY);
  };
}
