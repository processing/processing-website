import processing.sound.*;
AudioSample sample;

void setup() {
  size(640, 360);
  background(255);

  // Create a new audiosample
  sample = new AudioSample(this, 100000, 22050);

  // Read some data from it (the following calls are just for demonstration,
  // a freshly initiated audiosample actually contains nothing but zeros)

  // Read the very first frame:
  float frame = sample.read(0);

  // Read the entire sample
  float[] sampleContent = new float[100000];
  sample.read(sampleContent);

  // Read only a part of the sample data
  float[] subSample = new float[50000];
  // Read 500000 frames, starting at frame 30000
  sample.read(30000, subSample, 0, 50000);
}      

void draw() {
}
