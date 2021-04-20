// This example is a code fragment;
// it will not compile on its own.

// Create the DragDrop subclass from
// the Button class. Button becomes
// the superclass of DragDrop.
class DragDrop extends Button {
  int xoff, yoff;
  DragDrop(int x, int y) {
    // Runs the superclass' constructor
    super(x, y);
  }
  void press(int mx, int my) {
    // Runs the superclass' press() method
    super.press();  
    xoff = mx;
    yoff = my;  
  }
}

