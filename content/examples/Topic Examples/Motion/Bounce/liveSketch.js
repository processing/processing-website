/**
 * Bounce.
 *
 * When the shape hits the edge of the window, it reverses its direction.
 */
function runLiveSketch(s) {
  var rad = 60; // Width of the shape
  var xpos, ypos; // Starting position of shape

  var xspeed = 2.8; // Speed of the shape
  var yspeed = 2.2; // Speed of the shape

  var xdirection = 1; // Left or Right
  var ydirection = 1; // Top to Bottom

  s.setup = () => {
    s.createCanvas(640, 360);
    s.noStroke();
    s.frameRate(30);
    s.ellipseMode(s.RADIUS);
    // Set the starting position of the shape
    xpos = s.width / 2;
    ypos = s.height / 2;
  };

  s.draw = () => {
    s.background(102);

    // Update the position of the shape
    xpos = xpos + xspeed * xdirection;
    ypos = ypos + yspeed * ydirection;

    // Test to see if the shape exceeds the boundaries of the screen
    // If it does, reverse its direction by multiplying by -1
    if (xpos > s.width - rad || xpos < rad) {
      xdirection *= -1;
    }
    if (ypos > s.height - rad || ypos < rad) {
      ydirection *= -1;
    }

    // Draw the shape
    s.ellipse(xpos, ypos, rad, rad);
  };
}
