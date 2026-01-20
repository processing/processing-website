/**
 * Create Graphics.
 *
 * The createGraphics() function creates an object from the PGraphics class
 * PGraphics is the main graphics and rendering context for Processing.
 * The beginDraw() method is necessary to prepare for drawing and endDraw() is
 * necessary to finish. Use this class if you need to draw into an off-screen
 * graphics buffer or to maintain two contexts with different properties.
 */

function runLiveSketch(s) {
  var pg;

  s.setup = () => {
    s.createCanvas(640, 360);
    pg = s.createGraphics(400, 200);
  };

  s.draw = () => {
    s.fill(0, 12);
    s.rect(0, 0, s.width, s.height);
    s.fill(255);
    s.noStroke();
    s.ellipse(s.mouseX, s.mouseY, 60, 60);

    pg.background(51);
    pg.noFill();
    pg.stroke(255);
    pg.ellipse(s.mouseX - 120, s.mouseY - 60, 60, 60);

    // Draw the offscreen buffer to the screen with image()
    s.image(pg, 120, 60);
  };
}
