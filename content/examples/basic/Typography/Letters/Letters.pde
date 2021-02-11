/**
 * Letters. 
 * 
 * Draws letters to the screen. This requires loading a font, 
 * setting the font, and then drawing the letters.
 */

PFont f;

void setup() {
  size(1280, 720);
  background(0);

  // Create the font
  printArray(PFont.list());
  f = createFont("SpaceMono-Regular.ttf", 52);
  textFont(f);
  textAlign(CENTER, CENTER);
} 

void draw() {
  background(0);

  // Set the left and top margin
  int margin = 10;
  translate(margin*4, margin*4);

  int gap = 90;
  int counter = 35;
  
  for (int y = gap/2; y < height-gap; y += gap) {
    for (int x = gap/2; x < width-gap; x += gap) {

      char letter = char(counter);
      
      if (letter == 'A' || letter == 'E' || letter == 'I' || letter == 'O' || letter == 'U') {
        fill(255, 204, 0);
      } 
      else {
        fill(255);
      }

      // Draw the letter to the screen
      text(letter, x, y);

      // Increment the counter
      counter++;
    }
  }
}