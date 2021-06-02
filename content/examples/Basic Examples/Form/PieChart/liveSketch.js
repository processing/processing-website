/**
 * Pie Chart
 *
 * Uses the arc() function to generate a pie chart from the data
 * stored in an array.
 */

function runLiveSketch(s) {
  var angles = [30, 10, 45, 35, 60, 38, 75, 67];

  s.setup = () => {
    s.createCanvas(640, 360);
    s.noStroke();
    s.noLoop(); // Run once and stop
  };

  s.draw = () => {
    s.background(100);
    pieChart(300, angles);
  };

  function pieChart(diameter, data) {
    var lastAngle = 0;
    for (var i = 0; i < data.length; i++) {
      var gray = s.map(i, 0, data.length, 0, 255);
      s.fill(gray);
      s.arc(
        s.width / 2,
        s.height / 2,
        diameter,
        diameter,
        lastAngle,
        lastAngle + s.radians(angles[i])
      );
      lastAngle += s.radians(angles[i]);
    }
  }
}
