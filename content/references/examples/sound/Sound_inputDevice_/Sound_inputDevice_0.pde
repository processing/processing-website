import processing.sound.*;

void setup() {
  // Create a Sound object and select the second sound device (device ids start at 0) for input
  Sound s = new Sound(this);
  s.inputDevice(1);

  // Now get the first audio input channel from that sound device (ids again start at 0)
  AudioIn in = new AudioIn(this, 0);
}
