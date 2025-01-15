/**
 * Loading Images.
 *
 * Processing applications can only load images from the network
 * while running in the Processing environment.
 *
 * This example will only work when the computer is connected to the Internet.
 */

function runLiveSketch(s) {
  var img;

  s.setup = () => {
    s.createCanvas(640, 360);
    img = loadImage("https://processing.org/img/processing-web.png");
  };

  function loaded() {
    s.background(0);
    for (var i = 0; i < 5; i++) {
      s.image(img, 0, img.height * i, img.elt.width, img.elt.height);
    }
    img.hide();
  }
}
