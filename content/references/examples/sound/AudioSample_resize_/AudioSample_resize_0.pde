import processing.sound.*;
AudioSample sample;

void setup() {
  size(640, 360);
  background(255);

  // Create a new audiosample
  sample = new AudioSample(this, 100000, 22050);

  // ... do something with the audiosample ...

  // Change to a 100.000 frames but in stereo
  file.resize(100000, true);
}      

void draw() {
}
