function runLiveSketch(s) {
  var distances;
  var maxDistance;
  var spacer;

  s.setup = () => {
    s.createCanvas(640, 360);
    maxDistance = s.dist(s.width / 2, s.height / 2, s.width, s.height);
    distances = [];
    for (var x = 0; x < s.width; x++) {
      distances[x] = [];
      for (var y = 0; y < s.height; y++) {
        var distance = s.dist(s.width / 2, s.height / 2, x, y);
        distances[x][y] = (distance / maxDistance) * 255;
      }
    }
    spacer = 10;
    s.noLoop(); // Run once and stop
  };

  s.draw = () => {
    s.background(0);
    // This embedded loop skips over values in the arrays based on
    // the spacer variable, so there are more values in the array
    // than are drawn here. Change the value of the spacer variable
    // to change the density of the points
    for (var y = 0; y < s.height; y += spacer) {
      for (var x = 0; x < s.width; x += spacer) {
        s.stroke(distances[x][y]);
        s.point(x + spacer / 2, y + spacer / 2);
      }
    }
  };
}
