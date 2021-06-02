/**
 * Conditionals 2.
 *
 * We extend the language of conditionals from the previous
 * example by adding the keyword "else". This allows conditionals
 * to ask two or more sequential questions, each with a different
 * action.
 */

function runLiveSketch(s) {
  s.setup = () => {
    s.createCanvas(640, 360);
    s.background(0);

    for (var i = 2; i < s.width - 2; i += 2) {
      // If 'i' divides by 20 with no remainder
      if (i % 20 == 0) {
        s.stroke(255);
        s.line(i, 80, i, s.height / 2);
        // If 'i' divides by 10 with no remainder
      } else if (i % 10 == 0) {
        s.stroke(153);
        s.line(i, 20, i, 180);
        // If neither of the above two conditions are met
        // then draw this line
      } else {
        s.stroke(102);
        s.line(i, s.height / 2, i, s.height - 20);
      }
    }
    s.noLoop();
  };
}
