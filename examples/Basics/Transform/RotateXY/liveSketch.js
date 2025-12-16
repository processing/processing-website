function runLiveSketch(s) {
  let a = 0.0;
  let rSize;  // s.rectangle size

  s.setup = () => {
    s.createCanvas(640, 360, s.WEBGL);
    rSize = s.width / 6;  
    s.noStroke();
    s.fill(204, 204);
  };

  s.draw = () => {
    s.background(126);
  
    a += 0.005;
    if(a > s.TWO_PI) { 
      a = 0.0; 
    }
    
    s.rotateX(a);
    s.rotateY(a * 2.0);
    s.fill(255);
    s.rect(-rSize, -rSize, rSize*2, rSize*2);
    
    s.rotateX(a * 1.001);
    s.rotateY(a * 2.002);
    s.fill(0);
    s.rect(-rSize, -rSize, rSize*2, rSize*2);
  };
}
