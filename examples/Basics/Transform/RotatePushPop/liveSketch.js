function runLiveSketch(s) {
  let a;                 // Angle of rotation
  let offset;  // Angle offset between s.boxes
  let num;            // Number of s.boxes

  s.setup = () => {
    s.createCanvas(640, 360, s.WEBGL);
    s.noStroke();
    
    a = 0.;
    offset = s.PI / 24.0;
    num = 12;
  };

  s.draw = () => {
    s.lights();
  
    s.background(0, 0, 26);
        
    for(let i = 0; i < num; i++) {
      let gray = s.map(i, 0, num - 1, 0, 255);
      s.push();
      s.fill(gray);
      s.rotateY(a + offset * i);
      s.rotateX(a / 2 + offset * i);
      s.box(200);
      s.pop();
    }
    
    a += 0.01;
  };
}
