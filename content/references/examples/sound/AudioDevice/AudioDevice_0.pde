import processing.sound.*;
AudioDevice myAudioServer;

void setup() {
  size(200, 200);
  myAudioServer = new AudioDevice(this, 44100, 128);
}

void draw() {
}

