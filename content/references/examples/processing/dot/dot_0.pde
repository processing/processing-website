// Declare and construct two objects (h1 and h2) of the class HLine
HLine h1 = new HLine(20, 1.0);
HLine h2 = new HLine(50, 5.0);

void setup() {
  size(200, 200);
}

void draw() {
  if (h2.speed > 1.0) {  // Dot syntax can be used to get a value
    h2.speed -= 0.01;    // or set a value.
  }
  h1.update();  // Calls the h1 object's update() function
  h2.update();  // Calls the h2 object's update() function
}

class HLine {  // Class definition
  float ypos, speed;  // Data
  HLine (float y, float s) {  // Object constructor
    ypos = y;
    speed = s;
  }
  void update() {  // Update method
    ypos += speed;
    if (ypos > width) {
      ypos = 0;
    }
    line(0, ypos, width, ypos);
  }
}
