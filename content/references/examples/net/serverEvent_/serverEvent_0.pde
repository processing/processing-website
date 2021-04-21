// Creates a server that prints new client's IP addresses. 

import processing.net.*;

int port = 10002;   
Server myServer;    

void setup()
{
  size(400, 400);
  background(0);
  myServer = new Server(this, port); // Starts a server on port 10002
}

void draw() {
  // Nothing happens here, everything happens inside ServerEvent()
}

// ServerEvent message is generated when a new client connects 
// to an existing server.
void serverEvent(Server someServer, Client someClient) {
  println("We have a new client: " + someClient.ip());
}

