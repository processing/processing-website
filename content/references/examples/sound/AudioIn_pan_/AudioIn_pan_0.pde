import processing.sound.*;
AudioIn in;

void setup() {
  size(640, 360);
  background(255);
    
  // Create the Input stream
  in = new AudioIn(this, 0);
  in.play();
  in.amp(0.5);
}      

void draw() {
  // Map mouseX from -1.0 to 1.0 for left to right
  in.pan(map(mouseX, 0, width, -1.0, 1.0));
}

