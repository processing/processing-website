/**
 * Composite Objects
 * 
 * An object can include several other objects. Creating such composite objects 
 * is a good way to use the principles of modularity and build higher levels of 
 * abstraction within a program.
 */

EggRing er1, er2;


void setup() {
  size(640, 360);
  er1 = new EggRing(width*0.45, height*0.5, 2, 120);
  er2 = new EggRing(width*0.65, height*0.8, 10, 180);
}


void draw() {
  background(0);
  er1.transmit();
  er2.transmit();
}
