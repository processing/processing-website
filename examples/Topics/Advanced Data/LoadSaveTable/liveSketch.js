/**
 * Loading Tabular Data
 * by Daniel Shiffman.
 *
 * This example demonstrates how to use loadTable()
 * to retrieve data from a CSV file and make objects
 * from that data.
 *
 * Here is what the CSV looks like:
 *
 x,y,diameter,name
 160,103,43.19838,Happy
 372,137,52.42526,Sad
 273,235,61.14072,Joyous
 121,179,44.758068,Melancholy
 */

// Should work once this is fixed: https://github.com/processing/p5.js/issues/486

function runLiveSketch(s) {
  // An Array of Bubble objects
  var bubbles;
  // A Table object
  var table;

  s.preload = () => {
    // Load CSV file into a Table object
    // "header" option indicates the file has a header row
    table = s.loadTable('/livesketch/loadsavetable/data.csv', 'header');
  };

  s.setup = () => {
    s.createCanvas(640, 360);
    loadData();
  };

  s.draw = () => {
    s.background(255);
    // Display all bubbles
    for (var i = 0; i < bubbles.length; i++) {
      var b = bubbles[i];
      b.display();
      b.rollover(s.mouseX, s.mouseY);
    }

    s.textAlign(s.LEFT);
    s.fill(0);
    s.noStroke();
    s.text('Click to add bubbles.', 10, s.height - 10);
  };

  function loadData() {
    // The size of the array of Bubble objects is determined by the total number of rows in the CSV
    bubbles = [];

    // You can access iterate over all the rows in a table
    var rowCount = 0;
    for (var i = 0; i < table.getRowCount(); i++) {
      var row = table.getRow(i);

      // You can access the fields via their column name (or index)
      var x = row.getNum('x');
      var y = row.getNum('y');
      var d = row.getNum('diameter');
      var n = row.getString('name');
      // Make a Bubble object out of the data read
      bubbles[rowCount] = new Bubble(x, y, d, n);
      rowCount++;
    }
  }

  s.mousePressed = () => {
    // Create a new row
    var row = table.addRow();
    // Set the values of that row
    row.set('x', s.mouseX);
    row.set('y', s.mouseY);
    row.set('diameter', s.random(40, 80));
    row.set('name', 'Blah');

    // If the table has more than 10 rows
    if (table.getRowCount() > 10) {
      // Delete the oldest row
      table.removeRow(0);
    }

    // Writing the CSV back to the same file
    // saveTable(table, "/data.csv");
    // And reloading it
    loadData();
  };

  // A Bubble class

  // Create  the Bubble
  function Bubble(x_, y_, diameter_, sp) {
    this.over = false;
    this.x = x_;
    this.y = y_;
    this.diameter = diameter_;
    this.name = sp;

    // CHecking if mouse is over the Bubble
    this.rollover = function (px, py) {
      var d = s.dist(px, py, this.x, this.y);
      if (d < this.diameter / 2) {
        this.over = true;
      } else {
        this.over = false;
      }
    };

    // Display the Bubble
    this.display = function () {
      s.stroke(0);
      s.strokeWeight(2);
      s.noFill();
      s.ellipse(this.x, this.y, this.diameter, this.diameter);
      if (this.over) {
        s.fill(0);
        s.noStroke();
        s.textAlign(s.CENTER);
        s.text(this.name, this.x, this.y + this.diameter / 2 + 20);
      }
    };
  }
}
