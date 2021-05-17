import processing.net.*; 
Client myClient;

void setup() {
  size(200, 200);
  // Connect to the local machine at port 5204.
  // This example will not run if you haven't
  // previously started a server on this port.
  myClient = new Client(this, "127.0.0.1", 5204);
  println(myClient.ip());
}

