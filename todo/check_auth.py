import requests

DOMAIN = 'http://localhost:8000/'

def get_url(url):
    return f'{DOMAIN}{url}'

response = requests.get(get_url('/api/users'))
assert response.status_code == 401

# response = requests.post('api-token-auth/', data={'username': "admin", 'password': "admin"})

# response = requests.get('http://localhost:8000/api/users')

print(response.status_code)
print(response.json())
