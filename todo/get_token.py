import requests

response = requests.post('http://localhost:8000/api-token-auth/', data={'username': "admin", 'password': "admin"})

# response = requests.get('http://localhost:8000/api/users')

print(response.status_code)
print(response.json())
print(type(response.json()['token']))
