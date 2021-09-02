/**
 * L-Sistema Copo de Nieve de Penrose
 * por Geraldine Sarmiento.
 *
 * Este ejemplo esta basado en la clase de L-Sistemas de Patrick Dwyer
 */

PenroseSnowflakeLSystem ps;

void setup() {
  size(640, 360);
  stroke(255);
  noFill();
  ps = new PenroseSnowflakeLSystem();
  ps.simulate(4);
}

void draw() {
  background(0);
  ps.render();
}


