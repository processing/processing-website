import processing.sound.*;

SawOsc saw;
AllPass allPass;

void setup() {
  size(100, 100);

  // Create a sawtooth wave and an AllPass filter
  saw = new SawOsc(this);
  saw.freq(200);
  allPass = new AllPass(this);

  // Start the saw wave and push it through the allpass
  saw.play();
  allPass.process(saw);
}

void draw() {
  // Set the drive of the allPass with the mouse
  float g = map(mouseX, 0, width, 0, 1);
  allPass.gain(g);
  background(g * 255, 0, 0);
}
