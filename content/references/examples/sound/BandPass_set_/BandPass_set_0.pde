import processing.sound.*;

WhiteNoise noise;
BandPass bandPass;

void setup() {
  size(640,360);
  background(255);
    
  // Create a noise generator and a bandpass filter
  noise = new WhiteNoise(this);
  bandPass = new BandPass(this);    

  // start the noise generator and the filter
  noise.play(0.5);
  bandPass.process(noise);
}      

void draw() {
}

void mousePressed() {
  float freq=1000;
  float bw=80;
  bandPass.set(freq, bw);
}

