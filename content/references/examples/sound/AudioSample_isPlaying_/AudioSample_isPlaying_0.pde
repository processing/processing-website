import processing.sound.*;
AudioSample sample;

void setup() {
  size(640, 360);
  background(255);

  // Create a new audiosample and play it
  sample = new AudioSample(this, 100000);
  sample.play();

  int i = 0;
  while (true) {
    delay(1000);
    if (sample.isPlaying()) {
      i++;
      println("Sample is still playing after " + i + " seconds");
    } else {
      break;
    }
  }
  println("Sample finished playing!");
}      
