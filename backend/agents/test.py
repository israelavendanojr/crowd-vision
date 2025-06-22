import os
import base64
from dotenv import load_dotenv
from crowd_safety_agent import CrowdSafetyAgent
import base64
from roboflow import Roboflow

# Load environment variables
load_dotenv()


def main():
    agent = CrowdSafetyAgent()

    report = agent.getresponse_grid(r"backend\data\folderwork\frame_0000_0ms\zones")

    report_path = "frame_0000_maxspeed_report.txt"

    with open(report_path, "w", encoding="utf-8") as f:
        f.write(report)

    print(f"Report saved to: {report_path}")

if __name__ == "__main__":
    main()
