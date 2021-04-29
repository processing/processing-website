import processing.sound.*;
AudioSample sample;

void setup() {
  size(640, 360);
  background(255);

  // Create a new audiosample
  sample = new AudioSample(this, 100000, 22050);

  // A freshly initiated audiosample contains nothing but zeros, so let's
  // write some data to it.
  for (int i = 0; i < sample.frames(); i++) {
    // Random numbers  will make it sound like white noise
    sample.write(i, random(-100, 100));
  }
  sample.play();
}      

void draw() {
}
