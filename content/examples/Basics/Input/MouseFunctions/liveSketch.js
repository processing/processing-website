/**
 * Mouse Functions.
 *
 * Click on the box and drag it across the screen.
 */

function runLiveSketch(s) {
  var bx;
  var by;
  var boxSize = 75;
  var overBox = false;
  var locked = false;
  var xOffset = 0.0;
  var yOffset = 0.0;

  s.setup = () => {
    s.createCanvas(640, 360);
    bx = s.width / 2.0;
    by = s.height / 2.0;
    s.rectMode(s.RADIUS);
  };

  s.draw = () => {
    s.background(0);

    // Test if the cursor is over the box
    if (
      s.mouseX > bx - boxSize &&
      s.mouseX < bx + boxSize &&
      s.mouseY > by - boxSize &&
      s.mouseY < by + boxSize
    ) {
      overBox = true;
      if (!locked) {
        s.stroke(255);
        s.fill(153);
      }
    } else {
      s.stroke(153);
      s.fill(153);
      overBox = false;
    }

    // Draw the box
    s.rect(bx, by, boxSize, boxSize);
  };

  s.mousePressed = () => {
    if (overBox) {
      locked = true;
      s.fill(255, 255, 255);
    } else {
      locked = false;
    }
    xOffset = s.mouseX - bx;
    yOffset = s.mouseY - by;
  };

  s.mouseDragged = () => {
    if (locked) {
      bx = s.mouseX - xOffset;
      by = s.mouseY - yOffset;
    }
  };

  s.mouseReleased = () => {
    locked = false;
  };
}
