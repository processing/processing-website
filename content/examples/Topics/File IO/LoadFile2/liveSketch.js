/**
 * LoadFile 2
 *
 * This example loads a data file about cars. Each element is separated
 * with a tab and corresponds to a different aspect of each car. The file stores
 * the miles per gallon, cylinders, displacement, etc., for more than 400 different
 * makes and models. Press a mouse button to advance to the next group of entries.
 */
function runLiveSketch(s) {
  var records;
  var lines;
  var recordCount = 0;
  var num = 9; // Display this many entries on each screen.
  var startingEntry = 0; // Display from this entry number

  s.preload = () => {
    lines = s.loadStrings('/livesketch/loadfile2/cars2.tsv');
  };

  s.setup = () => {
    s.createCanvas(640, 360);
    s.fill(255);
    s.noLoop();

    s.textFont('TheSans');

    records = new Array(lines.length);
    for (var i = 0; i < lines.length; i++) {
      var pieces = s.split(lines[i], '\t'); // Load data into array
      if (pieces.length == 9) {
        records[recordCount] = new Record(pieces);
        recordCount++;
      }
    }
    if (recordCount != records.length) {
      //records = (Record[]) subset(records, 0, recordCount);
    }
  };

  s.draw = () => {
    s.background(0);
    for (var i = 0; i < num; i++) {
      var thisEntry = startingEntry + i;
      if (thisEntry < recordCount) {
        s.fill(255);
        s.noStroke();
        s.text(thisEntry + ' > ' + records[thisEntry].name, 20, 20 + i * 20);
      }
    }
  };

  s.mousePressed = () => {
    startingEntry += num;
    if (startingEntry > records.length) {
      startingEntry = 0; // go back to the beginning
    }
    s.redraw();
  };

  function Record(pieces) {
    this.name = pieces[0];
    this.mpg = s.float(pieces[1]);
    this.cylinders = s.int(pieces[2]);
    this.displacement = s.float(pieces[3]);
    this.horsepower = s.float(pieces[4]);
    this.weight = s.float(pieces[5]);
    this.acceleration = s.float(pieces[6]);
    this.year = s.int(pieces[7]);
    this.origin = s.float(pieces[8]);
  }
}
