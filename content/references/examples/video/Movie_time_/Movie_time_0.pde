import processing.video.*;
Movie myMovie;

void setup() {
  size(200, 200);
  frameRate(30);
  myMovie = new Movie(this, "totoro.mov");
  myMovie.loop();
}

void draw() {
  background(255);
  if (myMovie.available()) {
    myMovie.read();
  }
  image(myMovie, 0, 0);
  // Draws a line on the screen
  // when the movie half-finished
  float md = myMovie.duration();
  float mt = myMovie.time();
  if (mt > md/2.0) {
    line(0, 0, width, height);
  }
}

