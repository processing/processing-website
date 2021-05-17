size(400, 400);
textSize(112);

char c = 'T';
float cw = textWidth(c);
text(c, 0, 160);
line(cw, 0, cw, 200); 

String s = "Tokyo";
float sw = textWidth(s);
text(s, 0, 340);
line(sw, 200, sw, 400);