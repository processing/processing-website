PShader blur;
PImage img;

void setup() {
  size(400, 400, P2D);
  blur = loadShader("blur.glsl");
  img = loadImage("flower.jpg");
  image(img, 0, 0); 
}


void draw() {
  filter(blur); // Blurs more each time through draw()
}