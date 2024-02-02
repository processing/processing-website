/**
 * Color Variables (Homage to Albers).
 *
 * This example creates variables for colors that may be referred to
 * in the program by a name, rather than a number.
 */

function runLiveSketch(s) {
  s.setup = () => {
    s.createCanvas(640, 360);
    s.noStroke();
    s.background(51, 0, 0);

    var inside = s.color(204, 102, 0);
    var middle = s.color(204, 153, 0);
    var outside = s.color(153, 51, 0);

    // These statements are equivalent to the statements above.
    // Programmers may use the format they prefer.
    //color inside = #CC6600;
    //color middle = #CC9900;
    //color outside = #993300;

    s.describe(
      'There are two sets of squares. The first set contains three squares of varying sizes stacked together. The color of the smallest square is orange, the color of the middle square is gold, and the color of the biggest square is brown.  On the right of the first set is the second set, which is similar to the first. The only difference here is the color of the squares; the smallest square is gold, the middle square is brown, and the biggest square is orange.'
    );

    s.push();
    s.translate(80, 80);
    s.fill(outside);
    s.rect(0, 0, 200, 200);
    s.fill(middle);
    s.rect(40, 60, 120, 120);
    s.fill(inside);
    s.rect(60, 90, 80, 80);
    s.pop();

    s.push();
    s.translate(360, 80);
    s.fill(inside);
    s.rect(0, 0, 200, 200);
    s.fill(outside);
    s.rect(40, 60, 120, 120);
    s.fill(middle);
    s.rect(60, 90, 80, 80);
    s.pop();

    s.noLoop();
  };
}
