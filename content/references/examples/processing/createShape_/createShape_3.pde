PShape alien, head, body;

void setup() {
  size(100, 100);

  // Create the shape group
  alien = createShape(GROUP);

  // Make two shapes
  ellipseMode(CORNER);
  head = createShape(ELLIPSE, -25, 0, 50, 50);
  head.setFill(color(255));
  body = createShape(RECT, -25, 45, 50, 40);
  body.setFill(color(0));

  // Add the two "child" shapes to the parent group
  alien.addChild(body);
  alien.addChild(head);
}

void draw() {
  background(204);
  translate(50, 15);
  shape(alien); // Draw the group
}
