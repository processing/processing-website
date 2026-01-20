/**
 * Width and Height.
 *
 * The 'width' and 'height' variables contain the width and height
 * of the display window as defined in the size() function.
 */

function runLiveSketch(s) {
  s.setup = () => {
    s.createCanvas(640, 360);
  };

  s.draw = () => {
    s.background(127);
    s.noStroke();
    for (var i = 0; i < s.height; i += 20) {
      s.fill(129, 206, 15);
      s.rect(0, i, s.width, 10);
      s.fill(255);
      s.rect(i, 0, 10, s.height);
    }
  };
}
