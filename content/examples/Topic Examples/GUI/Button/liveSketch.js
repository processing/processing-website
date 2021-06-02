/**
 * Button.
 *
 * Click on one of the colored shapes in the
 * center of the image to change the color of
 * the background.
 */
function runLiveSketch(s) {
  var rectX, rectY; // Position of square button
  var circleX, circleY; // Position of circle button
  var rectSize = 90; // Diameter of rect
  var circleSize = 93; // Diameter of circle
  var rectColor, circleColor, baseColor;
  var rectHighlight, circleHighlight;
  var currentColor;
  var rectOver = false;
  var circleOver = false;

  s.setup = () => {
    s.createCanvas(640, 360);
    rectColor = s.color(0);
    rectHighlight = s.color(51);
    circleColor = s.color(255);
    circleHighlight = s.color(204);
    baseColor = s.color(102);
    currentColor = baseColor;
    circleX = s.width / 2 + circleSize / 2 + 10;
    circleY = s.height / 2;
    rectX = s.width / 2 - rectSize - 10;
    rectY = s.height / 2 - rectSize / 2;
    s.ellipseMode(s.CENTER);
  };

  s.draw = () => {
    s.update(s.mouseX, s.mouseY);
    s.background(currentColor);

    if (rectOver) {
      s.fill(rectHighlight);
    } else {
      s.fill(rectColor);
    }
    s.stroke(255);
    s.rect(rectX, rectY, rectSize, rectSize);

    if (circleOver) {
      s.fill(circleHighlight);
    } else {
      s.fill(circleColor);
    }
    s.stroke(0);
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

  s.mousePressed = () => {
    if (circleOver) {
      currentColor = circleColor;
    }
    if (rectOver) {
      currentColor = rectColor;
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
