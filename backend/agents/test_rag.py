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

        print("\n=== Testing RAG Guideline Lookup ===")
        test_situation = "There is a large crowd moving quickly toward the exit with limited space available."
        result = agent.lookup_guidelines(test_situation)
        print("\nResponse from LLaMA:\n")
        print(result)

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
