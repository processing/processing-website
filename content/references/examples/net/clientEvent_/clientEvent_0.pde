import processing.net.*;

Client myClient;
int dataIn;

void setup() {
  size(200, 200);
  myClient = new Client(this, "127.0.0.1", 5204);
  noLoop();
}

void draw() { 
  background(dataIn);
}

// ClientEvent message is generated when the 
// server sends data to an existing client.
void clientEvent(Client someClient) {
  print("Server Says:  ");
  dataIn = someClient.read();
  println(dataIn);
  redraw();
}

