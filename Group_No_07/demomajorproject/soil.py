import platform

# Check the operating system
is_windows = platform.system() == "Windows"

# Mock classes for Windows
if is_windows:
    print("Running on Windows - Hardware access not supported.")


    class MockBoard:
        D18 = "Mocked D18 Pin"  # Simulate a hardware pin


    class MockDHTSensor:
        def __init__(self, pin):
            print(f"Initializing mock DHT sensor on pin {pin}")

        def temperature(self):
            return 25.0  # Mock temperature value

        def humidity(self):
            return 50.0  # Mock humidity value


    board = MockBoard()  # Assign the mock to `board`
    dht_sensor = MockDHTSensor(board.D18)  # Initialize the mock sensor
else:
    # Actual imports for hardware (Raspberry Pi, etc.)
    import board
    import adafruit_dht

    dht_pin = board.D18  # Change to your DHT sensor pin
    dht_sensor = adafruit_dht.DHT11(dht_pin)

# Reading from the sensor (mocked or real)
if is_windows:
    temperature = dht_sensor.temperature()  # Use mock value
    humidity = dht_sensor.humidity()  # Use mock value
else:
    try:
        temperature = dht_sensor.temperature
        humidity = dht_sensor.humidity
    except RuntimeError as error:
        print(f"Error reading from sensor: {error}")
        temperature = None
        humidity = None

print(f"Temperature: {temperature}°C")
print(f"Humidity: {humidity}%")
