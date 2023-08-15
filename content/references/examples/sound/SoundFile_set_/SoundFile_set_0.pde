import processing.sound.*;
SoundFile file;

void setup() {
  size(640, 360);
  background(255);
    
  // Load a soundfile from the data folder of the sketch
  file = new SoundFile(this, "sample.mp3");
}      

void draw() {
}

void mousePressed() {
  float rate = 3;
  float pos = 0.5;
  float amp = 0.5;
  file.set(rate, pos, amp);
}

