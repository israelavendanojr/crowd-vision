import os
from dotenv import load_dotenv
from crowd_safety_agent import CrowdSafetyAgent

# Load environment variables from .env
env_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path=os.path.abspath(env_path))

def main():
    try:
        print("loading Roboflow workspace...")
        agent = CrowdSafetyAgent()


        test_image_path = "data/folderwork/frame_0000_0ms/zones/zone_0_1.png"

        zone_captions = agent.get_zone_captions(test_image_path)
        print(zone_captions)
                
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
