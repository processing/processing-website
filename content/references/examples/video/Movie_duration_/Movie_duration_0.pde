import processing.video.*;
Movie myMovie;

void setup() {
  size(200, 200);
  frameRate(30);
  myMovie = new Movie(this, "totoro.mov");
  myMovie.play();
  // Prints the duration of the movie
  println(myMovie.duration());
}

void draw() {
  if (myMovie.available()) {
    myMovie.read();
  }
  image(myMovie, 0, 0);
}

