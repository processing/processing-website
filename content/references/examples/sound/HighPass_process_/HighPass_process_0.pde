import processing.sound.*;

WhiteNoise noise;
HighPass highPass;

void setup() {
  size(640,360);
  background(255);
    
  // Create a noise generator and a bandpass filter
  noise = new WhiteNoise(this);
  highPass = new HighPass(this);    

  // start the noise generator and the filter
  noise.play(0.5);
  highPass.process(noise);
}      

void draw() {
}
