function runLiveSketch(s) {
  
  s.setup = () => {
    s.createCanvas(640, 360, s.WEBGL);
    s.fill(204);
  };

  s.draw = () => {
    s.lights();
    s.background(0);
    
    // Change height of the camera with mouseY
    s.camera(30.0, s.mouseY, 220.0, // eyeX, eyeY, eyeZ
           0.0, 0.0, 0.0, // centerX, centerY, centerZ
           0.0, 1.0, 0.0); // upX, upY, upZ

    s.noStroke();
    s.box(90);
    s.stroke(255);
    s.line(-100, 0, 0, 100, 0, 0);
    s.line(0, -100, 0, 0, 100, 0);
    s.line(0, 0, -100, 0, 0, 100);
  };
}

