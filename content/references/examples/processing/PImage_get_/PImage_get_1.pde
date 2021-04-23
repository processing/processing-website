PImage sky = loadImage("tokyo-sky.jpg");
size(400, 400);
background(sky);
PImage newSky = sky.get(200, 0, 200, 400); 
image(newSky, 0, 0); 