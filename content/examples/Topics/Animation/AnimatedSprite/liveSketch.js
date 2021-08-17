/**
 * Animated Sprite (Shifty + Teddy)
 * by James Paterson.
 *
 * Press the mouse button to change animations.
 * Demonstrates loading, displaying, and animating GIF images.
 * It would be easy to write a program to display
 * animated GIFs, but would not allow as much control over
 * the display sequence and rate of display.
 */

function runLiveSketch(s) {
  var animation1, animation2;

  var xpos = 0;
  var ypos = 0;
  var drag = 30.0;

  s.preload = () => {
    animation1 = new Animation('/livesketch/animatedsprite/PT_Shifty_', 38);
    animation2 = new Animation('/livesketch/animatedsprite/PT_Teddy_', 60);
  };

  s.setup = () => {
    s.createCanvas(640, 360);
    s.background(255, 204, 0);
    s.frameRate(24);
    ypos = s.height * 0.25;
  };

  s.draw = () => {
    var dx = s.mouseX - xpos;
    xpos = xpos + dx / drag;

    // Display the sprite at the position xpos, ypos
    if (s.mouseIsPressed) {
      s.background(153, 153, 0);
      animation1.display(xpos - animation1.getWidth() / 2, ypos);
    } else {
      s.background(255, 204, 0);
      animation2.display(xpos - animation1.getWidth() / 2, ypos);
    }
  };

  // Class for animating a sequence of GIFs

  function Animation(imagePrefix, count) {
    this.imageCount = count;
    this.images = [];
    this.frame = 0;

    for (var i = 0; i < this.imageCount; i++) {
      // Use nf() to number format 'i' into four digits
      var filename = imagePrefix + s.nf(i, 4) + '.png';
      this.images[i] = s.loadImage(filename);
    }

    this.display = function (xpos, ypos) {
      this.frame = (this.frame + 1) % this.imageCount;
      s.image(this.images[this.frame], xpos, ypos);
    };

    this.getWidth = function () {
      return this.images[0].width;
    };
  }
}
