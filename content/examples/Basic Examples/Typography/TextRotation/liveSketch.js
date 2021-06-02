/**
 * Text Rotation.
 *
 * Draws letters to the screen and rotates them at different angles.
 */

function runLiveSketch(s) {
  var f;
  var angleRotate = 0.0;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.background(0);

    // Create the font from the .ttf file in the data folder
    s.textFont('Source Code Pro', 18);
  };

  s.draw = () => {
    s.background(0);

    s.push();
    var angle1 = s.radians(45);
    s.translate(100, 180);
    s.rotate(angle1);
    s.noStroke();
    s.fill(255);
    s.text('45 DEGREES', 0, 0);
    s.strokeWeight(1);
    s.stroke(153);
    s.line(0, 0, 150, 0);
    s.pop();

    s.push();
    var angle2 = s.radians(270);
    s.translate(200, 180);
    s.rotate(angle2);
    s.noStroke();
    s.fill(255);
    s.text('270 DEGREES', 0, 0);
    s.strokeWeight(1);
    s.stroke(153);
    s.line(0, 0, 150, 0);
    s.pop();

    s.push();
    s.translate(440, 180);
    s.rotate(s.radians(angleRotate));
    s.noStroke();
    s.fill(255);
    s.text((s.int(angleRotate) % 360) + ' DEGREES', 0, 0);
    s.strokeWeight(1);
    s.stroke(153);
    s.line(0, 0, 150, 0);
    s.pop();

    angleRotate += 0.25;

    s.stroke(255, 0, 0);
    s.strokeWeight(4);
    s.point(100, 180);
    s.point(200, 180);
    s.point(440, 180);
  };
}
