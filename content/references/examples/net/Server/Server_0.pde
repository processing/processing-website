import processing.net.*;

Server myServer;
int val = 0;

void setup() {
  size(200, 200);
  // Starts a myServer on port 5204
  myServer = new Server(this, 5204); 
}

void draw() {
  val = (val + 1) % 255;
  background(val);
  myServer.write(val);
}
