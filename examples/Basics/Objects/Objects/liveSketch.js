/**
 * Objects
 * by hbarragan.
 *
 * Move the cursor across the image to change the speed and positions
 * of the geometry. The class MRect defines a group of lines.
 */
function runLiveSketch(s) {
  var r1, r2, r3, r4;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.fill(255, 204);
    s.noStroke();
    r1 = new MRect(1, 134.0, 0.532, 0.1 * s.height, 10.0, 60.0);
    r2 = new MRect(2, 44.0, 0.166, 0.3 * s.height, 5.0, 50.0);
    r3 = new MRect(2, 58.0, 0.332, 0.4 * s.height, 10.0, 35.0);
    r4 = new MRect(1, 120.0, 0.0498, 0.9 * s.height, 15.0, 60.0);
  };

  s.draw = () => {
    s.background(0);

    r1.display();
    r2.display();
    r3.display();
    r4.display();

    r1.move(s.mouseX - s.width / 2, s.mouseY + s.height * 0.1, 30);
    r2.move(
      (s.mouseX + s.width * 0.05) % s.width,
      s.mouseY + s.height * 0.025,
      20
    );
    r3.move(s.mouseX / 4, s.mouseY - s.height * 0.025, 40);
    r4.move(s.mouseX - s.width / 2, s.height - s.mouseY, 50);
  };

  function MRect(iw, ixp, ih, iyp, id, it) {
    this.w = iw; // single bar s.width
    this.xpos = ixp; // rect xposition
    this.h = ih; // rect height
    this.ypos = iyp; // rect yposition
    this.d = id; // single bar distance
    this.t = it; // number of bars

    this.move = function (posX, posY, damping) {
      var dif = this.ypos - posY;
      if (s.abs(dif) > 1) {
        this.ypos -= dif / damping;
      }
      dif = this.xpos - posX;
      if (s.abs(dif) > 1) {
        this.xpos -= dif / damping;
      }
    };

    this.display = function () {
      for (var i = 0; i < this.t; i++) {
        s.rect(
          this.xpos + i * (this.d + this.w),
          this.ypos,
          this.w,
          s.height * this.h
        );
      }
    };
  }
}
