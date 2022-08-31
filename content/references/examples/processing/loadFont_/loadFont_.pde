size(400, 400);
PFont font;
// The font must be located in the sketch's 
// "data" directory to load successfully
font = loadFont("LetterGothicStd.otf");
textFont(font, 128);
text("word", 50, 200);