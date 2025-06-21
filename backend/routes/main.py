from flask import Blueprint

main_routes = Blueprint('main_routes', __name__)

@main_routes.route('/api/')
def home():
    return {"message": "Hello, from the backend!!"}
