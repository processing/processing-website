function runLiveSketch(s) {
  
  s.setup = () => {
    s.createCanvas(640, 360, s.WEBGL);
    s.noStroke();
    s.fill(204);
  };

  s.draw = () => {
    s.noStroke(); 
    s.background(0); 
    let dirY = (s.mouseY / s.height - 0.5) * 2;
    let dirX = (s.mouseX / s.width - 0.5) * 2;
    s.directionalLight(204, 204, 204, -dirX, -dirY, -1); 
    s.translate(- 100, 0, 0); 
    s.sphere(80); 
    s.translate(200, 0, 0); 
    s.sphere(80); 
  };
}
