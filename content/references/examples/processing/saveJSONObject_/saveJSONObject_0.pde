JSONObject json;

void setup() {

  json = new JSONObject();

  json.setInt("id", 0);
  json.setString("species", "Panthera leo");
  json.setString("name", "Lion");

  saveJSONObject(json, "data/new.json");
}

// Sketch saves the following to a file called "new.json":
// {
//   "id": 0,
//   "species": "Panthera leo",
//   "name": "Lion"
// }
