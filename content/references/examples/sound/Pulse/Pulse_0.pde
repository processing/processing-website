import processing.sound.*;
Pulse pulse;

void setup() {
  size(640, 360);
  background(255);
    
  // Create and start the sine oscillator.
  pulse = new Pulse(this);
    
  //Start the Pulse Oscillator. 
  pulse.play();
}

void draw() {
	//the image is just for informative purposes
	//on how the soundwave looks
}

