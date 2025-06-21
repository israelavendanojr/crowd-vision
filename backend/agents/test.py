import os
import base64
from dotenv import load_dotenv
from crowd_safety_agent import CrowdSafetyAgent

# Load environment variables from .env
load_dotenv()

def main():
    try:
        agent = CrowdSafetyAgent()

        # Provide path to a test image
        test_image_path = "backend/agents/Medium Crowd Image.png"
        
        # Test crowd density analysis (optional)
        print("=== Crowd Density Analysis ===")
        density = agent._analyze_crowd_density(test_image_path)
        print(density)

        print("\n=== Scene Description using Crowd Density")
        full_description = agent.getresponse(test_image_path)
        print(full_description)

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
