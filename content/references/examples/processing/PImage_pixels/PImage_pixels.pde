PImage tower;

void setup() {
  size(400, 400);
  tower = loadImage("tower.jpg");
  int dimension = tower.width * tower.height;
  tower.loadPixels();
  for (int i = 0; i < dimension; i += 4) { 
    tower.pixels[i] = color(0, 0, 0); 
  } 
  tower.updatePixels();
}

void draw() {
  image(tower, 0, 0);
}
