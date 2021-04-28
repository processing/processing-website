import processing.sound.*;
AudioSample sample;

void setup() {
  size(640, 360);
  background(255);

  // Create a MONO audiosample and play it back
  sample = new AudioSample(this, 100000, 22050);
  sample.play();
}      

void draw() {
  // Map mouseX from -1.0 to 1.0 for left to right
  sample.pan(map(mouseX, 0, width, -1.0, 1.0));
}
