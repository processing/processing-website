/**
 * Constrain.
 *
 * Move the mouse across the screen to move the circle.
 * The program constrains the circle to its box.
 */

function runLiveSketch(s) {
  var mx = 0;
  var my = 0;
  var easing = 0.05;
  var radius = 24;
  var edge = 100;
  var inner = edge + radius;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.noStroke();
    s.ellipseMode(s.RADIUS);
    s.rectMode(s.CORNERS);
  };

  s.draw = () => {
    s.background(51);

    if (s.abs(s.mouseX - mx) > 0.1) {
      mx = mx + (s.mouseX - mx) * easing;
    }
    if (s.abs(s.mouseY - my) > 0.1) {
      my = my + (s.mouseY - my) * easing;
    }

    mx = s.constrain(mx, inner, s.width - inner);
    my = s.constrain(my, inner, s.height - inner);
    s.fill(76);
    s.rect(edge, edge, s.width - edge, s.height - edge);
    s.fill(255);
    s.ellipse(mx, my, radius, radius);
  };
}
