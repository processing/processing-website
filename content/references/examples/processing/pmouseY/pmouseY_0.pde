// Move the mouse quickly to see the difference 
// between the current and previous position 
void draw() { 
  background(204); 
  line(20, mouseY, 80, pmouseY); 
  println(mouseY + " : " + pmouseY);
} 
