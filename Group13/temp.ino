#include <WiFi.h>
#include <DHT.h>  // Make sure this library is installed

// Replace with your network credentials
const char* ssid = "TP-Link_A5FC";
const char* password = "Krishna1003";

// Define DHT settings
#define DHTPIN 4      // GPIO pin where the DHT11 data pin is connected
#define DHTTYPE DHT11 // DHT11 sensor type

DHT dht(DHTPIN, DHTTYPE); // Create DHT object

// Initialize the WiFi server on port 80
WiFiServer server(80);

void setup() {
  Serial.begin(115200);
  
  dht.begin(); // Initialize DHT sensor

  // Connect to Wi-Fi network
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi...");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  server.begin(); // Start the server
}

void loop() {
  // Check if a client has connected
  WiFiClient client = server.available();
  if (!client) {
    return;
  }

  Serial.println("New Client connected.");
  
  // Read request from client
  String request = "";
  while (client.connected()) {
    if (client.available()) {
      request = client.readStringUntil('\r');
      break; // Break after reading the request
    }
  }

  // Fetch temperature and humidity readings
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }
  Serial.println(temperature);

  // Send HTTP response
  client.println("HTTP/1.1 200 OK");
  client.println("Content-type:text/html");
  client.println();

  client.println("<html><head><title>ESP32 Web Server</title></head><body>");
  client.println("<h1>ESP32 Temperature and Humidity Monitor</h1>");
  client.println("<p>Temperature: " + String(temperature) + "&deg C</p>");
  client.println("<p>Humidity: " + String(humidity) + " %</p>");
  client.println("</body></html>");

  client.stop(); // Close the connection
  Serial.println("Client disconnected.");
}