PrintWriter output;

void setup() {
  // Create a new file in the sketch directory
  output = createWriter("positions.txt"); 
}

void draw() {
  point(mouseX, mouseY);
  output.println(mouseX);  // Write the coordinate to the file
}

void keyPressed() {
  output.flush();  // Writes the remaining data to the file
  output.close();  // Finishes the file
  exit();  // Stops the program
}
