String data = "{ &#92"id&#92": 0, &#92"species&#92": &#92"Panthera leo&#92", &#92"name&#92": &#92"Lion&#92"}";

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
