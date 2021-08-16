/**
 * Save One Image
 *
 * The save() function allows you to save an image from the
 * display window. In this example, save() is run when a mouse
 * button is pressed. The image "line.tif" is saved to the
 * same folder as the sketch's program file.
 */
function runLiveSketch(s) {
  s.setup = () => {
    s.createCanvas(200, 200);
  };

  s.draw = () => {
    s.background(204);
    s.line(0, 0, s.mouseX, s.height);
    s.line(s.width, 0, 0, s.mouseY);
  };

  s.mousePressed = () => {
    s.save('line.tif');
  };
}
