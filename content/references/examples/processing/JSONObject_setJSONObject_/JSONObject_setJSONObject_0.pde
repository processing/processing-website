JSONObject json;

void setup() {

  json = new JSONObject();

  JSONObject lion = new JSONObject();
  lion.setInt("id", 0);
  lion.setString("species", "Panthera leo");

  json.setJSONObject("lion", lion);

  println(json);
}

// Sketch prints:
// {"lion": {
//   "id": 0,
//   "species": "Panthera leo"
// }}
