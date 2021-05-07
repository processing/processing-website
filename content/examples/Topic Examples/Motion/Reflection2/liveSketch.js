/**
 * Non-orthogonal Collision with Multiple Ground Segments
 * by Ira Greenberg.
 *
 * Based on Keith Peter's Solution in
 * Foundation Actionscript Animation: Making Things Move!
 */

function runLiveSketch(s) {
  var orb;

  var gravity;
  // The ground is an array of "Ground" objects
  var segments = 40;
  var ground = new Array(segments);

  s.setup = () => {
    s.createCanvas(640, 360);
    gravity = s.createVector(0, 0.05);
    // An orb object that will fall and bounce around
    orb = new Orb(50, 50, 3);

    // Calculate ground peak heights
    var peakHeights = new Array(segments + 1);
    for (var i = 0; i < peakHeights.length; i++) {
      peakHeights[i] = s.random(s.height - 40, s.height - 30);
    }

    // Float value required for segment width (segs)
    // calculations so the ground spans the entire
    // display window, regardless of segment number.
    var segs = segments;
    for (var i = 0; i < segments; i++) {
      ground[i] = new Ground(
        (s.width / segs) * i,
        peakHeights[i],
        (s.width / segs) * (i + 1),
        peakHeights[i + 1]
      );
    }
  };

  s.draw = () => {
    // Background
    s.noStroke();
    s.fill(0, 15);
    s.rect(0, 0, s.width, s.height);

    // Move and display the orb
    orb.move();
    orb.display();
    // Check walls
    orb.checkWallCollision();

    // Check against all the ground segments
    for (var i = 0; i < segments; i++) {
      orb.checkGroundCollision(ground[i]);
    }

    // Draw ground
    s.fill(127);
    s.beginShape();
    for (var i = 0; i < segments; i++) {
      s.vertex(ground[i].x1, ground[i].y1);
      s.vertex(ground[i].x2, ground[i].y2);
    }
    s.vertex(ground[segments - 1].x2, s.height);
    s.vertex(ground[0].x1, s.height);
    s.endShape(s.CLOSE);
  };

  function Orb(x, y, r_) {
    // Orb has positio and velocity
    this.position = s.createVector(x, y);
    this.velocity = s.createVector(0.5, 0);
    this.r = r_;
    // A damping of 80% slows it down when it hits the ground
    this.damping = 0.8;

    this.move = function () {
      // Move orb
      this.velocity.add(gravity);
      this.position.add(this.velocity);
    };

    this.display = function () {
      // Draw orb
      s.noStroke();
      s.fill(200);
      s.ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2);
    };

    // Check boundaries of window
    this.checkWallCollision = function () {
      if (this.position.x > s.width - this.r) {
        this.position.x = s.width - this.r;
        this.velocity.x *= -this.damping;
      } else if (this.position.x < this.r) {
        this.position.x = this.r;
        this.velocity.x *= -this.damping;
      }
    };

    this.checkGroundCollision = function (groundSegment) {
      // Get difference between orb and ground
      var deltaX = this.position.x - groundSegment.x;
      var deltaY = this.position.y - groundSegment.y;

      // Precalculate trig values
      var cosine = s.cos(groundSegment.rot);
      var sine = s.sin(groundSegment.rot);

      /* Rotate ground and velocity to allow
     orthogonal collision calculations */
      var groundXTemp = cosine * deltaX + sine * deltaY;
      var groundYTemp = cosine * deltaY - sine * deltaX;
      var velocityXTemp = cosine * this.velocity.x + sine * this.velocity.y;
      var velocityYTemp = cosine * this.velocity.y - sine * this.velocity.x;

      /* Ground collision - check for surface
     collision and also that orb is within
     left/rights bounds of ground segment */
      if (
        groundYTemp > -this.r &&
        this.position.x > groundSegment.x1 &&
        this.position.x < groundSegment.x2
      ) {
        // keep orb from going into ground
        groundYTemp = -this.r;
        // bounce and slow down orb
        velocityYTemp *= -1.0;
        velocityYTemp *= this.damping;
      }

      // Reset ground, velocity and orb
      deltaX = cosine * groundXTemp - sine * groundYTemp;
      deltaY = cosine * groundYTemp + sine * groundXTemp;
      this.velocity.x = cosine * velocityXTemp - sine * velocityYTemp;
      this.velocity.y = cosine * velocityYTemp + sine * velocityXTemp;
      this.position.x = groundSegment.x + deltaX;
      this.position.y = groundSegment.y + deltaY;
    };
  }

  // Constructor
  function Ground(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x = (x1 + x2) / 2;
    this.y = (y1 + y2) / 2;
    this.len = s.dist(x1, y1, x2, y2);
    this.rot = s.atan2(y2 - y1, x2 - x1);
  }
}
