/**
 * Forces (Gravity and Fluid Resistence) with Vectors
 * by Daniel Shiffman.
 *
 * Demonstration of multiple forces acting on bodies.
 * Bodies experience gravity continuously and fluid
 * resistance when in "water".
 */

// Five moving bodies
Mover[] movers = new Mover[10];

// Liquid
Liquid liquid;

void setup() {
  size(640, 360);
  reset();
  // Create liquid object
  liquid = new Liquid(0, height/2, width, height/2, 0.1);
}

void draw() {
  background(0);

  // Draw water
  liquid.display();

  for (Mover mover : movers) {

    // Is the Mover in the liquid?
    if (liquid.contains(mover)) {
      // Calculate drag force
      PVector drag = liquid.drag(mover);
      // Apply drag force to Mover
      mover.applyForce(drag);
    }

    // Gravity is scaled by mass here!
    PVector gravity = new PVector(0, 0.1*mover.mass);
    // Apply gravity
    mover.applyForce(gravity);

    // Update and display
    mover.update();
    mover.display();
    mover.checkEdges();
  }

  fill(255);
  text("click mouse to reset", 10, 30);
}

void mousePressed() {
  reset();
}

// Restart all the Mover objects randomly
void reset() {
  for (int i = 0; i < movers.length; i++) {
    movers[i] = new Mover(random(0.5, 3), 40+i*70, 0);
  }
}
