import processing.sound.*;
SinOsc sine;

void setup() {
  size(640, 360);
  background(255);
    
  // Create the sine oscillator.
  sine = new SinOsc(this);
  sine.play();
}

void draw() {
	//the image is just for informative purposes
	//on how the soundwave looks
}

