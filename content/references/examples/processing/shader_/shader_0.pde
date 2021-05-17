PShader edges;  
PImage img;
    
void setup() {
  size(640, 360, P2D);
  img = loadImage("leaves.jpg");      
  edges = loadShader("edges.glsl");
}

void draw() {
  shader(edges);
  image(img, 0, 0);
}
