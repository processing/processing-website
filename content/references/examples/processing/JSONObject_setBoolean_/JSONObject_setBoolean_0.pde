JSONObject json;

void setup() {

  json = new JSONObject();
  
  json.setInt("count", 88);
  json.setFloat("weight", 35.432);
  json.setString("name", "celery");
  json.setBoolean("isFruit", false);

  int count = json.getInt("count");
  float weight = json.getFloat("weight");
  String name = json.getString("name");
  boolean isFruit = json.getBoolean("isFruit");

  println(count + ", " + weight + ", " + name + ", " + isFruit);
}

// Sketch prints:
// 88, 35.432, celery, false
