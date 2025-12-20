function runLiveSketch(s) {
  let showPerspective = false;

  s.setup = () => {
    s.createCanvas(640, 360, s.WEBGL);
    s.noFill();
    s.fill(255);
    s.noStroke();
  };

  s.draw = () => {
    s.lights();
    s.background(0);
    let far = s.map(s.mouseX, 0, s.width, 120, 400);
    if (showPerspective == true) {
      s.perspective(s.PI / 3.0, s.width / s.height, 10, far);
    } else {
      s.ortho(-s.width / 2.0, s.width / 2.0, -s.height / 2.0, s.height / 2.0, 10, far);
    }
    s.rotateX(-s.PI/6);
    s.rotateY(s.PI/3);
    s.box(180);
  };
  
  s.mousePressed = () => {
    showPerspective = !showPerspective;
  }
}
