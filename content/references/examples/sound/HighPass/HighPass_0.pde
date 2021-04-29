import processing.sound.*;

WhiteNoise noise;
HighPass highPass;

float amp=0.0;

void setup() {
  size(640,360);
  background(255);
    
  // Create a noise generator and a bandpass filter
  noise = new WhiteNoise(this);
  highPass = new HighPass(this);
    
  noise.play(0.5);
  highPass.process(noise, 5000);
}      

void draw() {
}
