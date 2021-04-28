import processing.sound.*;
Pulse pulse;

void setup() {
  size(640, 360);
  background(255);
    
  // Create the pulse oscillator
  pulse = new Pulse(this);
  pulse.play();
}      

void draw() {
  // Map mouseX from -1.0 to 1.0 for left to right
  pulse.pan(map(mouseX, 0, width, -1.0, 1.0));
}

