import processing.video.*;
Movie myMovie;

void setup() {
  size(200, 200);
  background(0);
  myMovie = new Movie(this, "totoro.mov");
  myMovie.loop();
}

void draw() {
  background(255);
  image(myMovie, 0, 0);
}

void movieEvent(Movie m) {
  m.read();
}

void mousePressed() {
  myMovie.pause();
}

void mouseReleased() {
  myMovie.play();
}

