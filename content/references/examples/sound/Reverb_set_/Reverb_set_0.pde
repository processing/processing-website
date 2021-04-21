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
  reverb.room(0.5);
  reverb.damp(0.1);
  reverb.wet(0.7);
}      

void draw() {
}

void mousePressed() {
  float room=0.2;
  float damp=0.3;
  float wet=0.3;
  reverb.set(room, damp, wet);
}

