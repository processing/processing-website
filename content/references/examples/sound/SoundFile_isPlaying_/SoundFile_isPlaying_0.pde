import processing.sound.*;
SoundFile file;

void setup() {
  size(640, 360);
  background(255);

  // Load a soundfile from the /data folder of the sketch and play it back
  file = new SoundFile(this, "sample.wav");
  file.play();

  int i = 0;
  while (true) {
    delay(1000);
    if (file.isPlaying()) {
      i++;
      println("File is still playing after " + i + " seconds");
    } else {
      break;
    }
  }
  println("Soundfile finished playing!");
}      
