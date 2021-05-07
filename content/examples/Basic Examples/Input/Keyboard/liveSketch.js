/**
 * Keyboard.
 *
 * Click on the image to give it focus and press the letter keys
 * to create forms in time and space. Each key has a unique identifying
 * number. These numbers can be used to position shapes in space.
 */

function runLiveSketch(s) {
  var rectWidth;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.noStroke();
    s.background(0);
    rectWidth = s.width / 4;
  };

  s.draw = () => {
    // keep draw() here to continue looping while waiting for keys
  };

  s.keyPressed = () => {
    var keyIndex = -1;
    var keyVal = s.key.charCodeAt(0);
    if (keyVal >= 'A'.charCodeAt(0) && keyVal <= 'Z'.charCodeAt(0)) {
      keyIndex = keyVal - 'A'.charCodeAt(0);
    } else if (keyVal >= 'a'.charCodeAt(0) && keyVal <= 'z'.charCodeAt(0)) {
      keyIndex = keyVal - 'a'.charCodeAt(0);
    }
    if (keyIndex === -1) {
      // If it's not a letter key, clear the screen
      s.background(0);
    } else {
      // It's a letter key, fill a rectangle
      s.fill(s.millis() % 255);
      var x = s.map(keyIndex, 0, 25, 0, s.width - rectWidth);
      s.rect(x, 0, rectWidth, s.height);
    }
  };
}
