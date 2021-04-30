// Move the mouse quickly to see the difference 
// between the current and previous position 
void draw() { 
  background(204); 
  line(mouseX, 20, pmouseX, 80); 
  println(mouseX + " : " + pmouseX);
} 
