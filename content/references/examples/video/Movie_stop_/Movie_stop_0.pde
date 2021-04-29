import processing.video.*;
Movie myMovie;

void setup() {
  size(200, 200);
  background(0);
  myMovie = new Movie(this, "totoro.mov");
  myMovie.play();
}

void draw() {
  background(255);
  image(myMovie, 0, 0);
}

void movieEvent(Movie m) {
  m.read();
}

// Stops the movie playback when the mouse pressed
void mousePressed() {
  myMovie.stop();
}

