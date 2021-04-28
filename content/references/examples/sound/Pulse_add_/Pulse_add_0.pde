import processing.sound.*;
Pulse pulse;

void setup() {
  size(640, 360);
  background(255);
    
  // Create the pulse oscillator
  pulse = new Pulse(this);
  pulse.play();
  pulse.add(0.5);
}      

void draw() {
}

