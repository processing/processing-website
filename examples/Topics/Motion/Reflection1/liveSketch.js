/**
 * Non-orthogonal Reflection
 * by Ira Greenberg.
 *
 * Based on the equation (R = 2N(N*L)-L) where R is the
 * reflection vector, N is the normal, and L is the incident
 * vector.
 */

function runLiveSketch(s) {
  // Position of left hand side of floor
  var base1;
  // Position of right hand side of floor
  var base2;
  // Length of floor
  var baseLength;

  // An array of subpoints along the floor path
  var coords = [];

  // Variables related to moving ball
  var position;
  var velocity;
  var r = 6;
  var speed = 3.5;

  s.setup = () => {
    s.createCanvas(640, 360);

    s.fill(128);
    base1 = s.createVector(0, s.height - 150);
    base2 = s.createVector(s.width, s.height);
    createGround();

    // start ellipse at middle top of screen
    position = s.createVector(s.width / 2, 0);

    // calculate initial random velocity
    velocity = p5.Vector.random2D();
    velocity.mult(speed);
  };

  s.draw = () => {
    // draw background
    s.fill(0, 12);
    s.noStroke();
    s.rect(0, 0, s.width, s.height);

    // draw base
    s.fill(200);
    s.quad(base1.x, base1.y, base2.x, base2.y, base2.x, s.height, 0, s.height);

    // calculate base top normal
    var baseDelta = p5.Vector.sub(base2, base1);
    baseDelta.normalize();
    var normal = new p5.Vector(-baseDelta.y, baseDelta.x);

    // draw ellipse
    s.noStroke();
    s.fill(255);
    s.ellipse(position.x, position.y, r * 2, r * 2);

    // move elipse
    position.add(velocity);

    // normalized incidence vector
    var incidence = p5.Vector.mult(velocity, -1);
    incidence.normalize();

    // detect and handle collision
    for (var i = 0; i < coords.length; i++) {
      // check distance between ellipse and base top coordinates
      if (p5.Vector.dist(position, coords[i]) < r) {
        // calculate dot product of incident vector and base top normal
        var dot = incidence.dot(normal);

        // calculate reflection vector
        // assign reflection vector to direction vector
        velocity.set(
          2 * normal.x * dot - incidence.x,
          2 * normal.y * dot - incidence.y,
          0
        );
        velocity.mult(speed);

        // draw base top normal at collision point
        s.stroke(255, 128, 0);
        s.line(
          position.x,
          position.y,
          position.x - normal.x * 100,
          position.y - normal.y * 100
        );
      }
    }

    // detect boundary collision
    // right
    if (position.x > s.width - r) {
      position.x = s.width - r;
      velocity.x *= -1;
    }
    // left
    if (position.x < r) {
      position.x = r;
      velocity.x *= -1;
    }
    // top
    if (position.y < r) {
      position.y = r;
      velocity.y *= -1;
      // randomize base top
      base1.y = s.random(s.height - 100, s.height);
      base2.y = s.random(s.height - 100, s.height);
      createGround();
    }
  };

  // Calculate variables for the ground
  function createGround() {
    // calculate length of base top
    baseLength = p5.Vector.dist(base1, base2);

    // fill base top coordinate array
    coords = new Array(s.ceil(baseLength));
    for (var i = 0; i < coords.length; i++) {
      coords[i] = new p5.Vector();
      coords[i].x = base1.x + ((base2.x - base1.x) / baseLength) * i;
      coords[i].y = base1.y + ((base2.y - base1.y) / baseLength) * i;
    }
  }
}
