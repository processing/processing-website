/**
 * Rollover.
 *
 * Roll over the colored squares in the center of the image
 * to change the color of the outside rectangle.
 */

function runLiveSketch(s) {
  var rectX, rectY; // Position of square button
  var circleX, circleY; // Position of circle button
  var rectSize = 90; // Diameter of rect
  var circleSize = 93; // Diameter of circle

  var rectColor;
  var circleColor;
  var baseColor;

  var rectOver = false;
  var circleOver = false;

  s.setup = () => {
    s.createCanvas(640, 360);
    rectColor = s.color(0);
    circleColor = s.color(255);
    baseColor = s.color(102);
    circleX = s.width / 2 + circleSize / 2 + 10;
    circleY = s.height / 2;
    rectX = s.width / 2 - rectSize - 10;
    rectY = s.height / 2 - rectSize / 2;
    s.ellipseMode(s.CENTER);
  };

  s.draw = () => {
    s.update(s.mouseX, s.mouseY);

    s.noStroke();
    if (rectOver) {
      s.background(rectColor);
    } else if (circleOver) {
      s.background(circleColor);
    } else {
      s.background(baseColor);
    }

    s.stroke(255);
    s.fill(rectColor);
    s.rect(rectX, rectY, rectSize, rectSize);
    s.stroke(0);
    s.fill(circleColor);
    s.ellipse(circleX, circleY, circleSize, circleSize);
  };

  s.update = (x, y) => {
    if (overCircle(circleX, circleY, circleSize)) {
      circleOver = true;
      rectOver = false;
    } else if (overRect(rectX, rectY, rectSize, rectSize)) {
      rectOver = true;
      circleOver = false;
    } else {
      circleOver = rectOver = false;
    }
  };

  function overRect(x, y, width, height) {
    if (
      s.mouseX >= x &&
      s.mouseX <= x + width &&
      s.mouseY >= y &&
      s.mouseY <= y + height
    ) {
      return true;
    } else {
      return false;
    }
  }

  function overCircle(x, y, diameter) {
    var disX = x - s.mouseX;
    var disY = y - s.mouseY;
    if (s.sqrt(s.sq(disX) + s.sq(disY)) < diameter / 2) {
      return true;
    } else {
      return false;
    }
  }
}
