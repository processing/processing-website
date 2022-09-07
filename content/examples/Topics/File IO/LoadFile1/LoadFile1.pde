/**
 * LoadFile 1
 * 
 * Loads a text file that contains two numbers separated by a tab ('\t').
 * A new pair of numbers is loaded each frame and used to draw a point on the screen.
 */

String[] lines;
int index = 0;

void setup() {
  size(640, 360);
  background(0);
  stroke(255);
  frameRate(12);
  lines = loadStrings("positions.txt");
}

void draw() {
  if (index < lines.length) {
    String[] pieces = split(lines[index], '\t');
    if (pieces.length == 2) {
      // Scale the coordinates to match the size of the sketch window
      float x = map(float(pieces[0]),0,100,0,width);
      float y = map(float(pieces[1]),0,100,0,height);
      point(x, y);
    }
    // Go to the next line for the next run through draw()
    index = index + 1;
  }
}
