import requests

url = "http://127.0.0.1:5001/api"
data = {"message": "Hello"}

response = requests.post(url, json=data)

print(f"Status Code: {response.status_code}")
print(f"Response: {response.json()}")
