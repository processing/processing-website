interface Dot {
  void move();
  void display();
}

class CircleDot implements Dot {
  float x = 50;
  float y = 50;

  void move() {
    x = x + random(-1, 1);
  }

  void display() {
    ellipse(x, y, 16, 16);
  }
}

class SquareDot implements Dot {
  float x = 50;
  float y = 50;


  void move() {
    y = y + random(-1, 1);
  }

  void display() {
    rect(x, y, 16, 16);
  }
}
