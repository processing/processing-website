/**
 * Continuous Lines.
 *
 * Click and drag the mouse to draw a line.
 */
function runLiveSketch(s) {
  s.setup = () => {
    s.createCanvas(640, 360);
    s.background(102);
  };

  s.draw = () => {
    s.stroke(255);
    if (s.mouseIsPressed == true) {
      s.line(s.mouseX, s.mouseY, s.pmouseX, s.pmouseY);
    }
  };
}
