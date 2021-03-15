PImage sky = loadImage("tokyo-sky.jpg");;
size(400, 400);
background(sky);
noStroke();
color c = sky.get(240, 360);
fill(c);
rect(100, 100, 200, 200);