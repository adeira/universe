import requests
import json
import csv

user = "XXXXX"
password = "YYYYY"
headers = {}
json_data = {
    'username': user,
    'password': password,
}
login = requests.post('https://elis.rossum.ai/api/v1/auth/login', headers=headers, json=json_data)
token = json.loads(login.text)["key"]
domain = json.loads(login.text)["domain"]

CH_queue = '1588863'
DE_queue = '1343470'
DK_queue = '1343471'
FR_queue = '1343472'
GBC_queue = '1345635'
IE_queue = '1345570'

headers = {
    'Authorization': 'Bearer {}'.format(token),
}

get_annotations = json.loads(requests.get('https://{}/api/v1/annotations?queue={}'.format(domain, CH_queue), headers=headers).text)

annotations = get_annotations["results"]
next_page = get_annotations["pagination"]["next"]

while next_page:
    next_annotations = json.loads(requests.get(next_page, headers=headers).text)
    annotations += next_annotations["results"]
    next_page = next_annotations["pagination"]["next"]

annotation_jsons = []
automated = 0
schema_header = [
    'doc_url',
    'pages',
    'automated',
    'document_type',
    'document_type_score',
    'invoice_number',
    'invoice_number_score',
    'date_issue',
    'date_issue_score',
    'account_number',
    'account_number_score',
    'bank_number',
    'bank_number_score',
    'iban',
    'iban_score',
    'bic',
    'bic_score',
    'payment_reference',
    'payment_reference_score',
    'amount_base',
    'amount_base_score',
    'amount_tax',
    'amount_tax_score',
    'amount_total',
    'amount_total_score',
    'currency',
    'currency_score',
    'entity_name',
    'entity_name_score',
    'vendor_name',
    'vendor_name_score',
    'vendor_address',
    'vendor_address_score',
    'vendor_vat',
    'vendor_vat_score',
    'requestor',
    'requestor_score'
                 ]
for annotation in annotations:
    blockers = {}
    if annotation["automated"]:
        automated += 1
    blocker_url = annotation["automation_blocker"]
    if blocker_url:
        blockers = json.loads(requests.get(blocker_url, headers=headers).text)
    content_url = annotation["content"]
    content = json.loads(requests.get(content_url, headers=headers).text)
    if content["results"]:
        clean_annotation = {
            "doc_url": annotation["document"],
            "pages": len(annotation["pages"]),
            "automated": annotation["automated"],
            "document_type": content["results"][0]["children"][0]["content"]["value"],
            "document_type_score": content["results"][0]["children"][0]["content"]["rir_confidence"],
            "invoice_number": content["results"][0]["children"][1]["content"]["value"],
            "invoice_number_score": content["results"][0]["children"][1]["content"]["rir_confidence"],
            "date_issue": content["results"][0]["children"][2]["content"]["value"],
            "date_issue_score": content["results"][0]["children"][2]["content"]["rir_confidence"],
            "account_number": content["results"][1]["children"][0]["content"]["value"],
            "account_number_score": content["results"][1]["children"][0]["content"]["rir_confidence"],
            "bank_number": content["results"][1]["children"][1]["content"]["value"],
            "bank_number_score": content["results"][1]["children"][1]["content"]["rir_confidence"],
            "iban": content["results"][1]["children"][2]["content"]["value"],
            "iban_score": content["results"][1]["children"][2]["content"]["rir_confidence"],
            "bic": content["results"][1]["children"][4]["content"]["value"],
            "bic_score": content["results"][1]["children"][4]["content"]["rir_confidence"],
            "payment_reference": content["results"][1]["children"][7]["content"]["value"],
            "payment_reference_score": content["results"][1]["children"][7]["content"]["rir_confidence"],
            "amount_base": content["results"][2]["children"][0]["content"]["value"],
            "amount_base_score": content["results"][2]["children"][0]["content"]["rir_confidence"],
            "amount_tax": content["results"][2]["children"][1]["content"]["value"],
            "amount_tax_score": content["results"][2]["children"][1]["content"]["rir_confidence"],
            "amount_total": content["results"][2]["children"][2]["content"]["value"],
            "amount_total_score": content["results"][2]["children"][2]["content"]["rir_confidence"],
            "currency": content["results"][2]["children"][3]["content"]["value"],
            "currency_score": content["results"][2]["children"][3]["content"]["rir_confidence"],
            "entity_name": content["results"][3]["children"][7]["content"]["value"],
            "entity_name_score": content["results"][3]["children"][7]["content"]["rir_confidence"],
            "vendor_name": content["results"][3]["children"][0]["content"]["value"],
            "vendor_name_score": content["results"][3]["children"][0]["content"]["rir_confidence"],
            "vendor_address": content["results"][3]["children"][1]["content"]["value"],
            "vendor_address_score": content["results"][3]["children"][1]["content"]["rir_confidence"],
            "vendor_vat":  content["results"][3]["children"][4]["content"]["value"],
            "vendor_vat_score": content["results"][3]["children"][4]["content"]["rir_confidence"],
            "requestor": content["results"][3]["children"][16]["content"]["value"],
            "requestor_score": content["results"][3]["children"][16]["content"]["rir_confidence"]

    }
    annotation_jsons.append(clean_annotation)

with open('CH.csv', 'w', encoding='UTF8') as f:
    w = csv.DictWriter(f, schema_header)
    w.writeheader()
    w.writerows(annotation_jsons)
