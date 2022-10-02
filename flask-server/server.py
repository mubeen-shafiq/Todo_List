import json
from flask import Flask, render_template, request, redirect, url_for, jsonify, json
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://mubeen:mytodo123@localhost/todo_app_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable = False)

    def __str__(self) -> str:
        return f"{self.id} {self.content}"

def todo_serializer(todo):
    return{
        "id": todo.id,
        "content": todo.content
    }

@app.route('/api')
def name():
    return jsonify([*map(todo_serializer, Todo.query.all())])

@app.route('/api/create', methods = ['POST'])
def create():
    request_data = json.loads(request.data)
    todo = Todo(content = request_data['content'])
    db.session.add(todo)
    db.session.commit()

    return {'201': 'Todo created sucessfully!'}

@app.route('/api/<int:id>')
def show(id):
    return jsonify([*map(todo_serializer, Todo.query.filter_by(id = id))])

@app.route('/api/<int:id>', methods = ['POST'])
def delete(id):
    request_data = json.loads(request.data)
    Todo.query.filter_by(id = request_data['id']).delete()
    db.session.commit()

    return{'204': 'Deleted Successfully!'}

@app.route('/api/<int:id>/update', methods = ['POST'])
def update(id):
    request_data = json.loads(request.data)
    Todo.query.filter_by(id = request_data['id']).first()
    db.session.commit()

    return {'302': 'Updated Successfully!'}

if __name__ == "__main__":
    app.run(debug = True)

# @app.get("/")
# def home():
#     todo_list = db.session.query(Todo).all()
#     return render_template("index.html", todo_list=todo_list)


# @app.post("/add")
# def add():
#     title = request.form.get("title")
#     new_todo = Todo(title=title, complete=False)
#     db.session.add(new_todo)
#     db.session.commit()
#     return redirect(url_for("home"))

# @app.get("/update/<int:todo_id>")
# def update(todo_id):
#     todo = db.session.query(Todo).filter(Todo.id == todo_id).first()
#     todo.complete = not todo.complete
#     db.session.commit()
#     return redirect(url_for("home"))

# @app.get("/delete/<int:todo_id>")
# def delete(todo_id):
#     todo = db.session.query(Todo).filter(Todo.id == todo_id).first()
#     db.session.delete(todo)
#     db.session.commit()
#     return redirect(url_for("home"))
