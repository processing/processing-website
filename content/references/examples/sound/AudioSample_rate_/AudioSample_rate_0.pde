import processing.sound.*;
AudioSample sample;

void setup() {
  size(640, 360);
  background(255);

  // Create an array and manually write a single sine wave oscillation into it.
  int resolution = 1000;
  float[] sinewave = new float[resolution];
  for (int i = 0; i < resolution; i++) {
    sinewave[i] = sin(TWO_PI*i/resolution);
  }

  // Create the audiosample based on the data, set framerate to play 200 oscillations/second
  sample = new AudioSample(this, sinewave, 200 * resolution);

  // Playing the sample at twice its normal playback speed, you will actually
  // hear a 400 Hz sound
  sample.rate(2);
  sample.loop();
}      

void draw() {
}
