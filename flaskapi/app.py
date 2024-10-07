from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import pymysql


app = Flask(__name__)
CORS(app)


app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:1keepitsimple@localhost/PENZIIdb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

with app.app_context():
    conn = pymysql.connect(host='localhost', user='root', password='1keepitsimple')
    cursor = conn.cursor()
    cursor.execute("CREATE DATABASE IF NOT EXISTS PENZIIdb;")
    cursor.close()
    conn.close()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    age = db.Column(db.Integer,nullable=False)
    messages = db.relationship('Message', backref='user', lazy=True)

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(500), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False) 


with app.app_context():
    db.create_all()  

@app.route('/api/users', methods=['POST'])
def add_user():
    try:
        data = request.json
        new_user = User(username=data['username'], age=data['age']) 
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'id': new_user.id, 'username': new_user.username}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500  # Return error if something goes wrong


@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{'id': user.id, 'username': user.username} for user in users])


@app.route('/api/messages', methods=['POST'])
def create_message():
    try:
        data = request.json
        new_message = Message(content=data['content'],user_id=data['user_id'])
        db.session.add(new_message)
        db.session.commit()
        return jsonify({'success': True, 'message': new_message.content}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/messages', methods=['GET'])
def get_messages():
    messages = Message.query.all()
    return jsonify([{'id': msg.id, 'content': msg.content, 'user_id': msg.user_id} for msg in messages])

if __name__ == '__main__':
    app.run(debug=True)
