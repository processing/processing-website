/**
 * Tickle.
 *
 * The word "tickle" jitters when the cursor hovers over.
 * Sometimes, it can be tickled off the screen.
 */

// The next line is needed if running in JavaScript Mode with Processing.js
/* @pjs font="Georgia.ttf"; */

function runLiveSketch(s) {
  var message = 'tickle';
  var x, y; // X and Y coordinates of text
  var hr, vr; // horizontal and vertical radius of the text

  s.setup = () => {
    s.createCanvas(640, 360);

    // Create the font
    s.textFont('Source Code Pro', 36);
    s.textAlign(s.CENTER, s.CENTER);

    hr = s.textWidth(message) / 2;
    vr = (s.textAscent() + s.textDescent()) / 2;
    s.noStroke();
    x = s.width / 2;
    y = s.height / 2;
  };

  s.draw = () => {
    // Instead of clearing the background, fade it by drawing
    // a semi-transparent rectangle on top
    s.fill(204, 120);
    s.rect(0, 0, s.width, s.height);

    // If the cursor is over the text, change the position
    if (s.abs(s.mouseX - x) < hr && s.abs(s.mouseY - y) < vr) {
      x += s.random(-5, 5);
      y += s.random(-5, 5);
    }
    s.fill(0);
    s.text('tickle', x, y);
  };
}
