PShape states;
PShape ohio;

void setup() {
  size(100, 100);
  states = loadShape("tristate.svg");
  ohio = states.getChild("OH");
  ohio.disableStyle();
}

void draw() {
  background(0);
  shape(states, -48, 5);
  fill(102, 0, 0);
  shape(ohio, -48, 5);
}
