import os
import base64
from dotenv import load_dotenv
from crowd_safety_agent import CrowdSafetyAgent

# Load environment variables from .env
load_dotenv()

def main():
    #print(os.path.exists(r"backend\data\folderwork\frame_0000_0ms\zones"))
    #print(os.path.exists("backend/data/safety_vector_index.index"))
    try:     
            
        agent = CrowdSafetyAgent()

        print("\n FULL REPORT FOR FRAME 0000")
        full_description = agent.getresponse_grid(r"backend\data\folderwork\frame_0000_0ms\zones")
        print(full_description)
      
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()