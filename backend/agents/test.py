import os
import json
from dotenv import load_dotenv
from crowd_safety_agent import CrowdSafetyAgent

# Load environment variables
load_dotenv()

def main():
    agent = CrowdSafetyAgent()

    # Use Unix-style paths (macOS/Linux)
    folder_path = "data/folderwork/frame_0000_0ms/zones"
    timestamp = "0"

    # Generate summary
    json_report = agent.summarize_frame_as_json(
        folder_path=folder_path,
        timestamp=timestamp
    )

    print(json.dumps(json_report, indent=2))

if __name__ == "__main__":
    main()
