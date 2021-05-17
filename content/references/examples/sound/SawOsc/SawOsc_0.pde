import processing.sound.*;
SawOsc saw;

void setup() {
  size(640, 360);
  background(255);
    
  // Create square wave oscillator.
  saw = new SawOsc(this);
  saw.play();
}

void draw() {
	//the image is just for informative purposes
	//on how the soundwave looks
}

