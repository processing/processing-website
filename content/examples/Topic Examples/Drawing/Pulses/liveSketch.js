/**
 * Pulses.
 *
 * Software drawing instruments can follow a rhythm or abide by rules independent
 * of drawn gestures. This is a form of collaborative drawing in which the draftsperson
 * controls some aspects of the image and the software controls others.
 */
function runLiveSketch(s) {
  var angle = 0;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.background(102);
    s.noStroke();
    s.fill(0, 102);
  };

  s.draw = () => {
    // Draw only when mouse is pressed
    if (s.mouseIsPressed == true) {
      angle += 5;
      var val = s.cos(s.radians(angle)) * 12.0;
      for (var a = 0; a < 360; a += 75) {
        var xoff = s.cos(s.radians(a)) * val;
        var yoff = s.sin(s.radians(a)) * val;
        s.fill(0);
        s.ellipse(s.mouseX + xoff, s.mouseY + yoff, val, val);
      }
      s.fill(255);
      s.ellipse(s.mouseX, s.mouseY, 2, 2);
    }
  };
}
