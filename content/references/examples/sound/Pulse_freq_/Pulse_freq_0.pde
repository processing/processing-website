import processing.sound.*;
Pulse pulse;

void setup() {
  size(640, 360);
  background(255);
    
  // Create the pulse oscillator
  pulse = new Pulse(this);
  pulse.play();
  pulse.freq(200);
}      

void draw() {
}

