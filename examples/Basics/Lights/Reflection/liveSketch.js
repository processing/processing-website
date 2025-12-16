function runLiveSketch(s) {

  s.setup = () => {
    s.createCanvas(640, 360, s.WEBGL);
    s.noStroke();
    s.colorMode(s.RGB, 1);
    s.fill(0.4);
  };

  s.draw = () => {
    s.background(0);
    // Set the specular color of s.lights that follow
    s.specularMaterial(1, 1, 1);
    s.directionalLight(0.8, 0.8, 0.8, 0, 0, -1);
    let r = s.mouseX / s.width;
    //set the colour the object will reflect under *any* light
    s.ambientMaterial(r, r, r);
    s.sphere(120);
  };
}
