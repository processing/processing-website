import processing.video.*; 
Capture cam; 
 
void setup() { 
  size(200, 200); 
  cam = new Capture(this);
  cam.start(); 
} 
 
void draw() { 
  image(cam, 0, 0); 
} 

void captureEvent(Capture c) {
  c.read();
}
