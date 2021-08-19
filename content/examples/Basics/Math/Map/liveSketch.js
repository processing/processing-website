/**
 * Map.
 *
 * Use the map() function to take any number and scale it to a new number
 * that is more useful for the project that you are working on. For example, use the
 * numbers from the mouse position to control the size or color of a shape.
 * In this example, the mouse’s x-coordinate (numbers between 0 and 360) are scaled to
 * new numbers to define the color and size of a circle.
 */
function runLiveSketch(s) {
  s.setup = () => {
    s.createCanvas(640, 360);
    s.noStroke();
  };

  s.draw = () => {
    s.background(0);
    // Scale the mouseX value from 0 to 640 to a range between 0 and 175
    var c = s.map(s.mouseX, 0, s.width, 0, 175);
    // Scale the mouseX value from 0 to 640 to a range between 40 and 300
    var d = s.map(s.mouseX, 0, s.width, 40, 300);
    s.fill(255, c, 0);
    s.ellipse(s.width / 2, s.height / 2, d, d);
  };
}
