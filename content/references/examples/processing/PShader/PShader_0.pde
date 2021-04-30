PShader blur;

void setup() {
  size(640, 360, P2D);
  // Shaders files must be in the "data" folder to load correctly
  blur = loadShader("blur.glsl"); 
  stroke(0, 102, 153);
  rectMode(CENTER);
}

void draw() {
  filter(blur);  
  rect(mouseX-75, mouseY, 150, 150); 
  ellipse(mouseX+75, mouseY, 150, 150);
}
