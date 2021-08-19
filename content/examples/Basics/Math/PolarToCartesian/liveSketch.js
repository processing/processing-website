/**
 * PolarToCartesian
 * by Daniel Shiffman.
 *
 * Convert a polar coordinate (r,theta) to cartesian (x,y):
 * x = r * cos(theta)
 * y = r * sin(theta)
 */

function runLiveSketch(s) {
  var r;

  // Angle and angular velocity, accleration
  var theta;
  var theta_vel;
  var theta_acc;

  s.setup = () => {
    s.createCanvas(640, 360);

    // Initialize all values
    r = s.height * 0.45;
    theta = 0;
    theta_vel = 0;
    theta_acc = 0.0001;
  };

  s.draw = () => {
    s.background(0);

    // Translate the origin point to the center of the screen
    s.translate(s.width / 2, s.height / 2);

    // Convert polar to cartesian
    var x = r * s.cos(theta);
    var y = r * s.sin(theta);

    // Draw the ellipse at the cartesian coordinate
    s.ellipseMode(s.CENTER);
    s.noStroke();
    s.fill(200);
    s.ellipse(x, y, 32, 32);

    // Apply acceleration and velocity to angle (r remains static in this example)
    theta_vel += theta_acc;
    theta += theta_vel;
  };
}
