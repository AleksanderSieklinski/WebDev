from flask import Flask, jsonify, request, Response
from flask_pymongo import PyMongo
import json
from typing import Any
from bson.json_util import dumps
from bson import ObjectId
from flask_cors import CORS
 
class MongoJSONEncoder(json.JSONEncoder):
    def default(self, o: Any) -> Any:
        if isinstance(o, ObjectId):
            return str(o)
        if isinstance(o, datetime):
            return str(o)
        return json.JSONEncoder.default(self, o)
 
app = Flask(__name__, static_url_path='/client')
CORS(app)
app.config["MONGO_URI"] = "mongodb://1sieklinski:pass1sieklinski@172.20.44.25/1sieklinski"
mongo = PyMongo(app)
 
 
@app.route('/stud', methods=['GET'])
def get_stud():
    output = []
    cursor = mongo.db.student.find()
    data_json = MongoJSONEncoder().encode(list(cursor))
    return data_json
     
@app.route('/stud', methods=['POST'])
def add_stud():
    data = request.json
    mongo.db.student.insert_one(data)
    return {'result': 'ok'}, 200
         
         
@app.route('/stud/<id>', methods=['PUT'])
def update_stud(id):
    objId = ObjectId(id)
    data = request.json
    query = { "_id" : objId }
    value = { "$set" : data }
    mongo.db.student.update_one(query, value)
    return {'result':'OK'}, 200     
     
@app.route('/stud/<id>', methods=['DELETE'])
def delete_stud(id):
    objId = ObjectId(id)
    query = { "_id" : objId }
    mongo.db.student.delete_one(query)
    return {'result':'OK'}, 200 
     
if __name__ == '__main__':
    app.run(host='149.156.109.180', port=9013)
