from llama_api_client import LlamaAPIClient
from roboflow import Roboflow
from rag_utils import load_vectorstore, search_similar_chunks
import os
import base64
import re

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
        
        ## Getresponse_crowd -> Lookup Guidelings -> Summarize Guideline response
        for filename in os.listdir(folder_path):
            full_path = os.path.join(folder_path, filename)
            crowd_response = self.getresponse_crowd(full_path)
            guidelines = self.lookup_guidelines(crowd_response)
            res+= self.zone_report(guidelines)
        return res
    
    def getresponse_grid(self, folder_path: str):
        
        grid_analysis = self.grid_analyze_crowd(folder_path)

        prompt = (
            "You are a specialist in crowd safety, spatial behavior, and public event risk assessment.\n\n"
            "The data below represents the output of an AI-based crowd analysis system that has divided a crowd image into labeled zones. "
            "Each zone is identified in 'row_column' format (e.g., '2_3') and includes descriptions of crowd density, behavior, and spatial features.\n\n"

            "Input:\n"
            f"{grid_analysis}\n\n"

            "Your task is to produce a detailed diagnostic safety report. Specifically:\n"
            "1. For **each zone**, provide a thorough safety analysis including:\n"
            "   - Crowd density level and classification (e.g., sparse, moderate, high, critical).\n"
            "   - Observed movement behavior (e.g., static, flowing, erratic, bidirectional).\n"
            "   - Any visible risks (e.g., clustering near exits, compression zones, obstructions, escape route issues).\n"
            "   - Behavioral anomalies (e.g., unusual gathering, panic movement, restricted flow).\n"
            "   - Degree of concern: Low / Moderate / High / Critical — and justify it.\n"
            "2. Then provide a **spatial inference section** that detects:\n"
            "   - Neighboring zones with correlated risk behavior (e.g., forming pressure corridors or buildup zones).\n"
            "   - Patterns that could evolve into crowd surges, bottlenecks, or panic conditions.\n"
            "   - Any directional or multi-zone trends (e.g., crowd flowing diagonally, buildup along a row).\n"
            "3. Finally, clearly flag any **zones needing immediate intervention** with a label like: [CRITICAL ZONE: 3_2] and explain why.\n\n"
            "Be extremely detailed, objective, and systematic. Do not summarize. Use clear zone-by-zone headers. This is for operational use by safety managers and emergency planners."
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

            f"You are also provided with zone-specific visual analysis generated by a computer vision system. "
            f"The zone data includes estimated crowd density and descriptive insights, written to reflect what a trained observer might infer from surveillance footage.\n\n"

            f"Interpret this data as if conducting an on-site crowd safety inspection. "
            f"Consider common safety principles such as safe crowd density thresholds, bottleneck formation, spatial layout, and access or egress issues. "
            f"Think carefully about risks, anomalies, and how the scene aligns with or violates standard safety protocols.\n\n"

            f"SAFETY GUIDELINES:\n{context}\n\n"
            f"SITUATION:\n{situation}\n\n"

            f"Your goal is to extract and convey every relevant insight related to safety concerns, risk assessment, and possible intervention strategies. "
            f"Be specific and practical — imagine your analysis will inform real-time decisions by event security teams."
        )


        response = self.client.chat.completions.create(
            model="Llama-4-Maverick-17B-128E-Instruct-FP8",
            messages=[{"role": "user", "content": prompt}],
        )

        return response.completion_message.content.text

    def zone_report(self, detailed_response: str) -> str:
        """
        Takes a longform safety guideline explanation and summarizes it into key takeaways.
        Ideal for alerts or summary sections in a report.
        """
        prompt = (
            "You are an expert focused on safety and crowd control operations.\n\n"
            "Given the detailed safety report below, extract as much information as possible.\n\n"
            "Include things such as:\n"
            "- Identify the main safety concern(s)\n"
            "- Highlight any specific zones, behaviors, or anomalies\n"
            "- Recommend key actions, briefly\n"
            "- Indicate the overall risk level (low/moderate/high) if possible\n\n"
            "Be precise and useful. Avoid repeating filler language from the original text.\n\n"
            f"DETAILED SAFETY REPORT:\n{detailed_response}\n\n"
        )

        response = self.client.chat.completions.create(
            model="Llama-4-Maverick-17B-128E-Instruct-FP8",
            messages=[{"role": "user", "content": prompt}],
        )

        return response.completion_message.content.text
