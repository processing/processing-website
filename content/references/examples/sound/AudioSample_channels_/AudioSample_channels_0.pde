import processing.sound.*;
AudioSample sample;

void setup() {
  size(640, 360);
  background(255);

  // Create a mono audiosample
  sample = new AudioSample(this, 100000);
  println("Number of channels: " + sample.channels());

  // Now create a stereo audiosample
  sample = new AudioSample(this, 100000, true);
  println("Number of channels: " + sample.channels());
}

void draw() {
}
