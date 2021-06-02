/**
 * Easing.
 *
 * Move the mouse across the screen and the symbol will follow.
 * Between drawing each frame of the animation, the program
 * calculates the difference between the position of the
 * symbol and the cursor. If the distance is larger than
 * 1 pixel, the symbol moves part of the distance (0.05) from its
 * current position toward the cursor.
 */

function runLiveSketch(s) {
  var x = 0;
  var y = 0;
  var easing = 0.05;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.noStroke();
  };

  s.draw = () => {
    s.background(51);

    var targetX = s.mouseX;
    var dx = targetX - x;
    if (s.abs(dx) > 1) {
      x += dx * easing;
    }

    var targetY = mouseY;
    var dy = targetY - y;
    if (s.abs(dy) > 1) {
      y += dy * easing;
    }

    s.ellipse(x, y, 66, 66);
  };
}
