float angle;

void setup() {
 size(400, 400, P3D);
 noStroke();
}

void draw() {
 background(0);

 pointLight(200, 200, 200, width/2, height/2, -200);

 translate(width/2, height/2);
 rotateY(angle);

 beginShape(QUADS);
 normal(0, 0, 1);
 fill(50, 50, 200);

 // A scalar attribute named brightness, affecting the next two vertices
 attrib("brightness", 0.1);

 // A vector attribute named tangent, affecting the first vertex
 attrib("tangent", 0.1, 0.8, 0.1);
 vertex(-100, 100);
 // Another tangent vector, affecting the second vertex
 attrib("tangent", -0.3, 1, 0);
 vertex(100, 100);
 fill(200, 50, 50);

 // A new brightness value, affecting the last two vertices
 attrib("brightness", 0.5);

 attrib("tangent", 0.5, 0.5, 0.1);
 vertex(100, -100);
 attrib("tangent", 0.1, -0.9, 0);
 vertex(-100, -100);
 endShape();

 angle += 0.01;
}
