import processing.net.*; 
Client myClient;
char charIn;

void setup() {
  size(200, 200);
  myClient = new Client(this, "127.0.0.1", 5204);
}

void draw() {
  if (myClient.available() > 0) {
    charIn = myClient.readChar();
    println(dataIn);
  }
}

