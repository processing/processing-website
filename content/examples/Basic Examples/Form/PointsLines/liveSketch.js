/**
 * Points and Lines.
 *
 * Points and lines can be used to draw basic geometry.
 * Change the value of the variable 'd' to scale the form.
 * The four variables set the positions based on the value of 'd'.
 */
function runLiveSketch(s) {
  s.setup = () => {
    var d = 70;
    var p1 = d;
    var p2 = p1 + d;
    var p3 = p2 + d;
    var p4 = p3 + d;

    s.createCanvas(640, 360);
    s.noSmooth();
    s.background(0);
    s.translate(140, 0);

    // Draw gray box
    s.stroke(153);
    s.line(p3, p3, p2, p3);
    s.line(p2, p3, p2, p2);
    s.line(p2, p2, p3, p2);
    s.line(p3, p2, p3, p3);

    // Draw white points
    s.stroke(255);
    s.point(p1, p1);
    s.point(p1, p3);
    s.point(p2, p4);
    s.point(p3, p1);
    s.point(p4, p2);
    s.point(p4, p4);
  };
}
