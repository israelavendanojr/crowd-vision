from llama_api_client import LlamaAPIClient
from roboflow import Roboflow
import os
import base64


class CrowdSafetyAgent:
    def __init__(self):
        self.client = LlamaAPIClient(
            api_key=os.getenv("LLAMA_API_KEY"),
            base_url=os.getenv("base_url"),
        )
        self.rf = Roboflow(api_key=os.getenv("ROBOFLOW_API_KEY"))
        self.project = self.rf.workspace().project("visao-computacional-ywewq")
        self.rfmodel = self.project.version(15).model  

    def _analyze_crowd_density(self, image_path: str) -> str:
        result = self.rfmodel.predict(image_path,confidence=0.01).json()
        predictions = result.get("predictions", [])
        
        # Total people only sees the number of people in this specific frame
        total_people = len(predictions)
        return result
    
    def getresponse(self, image_path: str, analyze_crowd: bool = False) -> str:
        
        crowd_summary = self._analyze_crowd_density(image_path)  

        prompt = (
            f"You are an expert in public safety and visual analysis. "
            f"Given the following information extracted from an image, provide a 100-word detailed scene description "
            f"and assess if there are any signs of overcrowding or safety risks.\n\n"
            f"{crowd_summary}"
        )
        
        response = self.client.chat.completions.create(
            model="Llama-4-Maverick-17B-128E-Instruct-FP8",
            messages=[
                {"role": "user", "content": prompt}
            ],
        )
        
        return response.completion_message.content.text
        