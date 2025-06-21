from flask import Flask
from agents.crowd_safety_agent import CrowdSafetyAgent
from routes.main_routes import main_bp
from routes.crowd_routes import crowd_bp
import os

def create_app():
    """Application factory pattern"""
    app = Flask(__name__)
    
    # Configuration
    app.config['DEBUG'] = os.getenv('DEBUG', 'True').lower() == 'true'
    app.config['LLAMA_API_KEY'] = os.getenv('LLAMA_API_KEY', 'your-api-key-here')
    app.config['LLAMA_BASE_URL'] = os.getenv('LLAMA_BASE_URL', 'https://api.your-provider.com/v1')
    
    # Register blueprints
    app.register_blueprint(main_bp)
    app.register_blueprint(crowd_bp)
    
    return app

# Initialize Flask app
app = create_app()

# Initialize the agent (global instance for hackathon simplicity)
agent = CrowdSafetyAgent(
    api_key=app.config['LLAMA_API_KEY'],
    base_url=app.config['LLAMA_BASE_URL']
)

if __name__ == '__main__':
    app.run(
        debug=app.config['DEBUG'],
        host='0.0.0.0',
        port=int(os.getenv('PORT', 5000))
    )