function runLiveSketch(s) {
  var coswave;

  s.setup = () => {
    s.createCanvas(640, 360);
    coswave = [];
    for (var i = 0; i < s.width; i++) {
      var amount = s.map(i, 0, s.width, 0, s.PI);
      coswave[i] = s.abs(s.cos(amount));
    }
    s.background(255);
    s.noLoop();
  };

  s.draw = () => {
    var y1 = 0;
    var y2 = s.height / 3;
    for (var i = 0; i < s.width; i += 2) {
      s.stroke(coswave[i] * 255);
      s.line(i, y1, i, y2);
    }

    y1 = y2;
    y2 = y1 + y1;
    for (var i = 0; i < s.width; i += 2) {
      s.stroke((coswave[i] * 255) / 4);
      s.line(i, y1, i, y2);
    }

    y1 = y2;
    y2 = s.height;
    for (var i = 0; i < s.width; i += 2) {
      s.stroke(255 - coswave[i] * 255);
      s.line(i, y1, i, y2);
    }
  };
}
