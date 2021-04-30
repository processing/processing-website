import processing.net.*;

Client myClient;
int dataIn;

void setup() {
  size(200, 200);
  myClient = new Client(this, "127.0.0.1", 5204);
}

void draw() { }  // Empty draw keeps the program running

// ClientEvent message is generated when a client disconnects.
void disconnectEvent(Client someClient) {
  print("Server Says:  ");
  dataIn = myClient.read();
  println(dataIn);
  background(dataIn);

}

