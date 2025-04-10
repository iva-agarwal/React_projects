from flask import Flask, request, jsonify
from flask_cors import CORS

app=Flask(__name__)
CORS(app)

notes=[]
note_id=1

@app.route('/notes',methods=['GET'])
def get_notes():
    return jsonify(notes)

@app.route('/notes/<int:id>', methods=['GET'])
def get_note(id):
    note = next((note for note in notes if note['id']==id), None)
    if note:
        return jsonify(note)
    return jsonify({"error":"note not found"}), 404

@app.route('/notes', methods=['POST'])
def create_note():
    global note_id
    data= request.get_json()
    note={
        'id':note_id,
        'title':data.get('title'),
        'content':data.get('content')
    }
    notes.append(note)
    note_id += 1
    return jsonify(note), 201

@app.route('/note/<int:id>', methods=['PUT'])
def update_note(id):
    data = request.get_json()
    
    for note in notes:
        if note['id']==id:
            note['title']=data.get('title', note['title'])
            note['content']= data.get('content', note['content'])
            return jsonify(note)
    return jsonify({'error':'note not found'}), 404

@app.route('/note/<int:id>', methods=['DELETE'])
def del_note(id):  
    global notes
    notes = [note for note in notes if note['id'] != id]  
    return jsonify({"message": "Note deleted"}), 200  


if __name__ == '__main__':
    app.run(debug=True)