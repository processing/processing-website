// Press the mouse to hide the cursor
void draw() 
{
  if (mousePressed == true) {
    noCursor();
  } else {
    cursor(HAND);
  }
}
