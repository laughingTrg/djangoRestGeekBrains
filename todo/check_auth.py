import requests

DOMAIN = 'http://localhost:8000'

def get_url(url):
    return f'{DOMAIN}{url}'

response = requests.get(get_url('/api/users'))
assert response.status_code == 401

response = requests.get(get_url('/api/users'), auth=('admin', 'admin'))
assert response.status_code == 200

#Token
TOKEN = requests.post(get_url('/api-token-auth/'), data={'username': "admin", 'password': "admin"})
headers = {'Authorization': f'Token {TOKEN.json()["token"]}'}
response = requests.get(get_url('/api/users'), headers=headers)
# response = requests.post('api-token-auth/', data={'username': "admin", 'password': "admin"})
assert response.status_code == 200


#Token JWT
TOKEN = requests.post(get_url('/api/token/'), data={'username': "admin", 'password': "admin"})
result = response.json()
access = result['access']
print('First Token', access, end=f'\n{150*"*"}\n')

refresh = result['refresh']
print('Second Token', refresh, end=f'\n{150*"*"}\n')

headers = {'Authorization': f'Bearer {access}'}
response = requests.get(get_url('/api/users'), headers=headers)
# response = requests.post('api-token-auth/', data={'username': "admin", 'password': "admin"})
assert response.status_code == 200
# response = requests.get('http://localhost:8000/api/users')

print(response.status_code)
print(response.json())
