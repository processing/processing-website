// Load the local file 'data.txt' and initialize a new InputStream
InputStream input = createInput("data.txt");

String content = "";

try {
  int data = input.read();
  while (data != -1) {
    content += data;
    data = input.read();
  }
}
catch (IOException e) {
  e.printStackTrace();
}
finally {
  try {
    input.close();
  } 
  catch (IOException e) {
    e.printStackTrace();
  }
}

println(content);
