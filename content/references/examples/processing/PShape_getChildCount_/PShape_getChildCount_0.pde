PShape states;

void setup() {
  size(100, 100);
  states = loadShape("tristate.svg");
  int count = states.getChildCount();
  println(count);
}
