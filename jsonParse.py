import requests
import json
from collections import defaultdict

url = "https://crestroneng.atlassian.net/rest/api/3/search?query=issues&issues=fields&fields=updated, status, statuscategorychangedate, statuscategorychangedate, customfield_10053&maxResults=100&"
payload = {}
files = {}
headers = {
    'X-Atlassian-Token': 'no-check',
    'X-Force-Accept-Language': 'Accept-Language',
    'Accept': 'application/json',
    'Authorization': 'Basic RmFicml6aW8uVG9ycmVzQGNyZXN0cm9uLmNvbTpORDBjbWRMUm9ReDRvOWRtSFljMjIyNEI=',
    'Cookie': 'atlassian.xsrf.token=66e01b6f-069e-4090-921a-16ffe4146269_d58d0e97e47263c054811af9875fee43b3d03fe6_lin'
}

response = requests.request(
    "GET", url, headers=headers, data=payload, files=files)

json_data = json.loads(response.text)

with open(r"json file path", 'w') as outfile:
    json.dump(json_data, outfile)

data = defaultdict()
keyData = {}

for index, item in enumerate(json_data["issues"]):
    keyData['updated'] = item['fields']['updated']
    keyData['status'] = item['fields']['status']['name']
    data[item['key']] = keyData
    keyData = {}

with open(r"json file path", 'w') as outfile:
    json.dump(data, outfile)
