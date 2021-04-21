import processing.io.*;

void setup() {
  GPIO.pinMode(4, GPIO.OUTPUT);
  GPIO.pinMode(5, GPIO.INPUT);

  // trigger a reset of an external device with GPIO 4
  GPIO.digitalWrite(4, GPIO.HIGH);

  // wait for the device signalling us that it's ready
  // by pulling up our pin 5
  GPIO.waitFor(5, GPIO.RISING, 1000);
  // if this takes longer than 1000ms an exception will be raised

  // GPIO.waitFor(5, GPIO.RISING);
  // would alternatively wait indefinitely

  // ...
}

