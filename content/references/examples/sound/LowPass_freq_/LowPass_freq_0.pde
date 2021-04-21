import processing.sound.*;

WhiteNoise noise;
LowPass lowPass;

float freq=2500;

void setup() {
  size(640,360);
  background(255);
    
  // Create a noise generator and a lowpass filter
  noise = new WhiteNoise(this);
  lowPass = new LowPass(this);
    
  noise.play(0.5);
  lowPass.process(noise);

  // Change the cutoff frequency of the filter
  lowPass.freq(freq);
}      

void draw() {
}
