size(100, 100);
PImage tower = loadImage("tower.jpg");
PImage newImage = createImage(100, 100, RGB);
newImage = tower.get();
newImage.save("outputImage.jpg");
