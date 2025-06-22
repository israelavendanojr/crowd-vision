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
        test_image_path = "backend/data/folderwork/frame_0000_0ms/frame_0000_0ms.jpg"

        print("\n=== Scene Description using Crowd Density")
        full_description = agent.getresponse_grid("backend/data/folderwork/frame_0000_0ms/zones")
        print(full_description)

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
