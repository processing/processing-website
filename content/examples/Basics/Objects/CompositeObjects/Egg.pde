class Egg {
  float x, y; // X-coordinate, y-coordinate
  float tilt; // Left and right angle offset
  float angle; // Used to define the tilt
  float scalar; // Height of the egg
  float range;

  // Constructor
  Egg(float xpos, float ypos, float r, float s) {
    x = xpos;
    y = ypos;
    tilt = 0;
    scalar = s / 100.0;
    range = r;
  }

  void wobble() {
    tilt = cos(angle) / range;
    angle += 0.1;
    //print (angle + "-");
  }

  void display() {
    noStroke();
    fill(255);
    pushMatrix();
    translate(x, y);
    rotate(tilt);
    scale(scalar);
    beginShape();
    vertex(0, -100);
    bezierVertex(25, -100, 40, -65, 40, -40);
    bezierVertex(40, -15, 25, 0, 0, 0);
    bezierVertex(-25, 0, -40, -15, -40, -40);
    bezierVertex(-40, -65, -25, -100, 0, -100);
    endShape();
    popMatrix();
  }
}