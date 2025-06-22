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

        # print("\n=== Scene Description using Crowd Density")
        # full_description = agent.getresponse_grid("backend/data/folderwork/frame_0000_0ms/zones")
        image_description = agent.getresponse_crowd(test_image_path)
        print(image_description, "\n\n\n\n\n\n")

        print("\n=== Testing RAG Guideline Lookup ===")
        # test_situation = "Sudden loud noises caused people to start running toward the venue perimeter, creating panic."
        result = agent.lookup_guidelines(image_description)
        print("\nResponse from LLaMA:\n")
        print(result)


        print("\n=== Testing RAG Guideline Summary ===")
        result = agent.summarize_guidelines_response(result)
        print("\nResponse from LLaMA:\n")
        print(result)

        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
