import os
import json
from dotenv import load_dotenv
from crowd_safety_agent import CrowdSafetyAgent

load_dotenv()

def get_all_frame_folders(base_path):
    return sorted([
        os.path.join(base_path, frame_folder)
        for frame_folder in os.listdir(base_path)
        if os.path.isdir(os.path.join(base_path, frame_folder))
    ])

def main():
    agent = CrowdSafetyAgent()
    base_folder = "data/folderwork"  # contains frame_0000_0ms, etc.
    output_folder = "frame_reports"

    os.makedirs(output_folder, exist_ok=True)

    frame_folders = get_all_frame_folders(base_folder)

    for i, frame_path in enumerate(frame_folders):
        if i % 3 != 0: 
            continue

        print(f"Processing frame {i}: {frame_path}")

        zone_folder = os.path.join(frame_path, "zones")
        timestamp = int(frame_path.split("_")[-1].replace("ms", "")) / 1000        

        try:
            json_result = agent.summarize_frame_as_json(
                folder_path=zone_folder,
                timestamp=timestamp
            )
            json_result["frame_index"] = i

            # Save individual JSON file
            frame_id = os.path.basename(frame_path)
            out_path = os.path.join(output_folder, f"{frame_id}.json")
            with open(out_path, "w", encoding="utf-8") as f:
                json.dump(json_result, f, indent=2)

            print(f"✅ Saved: {out_path}")

        except Exception as e:
            print(f"❌ Error processing {frame_path}: {e}")

    print("🎉 All frames processed and saved individually.")

if __name__ == "__main__":
    main()
