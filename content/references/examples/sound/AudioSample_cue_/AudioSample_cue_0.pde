import processing.sound.*;
AudioSample sample;

void setup() {
  size(640, 360);
  background(255);

  // Create a new audiosample
  sample = new AudioSample(this, 100000, 22050);
  file.cue(3.5);
  file.play();
}      

void draw() {
}
