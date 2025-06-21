from flask import Blueprint, jsonify

main_routes = Blueprint('main_routes', __name__)

@main_routes.route('/api/')
def home():
    return {"message": "Hello, from the backend!!"}

@main_routes.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "agent": "crowd_safety_agent"})

@main_routes.route('/', methods=['GET'])
def index():
    """API info endpoint"""
    return jsonify({
        "name": "Crowd Safety AI Agent",
        "version": "1.0.0",
        "endpoints": {
            "POST /analyze-crowd": "Analyze crowd footage for safety risks",
            "GET /test-tools": "Test all agent tools",
            "GET /health": "Health check"
        }
    })