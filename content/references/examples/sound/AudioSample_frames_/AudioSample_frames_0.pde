import processing.sound.*;
AudioSample sample;

void setup() {
  size(640, 360);
  background(255);

  // Create an audiosample
  sample = new AudioSample(this, 100000);
  println("Number of audio frames: " + sample.frames());
}

void draw() {
}
