/**
 * Loop.
 *
 * The loop() function causes draw() to run
 * continuously. If noLoop() is called in setup()
 * the draw() is only run once. In this example
 * click the mouse to execute loop(), which will
 * cause the draw() the run continuously.
 */
function runLiveSketch(s) {
  var y = 100;

  // The statements in the setup() function
  // run once when the program begins
  s.setup = () => {
    s.createCanvas(640, 360);
    s.stroke(255); // Set stroke color to white
    s.noLoop();

    y = s.height * 0.5;
  };

  // The code in draw() is run until the program 
  // is stopped. Each statement is executed in
  // sequence and after the last line is read, 
  // the first line is run again.
  s.draw = () => {
    s.background(0); // Set the background to black
    s.line(0, y, s.width, y);

    y = y - 1;
    if (y < 0) {
      y = s.height;
    }
  };

  s.mousePressed = () => {
    s.loop();
  };
}
