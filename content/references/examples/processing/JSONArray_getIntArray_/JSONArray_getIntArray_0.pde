// The following short JSON file called "data.json" is parsed 
// in the code below. It must be in the project's "data" folder.
//
// [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144 ]

JSONArray json;

void setup() {

  json = loadJSONArray("data.json");

  int[] values = json.getIntArray();

  println(values);
}

// Sketch prints:
// [0] 0
// [1] 1
// [2] 1
// [3] 2
// [4] 3
// [5] 5
// [6] 8
// [7] 13
// [8] 21
// [9] 34
// [10] 55
// [11] 89
// [12] 144
