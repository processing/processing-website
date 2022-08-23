function runLiveSketch(s) {
  s.setup = () => {
    s.createCanvas(640, 360, s.WEBGL);
    s.noStroke();
    s.fill(204);
  };

  s.draw = () => {
    s.background(0);
    s.directionalLight(51, 102, 126, 0, -1, 0);
    s.spotLight(204, 153, 0, 30, -30, 600, 0, 0, -1, s.PI / 2, 600);
    s.spotLight(102, 153, 204, 30, s.mouseY - 90, 600, 0, 0, -1, s.PI / 2, 600);
    s.sphere(120, 60, 60);
  };
}
