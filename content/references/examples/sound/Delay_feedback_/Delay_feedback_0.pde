import processing.sound.*;

AudioIn in;
Delay delay;

void setup() {
  size(640,360);
  background(255);
        
  // create the input stream
  in = new AudioIn(this, 0);
    
  // create a delay effect
  delay = new Delay(this);
   
  // start the input stream
  in.play();

  // Patch the delay
  delay.process(in, 5);
  delay.time(0.5);
  delay.feedback(0.5);
}      

void draw() {
}

