import processing.sound.*;
SoundFile file;

void setup() {
  size(640, 360);
  background(255);
    
  // Load a MONO soundfile from the data folder of the sketch and play it back
  file = new SoundFile(this, "sample.mp3");
  file.play();
}      

void draw() {
  // Map mouseX from -1.0 to 1.0 for left to right
  file.pan(map(mouseX, 0, width, -1.0, 1.0));
}
