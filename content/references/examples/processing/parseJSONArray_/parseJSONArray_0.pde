  String data = "[ \"Capra hircus\", \"Panthera pardus\", \"Equus zebra\" ]";

void setup() {
  JSONArray json = parseJSONArray(data);
  if (json == null) {
    println("JSONArray could not be parsed");
  } else {
    String species = json.getString(1);
    println(species);
  }
}

// Sketch prints:
// Panthera pardus
