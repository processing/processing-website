PImage tower;

void setup() {
  size(400, 400);
  tower = loadImage("tower.jpg");
  color black = color(0);
  
  tower.set(240, 160, black); 
  tower.set(340, 160, black); 
  tower.set(340, 600, black); 
  tower.set(240, 600, black); 
}

void draw() {
  image(tower, 0, 0);
}