// Bug note: stopping the server produces an unrecoverable error:
// "java.net.SocketException: Socket closed
//  at java.net.PlainSocketImpl.socketAccept(Native Method)"
 
import processing.net.*;

int port = 10002;
boolean myServerRunning;
Server myServer;

void setup()
{
  size(400, 400);
  background(0);
  myServerRunning = false;
  println("Server Running:" + "\t" + myServerRunning);
}

void draw() {
  // Nothing happening here, everything happens in mousePressed()
}

void mousePressed()
{
  // If the mouse clicked the myServer changes status
  println("click");
  if (myServerRunning) {
    // N.B. This produces an error which kills the applet.
    myServerRunning = false;
    myServer.stop();
    myServer = null;
  } 
  else {
    myServer = new Server(this, port); // Starts a server on port 10002
    myServerRunning = true;

  }
  background(0);
  println("Server Status:" + "\t" + myServerRunning);
}

