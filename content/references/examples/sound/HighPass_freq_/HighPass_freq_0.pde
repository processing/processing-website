import processing.sound.*;

WhiteNoise noise;
HighPass highPass;

float freq=2500;

void setup() {
  size(640,360);
  background(255);
    
  // Create a noise generator and a highpass filter
  noise = new WhiteNoise(this);
  highPass = new HighPass(this);
    
  noise.play(0.5);
  highPass.process(noise);

  // Change the cutoff frequency of the filter
  highPass.freq(freq);
}      

void draw() {
}
