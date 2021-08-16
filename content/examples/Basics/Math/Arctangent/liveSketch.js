/**
 * Arctangent.
 *
 * Move the mouse to change the direction of the eyes.
 * The atan2() function computes the angle from each eye
 * to the cursor.
 */
function runLiveSketch(s) {
  var e1, e2, e3;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.noStroke();
    e1 = new Eye(250, 16, 120);
    e2 = new Eye(164, 185, 80);
    e3 = new Eye(420, 230, 220);
  };

  s.draw = () => {
    s.background(102);

    e1.update(s.mouseX, s.mouseY);
    e2.update(s.mouseX, s.mouseY);
    e3.update(s.mouseX, s.mouseY);

    e1.display();
    e2.display();
    e3.display();
  };

  function Eye(tx, ty, ts) {
    this.x = tx;
    this.y = ty;
    this.size = ts;
    this.angle = 0.0;

    this.update = function (mx, my) {
      this.angle = s.atan2(my - this.y, mx - this.x);
    };

    this.display = function () {
      s.push();
      s.translate(this.x, this.y);
      s.fill(255);
      s.ellipse(0, 0, this.size, this.size);
      s.rotate(this.angle);
      s.fill(153, 204, 0);
      s.ellipse(this.size / 4, 0, this.size / 2, this.size / 2);
      s.pop();
    };
  }
}
