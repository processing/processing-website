/**
 * Mouse Press.
 *
 * Move the mouse to position the shape.
 * Press the mouse button to invert the color.
 */

function runLiveSketch(s) {
  s.setup = () => {
    s.createCanvas(640, 360);
    s.noSmooth();
    s.fill(126);
    s.background(102);
  };

  s.draw = () => {
    if (s.mouseIsPressed) {
      s.stroke(255);
    } else {
      s.stroke(0);
    }
    s.line(s.mouseX - 66, s.mouseY, s.mouseX + 66, s.mouseY);
    s.line(s.mouseX, s.mouseY - 66, s.mouseX, s.mouseY + 66);
  };
}
