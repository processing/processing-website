import processing.sound.*;
SoundFile file;

void setup() {
  size(640, 360);
  background(255);

  // Load a soundfile from the /data folder of the sketch and get the number of channels
  file = new SoundFile(this, "sample.mp3");
  println(file.channels());
}

void draw() {
}

