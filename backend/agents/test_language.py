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

        # Get the script's directory and build relative path
        script_dir = os.path.dirname(os.path.abspath(__file__))
        # Go up one level from agents/ to backend/, then to data/
        test_zones_folder = os.path.join(script_dir, "..", "data", "folderwork", "frame_0000_0ms", "zones")
        test_zones_folder = os.path.abspath(test_zones_folder)
        
        print(f"Looking for zones folder at: {test_zones_folder}")
        
        # Check if the folder exists
        if not os.path.exists(test_zones_folder):
            print(f"Error: Folder not found at {test_zones_folder}")
            print("Current working directory:", os.getcwd())
            
            # Debug: show what's available
            parent_dir = os.path.dirname(test_zones_folder)
            if os.path.exists(parent_dir):
                print(f"Contents of {parent_dir}:")
                for item in os.listdir(parent_dir):
                    print(f"  {item}")
            else:
                print(f"Parent directory {parent_dir} also doesn't exist")
                
                # Check data folder
                data_dir = os.path.join(script_dir, "..", "data")
                if os.path.exists(data_dir):
                    print(f"Contents of data directory {os.path.abspath(data_dir)}:")
                    for item in os.listdir(data_dir):
                        print(f"  {item}")
            return

        zone_captions = agent.get_zone_captions(test_zones_folder)
        print("Zone captions:")
        for caption in zone_captions:
            print(f"Zone {caption['zone']}: {caption['description']}")
                
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()