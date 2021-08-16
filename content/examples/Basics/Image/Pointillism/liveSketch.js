/**
 * Pointillism
 * by Daniel Shiffman.
 *
 * Mouse horizontal location controls size of dots.
 * Creates a simple pointillist effect using ellipses colored
 * according to pixels in an image.
 */

// The next line is needed if running in JavaScript Mode with Processing.js
/* @pjs preload="moonwalk.jpg"; */

function runLiveSketch(s) {
  var img;
  var smallPoint, largePoint;

  s.preload = () => {
    img = s.loadImage('/moonwalk.jpg');
  };

  s.setup = () => {
    s.createCanvas(640, 360);
    smallPoint = 4;
    largePoint = 40;
    s.imageMode(s.CENTER);
    s.noStroke();
    s.background(255);
  };

  s.draw = () => {
    var pointillize = s.map(s.mouseX, 0, s.width, smallPoint, largePoint);
    var x = s.int(s.random(img.width));
    var y = s.int(s.random(img.height));
    var pix = img.get(x, y);
    s.fill(pix[0], pix[1], pix[2], 128);
    s.ellipse(x, y, pointillize, pointillize);
  };
}
