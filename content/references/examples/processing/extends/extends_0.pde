DrawDot dd1 = new DrawDot(50, 80);

void setup() { 
  size(200, 200);
} 
 
void draw() {
  dd1.display();
} 
 
class Dot { 
  int xpos, ypos;
} 

class DrawDot extends Dot {
  DrawDot(int x, int y) {
    xpos = x;
    ypos = y;
  }
  void display() {
    ellipse(xpos, ypos, 200, 200);
  }
}
