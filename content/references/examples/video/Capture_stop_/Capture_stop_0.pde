import processing.video.*; 
Capture cam; 
 
void setup() { 
  size(200, 200); 
  cam = new Capture(this);
  cam.start(); 
} 
 
void draw() { 
  if (cam.available()) { 
    // Reads the new frame
    cam.read(); 
  } 
  image(cam, 0, 0); 
} 

void mousePressed() {
  cam.stop();
}

