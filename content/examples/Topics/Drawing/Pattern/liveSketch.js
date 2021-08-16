/**
 * Patterns.
 *
 * Move the cursor over the image to draw with a software tool
 * which responds to the speed of the mouse.
 */
function runLiveSketch(s) {
  s.setup = () => {
    s.createCanvas(640, 360);
    s.background(102);
  };

  s.draw = () => {
    // Call the variableEllipse() method and send it the
    // parameters for the current mouse position
    // and the previous mouse position
    variableEllipse(s.mouseX, s.mouseY, s.pmouseX, s.pmouseY);
  };

  // The simple method variableEllipse() was created specifically
  // for this program. It calculates the speed of the mouse
  // and draws a small ellipse if the mouse is moving slowly
  // and draws a large ellipse if the mouse is moving quickly
  function variableEllipse(x, y, px, py) {
    var speed = s.abs(x - px) + s.abs(y - py);
    s.stroke(speed);
    // hack to stop doing a giant one at the start
    if (speed < s.width / 2) {
      s.ellipse(x, y, speed, speed);
    }
  }
}
