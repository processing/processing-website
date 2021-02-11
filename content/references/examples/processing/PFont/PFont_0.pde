PFont font;
// The font must be located in the sketch's 
// "data" directory to load successfully
font = createFont("LetterGothicStd.otf", 128);
textFont(font);
text("word", 50, 200);