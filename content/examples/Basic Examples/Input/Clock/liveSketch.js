/**
 * Clock.
 *
 * The current time can be read with the second(), minute(),
 * and hour() functions. In this example, sin() and cos() values
 * are used to set the position of the hands.
 */

function runLiveSketch(s) {
  var cx, cy;
  var secondsRadius;
  var minutesRadius;
  var hoursRadius;
  var clockDiameter;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.stroke(255);

    var radius = s.min(s.width, s.height) / 2;
    secondsRadius = radius * 0.72;
    minutesRadius = radius * 0.6;
    hoursRadius = radius * 0.5;
    clockDiameter = radius * 1.8;

    cx = s.width / 2;
    cy = s.height / 2;
  };

  s.draw = () => {
    s.background(0);

    // Draw the clock background
    s.fill(80);
    s.noStroke();
    s.ellipse(cx, cy, clockDiameter, clockDiameter);

    // Angles for sin() and cos() start at 3 o'clock;
    // subtract HALF_PI to make them start at the top
    var sp = s.map(s.second(), 0, 60, 0, s.TWO_PI) - s.HALF_PI;
    var m =
      s.map(s.minute() + s.norm(s.second(), 0, 60), 0, 60, 0, s.TWO_PI) -
      s.HALF_PI;
    var h =
      s.map(s.hour() + s.norm(s.minute(), 0, 60), 0, 24, 0, s.TWO_PI * 2) -
      s.HALF_PI;

    // Draw the hands of the clock
    s.stroke(255);
    s.strokeWeight(1);
    s.line(
      cx,
      cy,
      cx + s.cos(sp) * secondsRadius,
      cy + s.sin(sp) * secondsRadius
    );
    s.strokeWeight(2);
    s.line(
      cx,
      cy,
      cx + s.cos(m) * minutesRadius,
      cy + s.sin(m) * minutesRadius
    );
    s.strokeWeight(4);
    s.line(cx, cy, cx + s.cos(h) * hoursRadius, cy + s.sin(h) * hoursRadius);

    // Draw the minute ticks
    s.strokeWeight(2);
    s.beginShape(s.POINTS);
    for (var a = 0; a < 360; a += 6) {
      var angle = s.radians(a);
      var x = cx + s.cos(angle) * secondsRadius;
      var y = cy + s.sin(angle) * secondsRadius;
      s.vertex(x, y);
    }
    s.endShape();
  };
}
