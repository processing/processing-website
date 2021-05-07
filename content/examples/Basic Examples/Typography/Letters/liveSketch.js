/**
 * Letters.
 *
 * Draws letters to the screen. This requires loading a font,
 * setting the font, and then drawing the letters.
 */

function runLiveSketch(s) {
  var f;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.background(0);

    // Create the font
    //printArray(PFont.list());
    s.textFont('Source Code Pro', 24);
    s.textAlign(s.CENTER, s.CENTER);
  };

  s.draw = () => {
    s.background(0);

    // Set the left and top margin
    var margin = 10;
    s.translate(margin * 4, margin * 4);

    var gap = 46;
    var counter = 35;

    for (var y = 0; y < s.height - gap; y += gap) {
      for (var x = 0; x < s.width - gap; x += gap) {
        // See: https://github.com/processing/p5.js/issues/560
        var letter = String.fromCharCode(counter); //char(counter);

        if (
          letter == 'A' ||
          letter == 'E' ||
          letter == 'I' ||
          letter == 'O' ||
          letter == 'U'
        ) {
          s.fill(255, 204, 0);
        } else {
          s.fill(255);
        }
        s.noStroke();

        // Draw the letter to the screen
        s.text(letter, x, y);

        // Increment the counter
        counter++;
      }
    }
    s.noLoop();
  };
}
