from flask import Blueprint, request, jsonify
import json

crowd_routes = Blueprint('crowd', __name__)

@crowd_routes.route('/analyze-crowd', methods=['POST'])
def analyze_crowd():
    """Main endpoint for crowd safety analysis"""
    try:
        from app import agent  # Import agent from main app
        
        data = request.get_json()
        image_data = data.get('image_data', '')
        context = data.get('context', '')
        
        if not image_data:
            return jsonify({"error": "No image data provided"}), 400
        
        # Run the crowd safety analysis
        result = agent.analyze_crowd_footage(image_data, context)
        return jsonify(result)
        
    except Exception as e:
        return jsonify({"error": f"Analysis failed: {str(e)}"}), 500

@crowd_routes.route('/test-tools', methods=['GET'])
def test_tools():
    """Test all three tools individually"""
    try:
        from app import agent  # Import agent from main app
        
        # Test each tool with dummy data
        density_result = agent._analyze_crowd_density("test_image_data")
        scene_result = agent._describe_scene("test_image_data")  
        guidelines_result = agent._lookup_safety_guidelines("high density crowd situation")
        
        return jsonify({
            "status": "all_tools_working",
            "tools": {
                "crowd_density": json.loads(density_result),
                "scene_description": json.loads(scene_result),
                "safety_guidelines": json.loads(guidelines_result)
            }
        })
    except Exception as e:
        return jsonify({"error": f"Tool test failed: {str(e)}"}), 500

