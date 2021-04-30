// The following short JSON file called "data.json" is parsed 
// in the code below. It must be in the project's "data" folder.
//
// [
//   [
//     { "name": "apple", "isFruit": true },
//     { "name": "grape", "isFruit": true },
//     { "name": "carrot", "isFruit": false }
//   ],
//   [
//     { "name": "lettuce", "isFruit": false },
//     { "name": "plum", "isFruit": true },
//     { "name": "cinnamon", "isFruit": false }
//   ]
// ]

JSONArray json;

void setup() {

  json = loadJSONArray("data.json");

  // Get the first array of elements
  JSONArray values = json.getJSONArray(0);
  
  for (int i = 0; i < values.size(); i++) {
    
    JSONObject item = values.getJSONObject(i); 

    String name = item.getString("name");
    boolean isFruit = item.getBoolean("isFruit");

    println(name + ", " + isFruit);
  }
}

// Sketch prints:
// apple, true
// grape, true
// carrot, false
