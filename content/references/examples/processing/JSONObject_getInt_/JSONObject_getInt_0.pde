// The following short JSON file called "data.json" is parsed 
// in the code below. It must be in the project's "data" folder.
//
// {
//   "count": 32,
//   "weight": 1.13,
//   "name": "grape",
//   "isFruit": true
// }

JSONObject json;

void setup() {

  json = loadJSONObject("data.json");

  int count = json.getInt("count");
  float weight = json.getFloat("weight");
  String name = json.getString("name");
  boolean isFruit = json.getBoolean("isFruit");

  println(count + ", " + weight + ", " + name + ", " + isFruit);
}

// Sketch prints:
// 32, 1.13, grape, true
