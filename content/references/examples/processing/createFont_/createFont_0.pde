PFont myFont;

void setup() {
  size(200, 200);
  // Uncomment the following two lines to see the available fonts 
  //String[] fontList = PFont.list();
  //printArray(fontList);
  myFont = createFont("Georgia", 32);
  textFont(myFont);
  textAlign(CENTER, CENTER);
  text("!@#$%", width/2, height/2);
}

