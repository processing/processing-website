String data = "[ &#92"Capra hircus&#92", &#92"Panthera pardus&#92", &#92"Equus zebra&#92" ]";

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
