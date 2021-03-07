PShape prefecture;
PShape aichi;

void setup() {
 size(400, 400);
 prefecture = loadShape("prefecture.svg");
 aichi = prefecture.getChild("AICHI"); // id="AICHI" on svg file

}

void draw() {
  aichi.disableStyle();
  background(255);
  fill(255);
  shape(prefecture, 0, 5);
  
  fill(94, 138, 248); // change the color 
  shape(aichi, -10, -10); // move the location a bit
}