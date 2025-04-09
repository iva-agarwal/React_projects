from flask import Flask, request, jsonify
from flask_cors import CORS

app=Flask(__name__)
CORS(app)

todos=[]

@app.route("/todos", methods=['GET'])
def get_todos():
    return jsonify(todos)

@app.route("/add-todo",methods=['POST'])
def add_todo():
    data = request.get_json()
    new_todo ={
        "id": len(todos) + 1,
        "text": data.get("text", ""),
        "completed": False
    }
    todos.append(new_todo)
    return jsonify(new_todo), 201

@app.route("/todos/<int:todo_id>", methods=['PUT'])
def toggle_todo(todo_id):
    for todo in todos:
        if todo['id']==todo_id:
            todo['completed']=not todo['completed']
            return jsonify(todo)
    return jsonify('error'), 404

if __name__ == "__main__":
    app.run(debug=True)