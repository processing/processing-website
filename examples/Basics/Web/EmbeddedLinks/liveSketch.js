/**
 * Loading URLs.
 *
 * Click on the left button to open a different URL in the same window (Only
 * works online). Click on the right button to open a URL in a new browser window.
 */
function runLiveSketch(s) {
  var overLeftButton = false;
  var overRightButton = false;

  s.setup = () => {
    s.createCanvas(640, 360);
  };

  s.draw = () => {
    s.background(204);

    // Left buttom
    if (overLeftButton == true) {
      s.fill(255);
    } else {
      s.noFill();
    }
    s.rect(20, 60, 75, 75);
    s.rect(50, 90, 15, 15);

    // Right button
    if (overRightButton == true) {
      s.fill(255);
    } else {
      s.noFill();
    }
    s.rect(105, 60, 75, 75);
    s.line(135, 105, 155, 85);
    s.line(140, 85, 155, 85);
    s.line(155, 85, 155, 100);
  };

  s.mousePressed = () => {
    if (overLeftButton) {
      window.location = 'http://www.processing.org';
      //link("http://www.processing.org");
    } else if (overRightButton) {
      window.open('http://www.processing.org');
      //link("http://www.processing.org", "_new");
    }
  };

  s.mouseMoved = () => {
    checkButtons();
  };

  s.mouseDragged = () => {
    checkButtons();
  };

  function checkButtons() {
    if (s.mouseX > 20 && s.mouseX < 95 && s.mouseY > 60 && s.mouseY < 135) {
      overLeftButton = true;
    } else if (
      s.mouseX > 105 &&
      s.mouseX < 180 &&
      s.mouseY > 60 &&
      s.mouseY < 135
    ) {
      overRightButton = true;
    } else {
      overLeftButton = overRightButton = false;
    }
  }
}
