import processing.net.*;

Server myServer;
int port = 5204;
int val = 0;

void setup() {
  size(200, 200);
  // Starts a myServer on port 5204
  myServer = new Server(this, port);
}

void draw() {
  val = val + 1;
  background(val);
  myServer.write(val);
}

