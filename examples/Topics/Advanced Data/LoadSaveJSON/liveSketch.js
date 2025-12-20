/**
 * Loading XML Data
 * by Daniel Shiffman.
 *
 * This example demonstrates how to use loadJSON()
 * to retrieve data from a JSON file and make objects
 * from that data.
 *
 * Here is what the JSON looks like (partial):
 *
 {
 "bubbles": [
 {
 "position": {
 "x": 160,
 "y": 103
 },
 "diameter": 43.19838,
 "label": "Happy"
 },
 {
 "position": {
 "x": 372,
 "y": 137
 },
 "diameter": 52.42526,
 "label": "Sad"
 }
 ]
 }
 */

function runLiveSketch(s) {
  // An Array of Bubble objects
  var bubbles;
  // A JSON object
  var json;

  s.preload = () => {
    json = s.loadJSON('/data.json');
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
    //
    s.textAlign(s.LEFT);
    s.fill(0);
    s.noStroke();
    s.text('Click to add bubbles.', 10, s.height - 10);
  };
  function loadData() {
    // Load JSON file
    // Temporary full path until path problem resolved.

    var bubbleData = json.bubbles;

    // The size of the array of Bubble objects is determined by the total XML elements named "bubble"
    bubbles = [];

    for (var i = 0; i < bubbleData.length; i++) {
      // Get each object in the array
      var bubble = bubbleData[i];
      // Get a position object
      var position = bubble.position;
      // Get x,y from position
      var x = position.x;
      var y = position.y;

      // Get diamter and label
      var diameter = bubble.diameter;
      var label = bubble.label;

      // Put object in array
      bubbles[i] = new Bubble(x, y, diameter, label);
    }
  }

  s.mousePressed = () => {
    // Create a new JSON bubble object
    var newBubble = {};

    // Create a new JSON position object
    var position = { x: s.mouseX, y: s.mouseY };

    // Add position to bubble
    newBubble.position = position;

    // Add diamater and label to bubble
    newBubble.diameter = s.random(40, 80);
    newBubble.label = 'New label';

    // Append the new JSON bubble object to the array
    var bubbleData = json.bubbles;
    bubbleData.push(newBubble);

    if (bubbleData.length > 10) {
      bubbleData.splice(0, 1);
    }

    // Save new data
    // saveJSONObject(json,"/data.json");
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
