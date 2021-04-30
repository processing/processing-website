PImage bigImage;
 
void setup() {
  bigImage = requestImage("something.jpg");
}
 
void draw() {
  if (bigImage.width == 0) {
    // Image is not yet loaded
  } else if (bigImage.width == -1) {
    // This means an error occurred during image loading
  } else {
    // Image is ready to go, draw it
    image(bigImage, 0, 0);
  }
}
