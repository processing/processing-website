import processing.video.*;
Movie myMovie;

void setup() {
  size(200, 200);
  background(0);
  // "this" references the Processing sketch
  myMovie = new Movie(this, "totoro.mov");
  myMovie.loop();
}

void draw() {
  if (myMovie.available()) {
    myMovie.read();
  }
  image(myMovie, 0, 0);
}

