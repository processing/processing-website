import java.util.Map;

// Note the HashMap's "key" is a String and "value" is an Integer
HashMap&lt;String,Integer&gt; hm = new HashMap&lt;String,Integer&gt;();

// Putting key-value pairs in the HashMap
hm.put("Ava", 1);
hm.put("Cait", 35);
hm.put("Casey", 36);

// Using an enhanced loop to iterate over each entry
for (Map.Entry me : hm.entrySet()) {
  print(me.getKey() + " is ");
  println(me.getValue());
}

// We can also access values by their key
int val = hm.get("Casey");
println("Casey is " + val);

