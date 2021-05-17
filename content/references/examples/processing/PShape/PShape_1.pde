PShape square;  // The PShape object

void setup() {  
  size(100, 100);
  // Creating the PShape as a square. The corner 
  // is 0,0 so that the center is at 40,40 
  square = createShape(RECT, 0, 0, 80, 80);
}

void draw() {
  shape(square, 10, 10);
}
