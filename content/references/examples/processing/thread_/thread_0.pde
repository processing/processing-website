String time = "";

void setup() {
  size(100, 100);
}

void draw() {
  background(0);
  // Every 30 frames request new data
  if (frameCount % 30 == 0) {
    thread("requestData");
  }
  text(time, 10, 50);
}

// This happens as a separate thread and can take as long as it wants
void requestData() {
  JSONObject json = loadJSONObject("http://time.jsontest.com/");
  time = json.getString("time");
}
