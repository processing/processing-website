JSONArray json;

void setup() {

  json = new JSONArray();

  json.setInt(0, 32);
  json.setFloat(1, 1.5);
  json.setString(2, "grape");
  json.setBoolean(3, true);

  println(json);
}

// Sketch prints:
// [
//   32,
//   1.5,
//   "grape",
//   true
// ]
