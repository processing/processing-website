/**
 * Words.
 *
 * The text() function is used for writing words to the screen.
 * The letters can be aligned left, center, or right with the
 * textAlign() function.
 */

function runLiveSketch(s) {
  var f;

  s.setup = () => {
    s.createCanvas(640, 360);

    // Create the font
    //printArray(PFont.list());
    //f = "Georgia";
    s.textFont('Source Code Pro', 24);
  };

  s.draw = () => {
    s.background(102);
    s.noStroke();
    s.fill(255);
    s.textAlign(s.RIGHT);
    drawType(s.width * 0.25);
    s.textAlign(s.CENTER);
    drawType(s.width * 0.5);
    s.textAlign(s.LEFT);
    drawType(s.width * 0.75);
  };

  function drawType(x) {
    s.line(x, 0, x, 65);
    s.line(x, 220, x, s.height);
    s.fill(0);
    s.text('ichi', x, 95);
    s.fill(51);
    s.text('ni', x, 130);
    s.fill(204);
    s.text('san', x, 165);
    s.fill(255);
    s.text('shi', x, 210);
  }
}
