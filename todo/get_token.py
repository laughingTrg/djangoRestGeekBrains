import requests

response = requests.post('http://localhost:8000/api-token-auth/', data={'username': "admin", 'password': "admin1"})

# response = requests.get('http://localhost:8000/api/users')

print(response.status_code)
print(response.json())
