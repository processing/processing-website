size(400,400);

PImage mountain = loadImage("mt-fuji.jpg");
PImage dandelions = loadImage("dandelions.jpg"); 
mountain.blend(dandelions, 0, 0, 132, 400, 268, 0, 132, 400, LIGHTEST);

image(mountain, 0, 0);
image(dandelions, 0, 0);