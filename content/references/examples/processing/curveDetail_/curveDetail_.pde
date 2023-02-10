void setup(){
  size(400,400,P2D);
}

void draw(){
  curveDetail(1);
  drawCurves(-60);
  stroke(126);
  curveDetail(2);
  drawCurves(0);
  stroke(255);
  curveDetail(4);
  drawCurves(60);
  noLoop();
}

void drawCurves(float y) {
  noFill();
  curve( 20, 112+y,  20, 112+y, 292, 104+y, 292, 252+y);
  curve( 20, 112+y, 292, 104+y, 292, 252+y, 60, 268+y); 
  curve(292, 104+y, 292, 252+y, 60, 268+y, 60, 268+y);
}