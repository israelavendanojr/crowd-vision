from llama_api_client import LlamaAPIClient
from roboflow import Roboflow
from rag_utils import load_vectorstore, search_similar_chunks  # Add this import
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
        self.people = 0

    # This analyzes the crowd for the entire frame
    def _analyze_crowd_density(self, image_path: str) -> str:
        result = self.rfmodel.predict(image_path,confidence=0.01).json()
        predictions = result.get("predictions", [])
        
        # Total people only sees the number of people in this specific frame
        total_people = len(predictions)
        self.people += total_people
        return result
    
    def grid_analyze_crowd(self, folder_path: str) -> str:
        """Each Frame is already turned into individual zones, each zone is labeled zone_row_column.png,
           We are going to iterate through all the zone images and analyze the density in each and add it all together

        Args:
            folderpath (str): Folder containing zone images

        Returns:
            str: description of each folder
        """
        res = ""
        for filename in os.listdir(folder_path):
            full_path = os.path.join(folder_path, filename)
            res+=(self.getresponse_crowd(full_path))
        return res
    
    def getresponse_grid(self, folder_path: str):
        grid_analysis = self.grid_analyze_crowd(folder_path)

        prompt = (
            "You are an expert in public safety, crowd behavior, and spatial analysis.\n\n"
            "You are given a detailed textual report analyzing an image that has been divided into a grid of zones. "
            "Each zone is labeled using the format 'zone_row_column' (e.g., 'zone_2_3' for row 2, column 3), and contains an AI-generated summary "
            "of the visual characteristics and estimated crowd density for that specific region. These zone summaries were created using computer vision and language models, "
            "and describe spatial layout, movement patterns, bottlenecks, and any signs of risk.\n\n"
            "Below is the full zone-by-zone analysis:\n\n"
            f"{grid_analysis}\n\n"
            "Based on this complete spatial and behavioral analysis of the image:\n"
            "- Provide a concise 100-150 word summary of the overall crowd conditions in the entire scene.\n"
            "- Identify any zones with dangerously high crowding or indicators of abnormal movement patterns.\n"
            "- Highlight any patterns across rows or columns that suggest crowd surges, bottlenecks, or unsafe clustering.\n"
            "- Reference specific zone IDs (e.g., 'zone_1_2') when discussing issues.\n"
            "- Prioritize accuracy and detail over brevity.\n"
            "Your goal is to detect early warning signs of potential crowd safety risks using this synthesized zone data."
        )

        response = self.client.chat.completions.create(
            model="Llama-4-Maverick-17B-128E-Instruct-FP8",
            messages=[
                {"role": "user", "content": prompt}
            ],
        )

        return response.completion_message.content.text
    
    def getresponse_crowd(self, image_path: str) -> str:
        
        crowd_summary = self._analyze_crowd_density(image_path)  

        prompt = (
            f"You are an expert in public safety, crowd dynamics, and visual scene interpretation. "
            f"You have been given crowd analysis data for a specific zone within a larger image. "
            f"The zone is identified as: {image_path} (zone_row_column format). "
            f"The data includes a computer vision summary that estimates crowd density and patterns in this zone:\n\n"
            f"{crowd_summary}\n\n"
            f"Using this information, write a detailed, analytical description of this zone (aim for 100+ words). "
            f"Focus on spatial layout, crowd clustering, potential movement bottlenecks, density estimation, and any visual signs of risk (e.g., congestion, blockage, abnormal crowd behavior). "
            f"The description will be used alongside descriptions of other zones for full-scene surge detection and safety assessment, so make your analysis as granular and precise as possible."
        )
        
        response = self.client.chat.completions.create(
            model="Llama-4-Maverick-17B-128E-Instruct-FP8",
            messages=[
                {"role": "user", "content": prompt}
            ],
        )
        
        return response.completion_message.content.text
        
    def lookup_guidelines(self, situation: str, top_k: int = 3) -> str:
        if not load_vectorstore():
            return "Vector store not found. Please initialize first."

        relevant_chunks = search_similar_chunks(situation, top_k)
        if not relevant_chunks:
            return "No relevant safety guidelines found."

        context = "\n\n".join([chunk['text'] for chunk in relevant_chunks])
        prompt = (
            f"You are a safety policy expert analyzing crowd situations. "
            f"Given the safety guidelines below and the situation description, "
            f"offer a detailed response with specific safety recommendations.\n\n"
            f"SAFETY GUIDELINES:\n{context}\n\n"
            f"SITUATION: {situation}\n\n"
            f"Please provide clear, specific safety actions or protocol recommendations."
        )

        response = self.client.chat.completions.create(
            model="Llama-4-Maverick-17B-128E-Instruct-FP8",
            messages=[{"role": "user", "content": prompt}],
        )

        return response.completion_message.content.text