String data = "{ \"id\": 0, \"species\": \"Panthera leo\", \"name\": \"Lion\"}";

void setup() {
  JSONObject json = parseJSONObject(data);
  if (json == null) {
    println("JSONObject could not be parsed");
  } else {
    String species = json.getString("species");
    println(species);
  }
}

// Sketch prints:
// Panthera leo
