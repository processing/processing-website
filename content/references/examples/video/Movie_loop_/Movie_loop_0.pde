import processing.video.*;
Movie myMovie;

void setup() {
  size(200, 200);
  myMovie = new Movie(this, "totoro.mov");
  myMovie.loop();
}

void draw() {
  image(myMovie, 0, 0);
}

void movieEvent(Movie m) {
  m.read();
}

