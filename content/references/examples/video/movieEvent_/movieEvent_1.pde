import processing.video.*;

Movie myMovie, yourMovie;

void setup() {
  size(200, 200);
  myMovie = new Movie(this, "totoro.mov");
  yourMovie = new Movie(this, "catbus.mov");
  myMovie.play();
  yourMovie.play();
}

void draw() {
  image(myMovie, 0, 0);
  image(yourMovie, 100, 0);  
}

void movieEvent(Movie m) {
  if (m == myMovie) {
    myMovie.read();
  } else if (m == yourMovie) {
    yourMovie.read();
  }
}

