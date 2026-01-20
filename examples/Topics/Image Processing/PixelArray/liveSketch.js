/**
 * Pixel Array.
 *
 * Click and drag the mouse up and down to control the signal and
 * press and hold any key to see the current pixel being read.
 * This program sequentially reads the color of every pixel of an image
 * and displays this color to fill the window.
 */

// The next line is needed if running in JavaScript Mode with Processing.js
/* @pjs preload="sea.jpg"; */

function runLiveSketch(s) {
  var img;
  var direction = 1;
  var signal = 0;

  s.preload = () => {
    img = s.loadImage('/livesketch/pixelarray/sea.jpg');
  };

  s.setup = () => {
    s.createCanvas(640, 360);
    s.noFill();
    s.stroke(255);
    s.frameRate(30);
  };

  s.draw = () => {
    if (signal > img.width * img.height - 1 || signal < 0) {
      direction = direction * -1;
    }

    if (s.mouseIsPressed) {
      var mx = s.constrain(s.mouseX, 0, img.width - 1);
      var my = s.constrain(s.mouseY, 0, img.height - 1);
      signal = my * img.width + mx;
    } else {
      signal += 0.33 * direction;
    }

    var sx = s.int(signal) % img.width;
    var sy = s.int(signal) / img.width;

    if (s.keyIsPressed) {
      s.set(0, 0, img); // fast way to draw an image
      s.point(sx, sy);
      s.rect(sx - 5, sy - 5, 10, 10);
    } else {
      var c = img.get(sx, sy);
      s.background(c);
    }
  };
}
