from flask import Flask
from dotenv import load_dotenv
import os

# Load .env variables
load_dotenv()

from agents.crowd_safety_agent import CrowdSafetyAgent
from routes.main_routes import main_routes
from routes.crowd_routes import crowd_routes

def create_app():
    app = Flask(__name__)
    
    app.config['DEBUG'] = os.getenv('DEBUG', 'True').lower() == 'true'
    app.config['LLAMA_API_KEY'] = os.getenv('LLAMA_API_KEY')
    app.config['LLAMA_BASE_URL'] = os.getenv('LLAMA_BASE_URL')
    
    app.register_blueprint(main_routes)
    app.register_blueprint(crowd_routes)
    
    return app

app = create_app()

agent = CrowdSafetyAgent(
    api_key=app.config['LLAMA_API_KEY'],
    base_url=app.config['LLAMA_BASE_URL']
)

if __name__ == '__main__':
    app.run(
        debug=app.config['DEBUG'],
        host='0.0.0.0',
        port=int(os.getenv('PORT', 5001))
    )
