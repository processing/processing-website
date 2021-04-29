import processing.sound.*;

AudioIn in;
Reverb reverb;

void setup() {
  size(640,360);
  background(255);
        
  // create the input stream
  in = new AudioIn(this, 0);
    
  // create a reverb effect
  reverb = new Reverb(this);
    
  // start the input stream
  in.play();

  // Patch the reverb
  reverb.process(in);
  reverb.damp(0.5);
}      

void draw() {
}

