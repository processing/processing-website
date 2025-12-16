function runLiveSketch(s) {

  s.setup = () => {
    s.createCanvas(640, 360, s.WEBGL);
    s.noStroke();
  };

  s.draw = () => {
    s.background(0);
  
    // Orange point light on the right
    s.pointLight(150, 100, 0, // Color
               200, -150, 0); // Position

    // Blue directional light from the left
    s.directionalLight(0, 102, 255, // Color
                     1, 0, 0); // The x-, y-, z-axis direction
  
    // Yellow spotlight from the front
    s.spotLight(255, 255, 109, // Color
              0, 40, 200, // Position
              0, -0.5, -0.5, // Direction
              s.PI / 2, 2); // Angle, concentration

    s.rotateY(s.map(s.mouseX, 0, s.width, 0, s.PI));
    s.rotateX(s.map(s.mouseY, 0, s.height, 0, s.PI));
    s.box(150);
  };
}

