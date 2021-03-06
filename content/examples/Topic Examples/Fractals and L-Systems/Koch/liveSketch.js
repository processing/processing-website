/**
 * Koch Curve
 * by Daniel Shiffman.
 *
 * Renders a simple fractal, the Koch snowflake.
 * Each recursive level is drawn in sequence.
 */

function runLiveSketch(s) {
  var k;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.frameRate(1); // Animate slowly
    k = new KochFractal();
  };

  s.draw = () => {
    s.background(0);
    // Draws the snowflake!
    k.render();
    // Iterate
    k.nextLevel();
    // Let's not do it more than 5 times. . .
    if (k.getCount() > 5) {
      k.restart();
    }
  };

  // The Nature of Code
  // Daniel Shiffman
  // http://natureofcode.com

  // Koch Curve
  // A class to manage the list of line segments in the snowflake pattern

  function KochFractal() {
    this.start = s.createVector(0, s.height - 20); // A p5.Vector for the start
    this.end = s.createVector(s.width, s.height - 20); // A p5.Vector for the end
    this.lines = []; // An array to keep track of all the lines
    this.count = 0;

    this.nextLevel = function () {
      // For every line that is in the arraylist
      // create 4 more lines in a new arraylist
      this.lines = this.iterate(this.lines);
      this.count++;
    };

    this.restart = function () {
      this.count = 0; // Reset count
      this.lines = []; // Empty the array list
      this.lines.push(new KochLine(this.start, this.end)); // Add the initial line (from one end p5.Vector to the other)
    };
    this.restart();

    this.getCount = function () {
      return this.count;
    };

    // This is easy, just draw all the lines
    this.render = function () {
      for (var i = 0; i < this.lines.length; i++) {
        this.lines[i].display();
      }
    };

    // This is where the **MAGIC** happens
    // Step 1: Create an empty arraylist
    // Step 2: For every line currently in the arraylist
    //   - calculate 4 line segments based on Koch algorithm
    //   - add all 4 line segments into the new arraylist
    // Step 3: Return the new arraylist and it becomes the list of line segments for the structure

    // As we do this over and over again, each line gets broken into 4 lines, which gets broken into 4 lines, and so on. . .
    this.iterate = function (before) {
      var now = []; // Create emtpy list
      for (var i = 0; i < this.lines.length; i++) {
        var l = this.lines[i];
        // Calculate 5 koch p5.Vectors (done for us by the line object)
        var a = l.kochA();
        var b = l.kochB();
        var c = l.kochC();
        var d = l.kochD();
        var e = l.kochE();
        // Make line segments between all the p5.Vectors and add them
        now.push(new KochLine(a, b));
        now.push(new KochLine(b, c));
        now.push(new KochLine(c, d));
        now.push(new KochLine(d, e));
      }
      return now;
    };
  }

  // The Nature of Code
  // Daniel Shiffman
  // http://natureofcode.com

  // Koch Curve
  // A class to describe one line segment in the fractal
  // Includes methods to calculate midp5.Vectors along the line according to the Koch algorithm

  function KochLine(a, b) {
    // Two p5.Vectors,
    // start is the "left" p5.Vector and
    // end is the "right p5.Vector
    this.start = a.copy();
    this.end = b.copy();

    this.display = function () {
      s.stroke(255);
      s.line(this.start.x, this.start.y, this.end.x, this.end.y);
    };

    this.kochA = function () {
      return this.start.copy();
    };

    // This is easy, just 1/3 of the way
    this.kochB = function () {
      var v = p5.Vector.sub(this.end, this.start);
      v.div(3);
      v.add(this.start);
      return v;
    };

    // More complicated, have to use a little trig to figure out where this p5.Vector is!
    this.kochC = function () {
      var a = this.start.copy(); // Start at the beginning
      var v = p5.Vector.sub(this.end, this.start);
      v.div(3);
      a.add(v); // Move to point B
      v.rotate(-s.PI / 3); // Rotate 60 degrees
      a.add(v); // Move to point C
      return a;
    };

    // Easy, just 2/3 of the way
    this.kochD = function () {
      var v = p5.Vector.sub(this.end, this.start);
      v.mult(2 / 3.0);
      v.add(this.start);
      return v;
    };

    this.kochE = function () {
      return this.end.copy();
    };
  }
}
