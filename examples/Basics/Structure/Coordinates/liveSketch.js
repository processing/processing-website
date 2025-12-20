/**
 * Coordinates.
 *
 * All shapes drawn to the screen have a position that is
 * specified as a coordinate. All coordinates are measured
 * as the distance from the origin in units of pixels.
 * The origin [0, 0] is the coordinate is in the upper left
 * of the window and the coordinate in the lower right is
 * [s.width-1, s.height-1].
 */

function runLiveSketch(s) {
  s.setup = () => {
    // Sets the screen to be 640 pixels wide and 360 pixels high
    s.createCanvas(640, 360);

    // Set the background to black and turn off the fill color
    s.background(0);
    s.noFill();

    // The two parameters of the point() method each specify coordinates.
    // The first parameter is the x-coordinate and the second is the Y
    s.stroke(255);
    s.point(s.width * 0.5, s.height * 0.5);
    s.point(s.width * 0.5, s.height * 0.25);

    // Coordinates are used for drawing all shapes, not just points.
    // Parameters for different functions are used for different purposes.
    // For example, the first two parameters to line() specify
    // the coordinates of the first endpoint and the second two parameters
    // specify the second endpoint
    s.stroke(0, 153, 255);
    s.line(0, s.height * 0.33, s.width, s.height * 0.33);

    // By default, the first two parameters to rect() are the
    // coordinates of the upper-left corner and the second pair
    // is the s.width and s.height
    s.stroke(255, 153, 0);
    s.rect(s.width * 0.25, s.height * 0.1, s.width * 0.5, s.height * 0.8);
  };
}
