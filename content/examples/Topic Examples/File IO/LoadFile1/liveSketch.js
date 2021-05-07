/**
 * LoadFile 1
 *
 * Loads a text file that contains two numbers separated by a tab ('\t').
 * A new pair of numbers is loaded each frame and used to draw a point on the screen.
 */

function runLiveSketch(s) {
  var lines;
  var index = 0;

  s.preload = () => {
    lines = s.loadStrings('positions.txt');
  };

  s.setup = () => {
    s.createCanvas(200, 200);
    s.background(0);
    s.stroke(255);
    s.frameRate(12);
  };

  s.draw = () => {
    if (index < lines.length) {
      var pieces = s.split(lines[index], '\t');
      if (pieces.length == 2) {
        var x = s.int(pieces[0]) * 2;
        var y = s.int(pieces[1]) * 2;
        s.point(x, y);
      }
      // Go to the next line for the next run through draw()
      index = index + 1;
    }
  };
}
