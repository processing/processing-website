import processing.sound.*;

WhiteNoise noise;
LowPass lowPass;

void setup() {
  size(640,360);
  background(255);
    
  // Create a noise generator and a bandpass filter
  noise = new WhiteNoise(this);
  lowPass = new LowPass(this);    

  // start the noise generator and the filter
  noise.play(0.5);
  lowPass.process(noise);
}      

void draw() {
}
