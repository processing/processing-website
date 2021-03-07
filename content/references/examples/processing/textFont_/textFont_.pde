size(400,400);
PFont mono;
// The font "andalemo.ttf" must be located in the 
// current sketch's "data" directory to load successfully
mono = createFont("andalemo.ttf", 128);
background(0);
textFont(mono);
text("word", 48, 240);