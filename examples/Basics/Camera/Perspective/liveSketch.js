function runLiveSketch(s) {
  
  s.setup = () => {
    s.createCanvas(640, 360, s.WEBGL);
    s.noStroke();
  };

  s.draw = () => {
    s.lights();
    s.background(0);
    let cameraY = s.height/2.0;
    let fov = s.mouseX/s.width * s.PI / 2;
    let cameraZ = cameraY / s.tan(fov / 2.0);
    let aspect = s.width / s.height;
    if (s.mouseIsPressed) {
      aspect = aspect / 2.0;
    }
    s.perspective(fov, aspect, cameraZ / 10.0, cameraZ * 10.0);
    
    s.translate(30, 0, 0);
    s.rotateX(-s.PI / 6);
    s.rotateY(s.PI / 3 + s.mouseY / s.height * s.PI);
    s.box(45);
    s.translate(0, 0, -50);
    s.box(30);
  };
}
