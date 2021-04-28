import processing.sound.*;
AudioSample sample;

void setup() {
  size(640, 360);
  background(255);

  sample = new AudioSample(this, 100000);

  // Fill it with random numbers (which will make it sound like white noise)
  for (int i = 0; i < sample.frames(); i++) {
    sample.write(i, random(-100, 100));
  }
  sample.loop();
}

void draw() {
  float a = map(mouseX, 0, width, 0.01, 1.0);
  sample.amp(a);
}
