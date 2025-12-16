/**
 * Recursive Tree
 * by Daniel Shiffman.
 *
 * Renders a simple tree-like structure via recursion.
 * The branching angle is calculated as a function of
 * the horizontal mouse location. Move the mouse left
 * and right to change the angle.
 */

function runLiveSketch(s) {
  var theta;

  s.setup = () => {
    s.createCanvas(640, 360);
  };

  s.draw = () => {
    s.background(0);
    s.frameRate(30);
    s.stroke(255);
    // Let's pick an angle 0 to 90 degrees based on the mouse position
    var a = (s.mouseX / s.width) * 90;
    // Convert it to radians
    theta = s.radians(a);
    // Start the tree from the bottom of the screen
    s.translate(s.width / 2, s.height);
    // Draw a line 120 pixels
    s.line(0, 0, 0, -120);
    // Move to the end of that line
    s.translate(0, -120);
    // Start the recursive branching!
    branch(120);
  };

  function branch(h) {
    // Each branch will be 2/3rds the size of the previous one
    h *= 0.66;

    // All recursive functions must have an exit condition!!!!
    // Here, ours is when the length of the branch is 2 pixels or less
    if (h > 2) {
      s.push(); // Save the current state of transformation (i.e. where are we now)
      s.rotate(theta); // Rotate by theta
      s.line(0, 0, 0, -h); // Draw the branch
      s.translate(0, -h); // Move to the end of the branch
      branch(h); // Ok, now call myself to draw two new branches!!
      s.pop(); // Whenever we get back here, we "pop" in order to restore the previous matrix state

      // Repeat the same thing, only branch off to the "left" this time!
      s.push();
      s.rotate(-theta);
      s.line(0, 0, 0, -h);
      s.translate(0, -h);
      branch(h);
      s.pop();
    }
  }
}
