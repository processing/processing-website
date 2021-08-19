/**
 * Conditionals 1.
 *
 * Conditions are like questions.
 * They allow a program to decide to take one action if
 * the answer to a question is true or to do another action
 * if the answer to the question is false.
 * The questions asked within a program are always logical
 * or relational statements. For example, if the variable 'i' is
 * equal to zero then draw a line.
 */

function runLiveSketch(s) {
  s.setup = () => {
    s.createCanvas(640, 360);
    s.background(0);

    for (var i = 10; i < s.width; i += 10) {
      // If 'i' divides by 20 with no remainder draw the first line
      // else draw the second line
      if (i % 20 == 0) {
        s.stroke(255);
        s.line(i, 80, i, s.height / 2);
      } else {
        s.stroke(153);
        s.line(i, 20, i, 180);
      }
    }
    s.noLoop();
  };
}
