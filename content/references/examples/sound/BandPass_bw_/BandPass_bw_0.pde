import processing.sound.*;

WhiteNoise noise;
BandPass bandPass;

float freq=2500;
float bw=80;

void setup() {
  size(640,360);
  background(255);
    
  // Create a noise generator and a highpass filter
  noise = new WhiteNoise(this);
  bandPass = new BandPass(this);
    
  noise.play(0.5);
  bandPass.process(noise);

  // Change the cutoff frequency and bandwidth of the filter
  bandPass.bw(bw);
  bandPass.freq(freq);
}      

void draw() {
}
