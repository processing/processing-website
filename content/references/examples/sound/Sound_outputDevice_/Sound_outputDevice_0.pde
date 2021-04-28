import processing.sound.*;

void setup() {
  // Create a Sound object and select the second sound device (device ids start at 0) for output
  Sound s = new Sound(this);
  s.outputDevice(1);
}
