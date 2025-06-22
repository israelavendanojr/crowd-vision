import os
from dotenv import load_dotenv
from crowd_safety_agent import CrowdSafetyAgent

# Load environment variables from .env
env_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path=os.path.abspath(env_path))

def main():
    try:
        print("Loading Roboflow workspace and vision tools...")
        agent = CrowdSafetyAgent()

        # === Test 2: Get frame caption by index ===
        print("\n--- Frame Caption (Index 0) ---")
        frame_caption = agent.get_frame_caption_by_index(0)
        print(f"Frame: {frame_caption['frame']}")
        print(f"Description: {frame_caption['description']}")

        # === Optional: Get frame index by timestamp ===
        timestamp = 14400
        frame_index = agent.get_frame_index_by_timestamp(timestamp)
        print(f"\nTimestamp {timestamp}ms corresponds to frame index: {frame_index}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
