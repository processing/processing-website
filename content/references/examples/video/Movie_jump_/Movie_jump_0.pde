import processing.video.*;
Movie myMovie;

void setup() {
  size(200, 200);
  frameRate(30);
  myMovie = new Movie(this, "totoro.mov");
  myMovie.loop();
}

void draw() {
  if (myMovie.available()) {
    myMovie.read();
  }
  image(myMovie, 0, 0);
}

void mousePressed() {
  myMovie.jump(random(myMovie.duration()));
}

