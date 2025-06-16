"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.admin import setup_admin

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200


@api.route("/signup", methods=['POST'])
def signup():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    if not username or not password:
        return jsonify({"msg": "Username and password are required"}), 400

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"msg": "User already exists"}), 409

    new_user = User(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User created successfully", "user_id": new_user.id}), 201


@api.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    if not username or not password:
        return jsonify({"msg": "Username and password required"}), 400

    user = User.query.filter_by(username=username, password=password).first()
    if not user:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id}), 200


@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    user_id = get_jwt_identity()
    return jsonify({"msg": f"Bienvenido usuario {user_id} a la página privada"}), 200


@api.route("/token", methods=["POST"])
def create_token():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(username=username, password=password).first()

    if user is None:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id}), 200
