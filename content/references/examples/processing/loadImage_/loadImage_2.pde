PImage webImg;

void setup() {
  String url = "https://processing.org/img/processing-web.png";
  // Load image from a web server
  webImg = loadImage(url, "png");
}

void draw() {
  background(0);
  image(webImg, 0, 0);
}