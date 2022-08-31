function runLiveSketch(s) {
  let rocketModel;
  let rocketTexture;

  s.preload = () => {
    rocketModel = s.loadModel('/livesketch/loaddisplayobj/rocket.obj');
    rocketTexture = s.loadImage('/livesketch/loaddisplayobj/rocket.png');
  };

  s.setup = () => {
    s.createCanvas(640, 360, s.WEBGL);
    s.noStroke();
    s.describe(
      'a blue, white, and yellow rocket spins over a black background'
    );
  };

  s.draw = () => {
    s.background(0);
    s.lights();
    s.translate(0, 100, -200);
    s.rotateZ(s.PI);
    s.rotateY(s.frameCount * 0.02);
    s.texture(rocketTexture);
    s.model(rocketModel);
  };
}
