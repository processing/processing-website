// The following short JSON file called "data.json" is parsed 
// in the code below. It must be in the project's "data" folder.
//
// [ 32, 1.13, "grape", true ]

JSONArray json;

void setup() {

  json = loadJSONArray("data.json");

  int count = json.getInt(0);
  float weight = json.getFloat(1);
  String name = json.getString(2);
  boolean isFruit = json.getBoolean(3);

  println(count + ", " + weight + ", " + name + ", " + isFruit);
}

// Sketch prints:
// 32, 1.13, grape, true
