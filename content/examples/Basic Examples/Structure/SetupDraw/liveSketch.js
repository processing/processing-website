/**
 * Setup and Draw.
 *
 * The code inside the draw() function runs continuously
 * from top to bottom until the program is stopped.
 */
function runLiveSketch(s) {
  var y = 100;

  // The statements in the setup() function
  // execute once when the program begins
  s.setup = () => {
    s.createCanvas(640, 360);
    s.stroke(255); // Set line drawing color to white
    s.frameRate(30);
  };
  // The statements in draw() are executed until the
  // program is stopped. Each statement is executed in
  // sequence and after the last line is read, the first
  // line is executed again.
  s.draw = () => {
    s.background(0); // Clear the screen with a black background
    y = y - 1;
    if (y < 0) {
      y = s.height;
    }
    s.line(0, y, s.width, y);
  };
}
