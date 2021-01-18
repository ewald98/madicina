import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

import json

cred = credentials.Certificate("key.json")
default_app = firebase_admin.initialize_app(cred)

db = firestore.client()

questions = db.collection(u'questions_chir').get()
dict = {el.id: el.to_dict() for el in questions}
# print(json.dumps(dict, sort_keys=True, indent=4))

with open('questions_chir.txt', 'w') as json_file:
    json.dump(dict, json_file, sort_keys=True, indent=4)
