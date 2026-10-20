import processing.net.*;

int port = 10002;       
Server myServer;        

void setup()
{
  size(400, 400);
  background(0);
  myServer = new Server(this, port);
}

void draw()
{
  // Get the next available client
  Client thisClient = myServer.available();
  // If the client is not null, and says something, display what it said
  if (thisClient !=null) {
    String whatClientSaid = thisClient.readString();
    if (whatClientSaid != null) {
      println(thisClient.ip() + "\t" + whatClientSaid);
    } 
  } 
}
