/**
 * Redraw.
 *
 * The redraw() function makes draw() execute once.
 * In this example, draw() is executed once every time
 * the mouse is clicked.
 */

function runLiveSketch(s) {
  var y;

  // The statements in the setup() function
  // execute once when the program begins
  s.setup = () => {
    s.createCanvas(640, 360);
    s.stroke(255); // Set line drawing color to white
    s.noLoop();
    y = s.height * 0.5;
  };

  // The code in draw() is run until the program 
  // is stopped. Each statement is executed in
  // sequence and after the last line is read, 
  // the first line is run again.
  s.draw = () => {
    s.background(0); // Set the background to black
    y = y - 4;
    if (y < 0) {
      y = s.height;
    }
    s.line(0, y, s.width, y);
  };

  s.mousePressed() {
    s.redraw();
  }
}
