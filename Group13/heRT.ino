#include <DHT.h>

// Define the GPIO pin where the data pin is connected
#define DHTPIN 23     // GPIO pin 23

// Define the type of DHT sensor used (DHT11 or DHT22)
#define DHTTYPE DHT22 // Change to DHT11 if you're using that sensor

// Create a DHT object
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  // Start the Serial communication for debugging
  Serial.begin(115200);
  // Initialize the DHT sensor
  dht.begin();
}

void loop() {
  // Wait a few seconds between measurements
  delay(2000);

  // Read temperature as Celsius
  float temperature = dht.readTemperature();
  // Read humidity
  float humidity = dht.readHumidity();

  // Check if any reads failed and exit early
  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  // Print the results to the Serial Monitor
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.println(" °C");

  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.println(" %");
}
