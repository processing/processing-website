float[] distribution = new float[360];

void setup() {
  size(100, 100);
  for (int i = 0; i < distribution.length; i++) {
    distribution[i] = int(randomGaussian() * 15);
  }
}

void draw() {
  background(204);
  
  translate(width/2, width/2);

  for (int i = 0; i < distribution.length; i++) {
    rotate(TWO_PI/distribution.length);
    stroke(0);
    float dist = abs(distribution[i]);
    line(0, 0, dist, 0);
  }
}