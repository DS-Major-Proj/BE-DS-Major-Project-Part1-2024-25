from app import app  # Import your Flask app

app.testing = True
client = app.test_client()

def test_api():
    response = client.post('/api', json={'message': 'Hello'})
    assert response.status_code == 200
    assert response.json == {"response": "Expected response"}

if __name__ == '__main__':
    test_api()
