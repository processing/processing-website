import processing.sound.*;
Sound s;

void setup() {
  size(200, 200);

  // Create a Sound object for controlling the synthesis engine sample rate.
  s = new Sound(this);
  s.sampleRate(22050);
}
