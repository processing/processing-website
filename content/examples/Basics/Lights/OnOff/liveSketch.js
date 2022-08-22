function runLiveSketch(s) {
  let spin = 0.0;

  s.setup = () => {
    s.createCanvas(640, 360, s.WEBGL);
    s.noStroke();
  };

  s.draw = () => {
    s.background(51);
  
    if (!s.mouseIsPressed) {
      s.lights();
    }
    
    spin += 0.01;
    
    s.push();
    s.rotateX(s.PI / 9);
    s.rotateY(s.PI / 5 + spin);
    s.box(150);
    s.pop();
  };
}
