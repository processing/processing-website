import processing.sound.*;
SoundFile file;

void setup() {
  size(640, 360);
  background(255);
    
  // Load a soundfile from the data folder of the sketch and get the duration of the file
  file = new SoundFile(this, "sample.mp3");
  println("Duration= " + file.duration() + " seconds");
}      

void draw() {
}
