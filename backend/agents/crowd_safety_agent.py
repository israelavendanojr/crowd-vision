from llama_api_client import LlamaAPIClient
from roboflow import Roboflow
from rag_utils import load_vectorstore, search_similar_chunks
import os
import base64
import re
from vision_language_tool import VisionLanguageTool



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
        
        try:
            self.vectorstore_loaded = load_vectorstore()
        except Exception as e:
            print("Load Vector Store Error:", e)
            self.vectorstore_loaded = False

    # This analyzes the crowd for the entire frame
    def _analyze_crowd_density(self, image_path: str) -> str:
        result = self.rfmodel.predict(image_path,confidence=0.01).json()
        
        
        zone_offsets = {
            "zone_0_0": {"x_offset": 0, "y_offset": 0},
            "zone_0_1": {"x_offset": 480, "y_offset": 0},
            "zone_0_2": {"x_offset": 960, "y_offset": 0},
            "zone_0_3": {"x_offset": 1440, "y_offset": 0},
            "zone_1_0": {"x_offset": 0, "y_offset": 255},
            "zone_1_1": {"x_offset": 480, "y_offset": 255},
            "zone_1_2": {"x_offset": 960, "y_offset": 255},
            "zone_1_3": {"x_offset": 1440, "y_offset": 255},
            "zone_2_0": {"x_offset": 0, "y_offset": 511},
            "zone_2_1": {"x_offset": 480, "y_offset": 511},
            "zone_2_2": {"x_offset": 960, "y_offset": 511},
            "zone_2_3": {"x_offset": 1440, "y_offset": 511},
            "zone_3_0": {"x_offset": 0, "y_offset": 766},
            "zone_3_1": {"x_offset": 480, "y_offset": 766},
            "zone_3_2": {"x_offset": 960, "y_offset": 766},
            "zone_3_3": {"x_offset": 1440, "y_offset": 766},
        }

        def adjust_detections_to_global(detections, zone_offsets):
            for det in detections.get("predictions", []):
                zone_name = os.path.splitext(os.path.basename(det["image_path"]))[0]
                if zone_name in zone_offsets:
                    offset = zone_offsets[zone_name]
                    det["x"] += offset["x_offset"]
                    det["y"] += offset["y_offset"]
            return detections
        
        res = adjust_detections_to_global(result,zone_offsets)
        
        return res
    
    # def grid_analyze_crowd(self, folder_path: str) -> str:
    #     """Each Frame is already turned into individual zones, each zone is labeled zone_row_column.png,
    #        We are going to iterate through all the zone images and analyze the density in each and add it all together

    #     Args:
    #         folderpath (str): Folder containing zone images

    #     Returns:
    #         str: description of each folder
    #     """
    #     res = ""
        
    #     ## Getresponse_crowd -> Lookup Guidelings -> Summarize Guideline response
    #     for filename in os.listdir(folder_path):
    #         full_path = os.path.join(folder_path, filename)
    #         crowd_response = self.getresponse_crowd(full_path)
    #         guidelines = self.lookup_guidelines(crowd_response)
    #         res+= self.zone_report(guidelines)
    #     return res
    
    # def getresponse_grid(self, folder_path: str):
        
    #     grid_analysis = self.grid_analyze_crowd(folder_path)

    #     prompt = (
    #         "You are a crowd safety expert analyzing a grid-based surveillance system. Each zone follows 'row_column' format (e.g., zone '0_0' = top-left). "
    #         "Provide comprehensive safety analysis for ALL zones with: 1) Zone-by-zone density assessment (people/m², risk level with detailed justification), "
    #         "2) Movement patterns and bottlenecks, 3) Infrastructure risks and escape routes, 4) Behavioral anomalies and safety concerns, "
    #         "5) Inter-zone correlations and cascade risks, 6) Critical intervention requirements with specific personnel/resource needs, "
    #         "7) Executive summary with overall threat assessment. Format with clear zone headers for operational use by emergency teams.\n\n"
    #         f"GRID ANALYSIS DATA:\n{grid_analysis}\n\n"
    #         "Provide detailed analysis ensuring no zone or safety consideration is overlooked - this data guides life-safety decisions."
    #     )

    #     response = self.client.chat.completions.create(
    #         model="Llama-4-Maverick-17B-128E-Instruct-FP8",
    #         messages=[
    #             {"role": "user", "content": prompt}
    #         ],
    #     )

    #     return response.completion_message.content.text
    
    # def getresponse_crowd(self, image_path: str) -> str:
        
    #     crowd_summary = self._analyze_crowd_density(image_path)  
    #     zone_match = re.search(r'zone_(\d+_\d+)', image_path)
    #     zone_label = zone_match.group(1) if zone_match else "UNKNOWN_ZONE"

    #     prompt = (
    #         f"Analyze surveillance data for zone {zone_label} from computer vision crowd monitoring. Provide comprehensive description including: "
    #         f"1) Spatial layout and infrastructure, 2) Precise crowd density (people/m²) and distribution patterns, 3) Movement flows and directional conflicts, "
    #         f"4) Crowd clustering and social organization, 5) Bottlenecks and movement restrictions, 6) Behavioral indicators and anomalies, "
    #         f"7) Safety risk indicators and stability assessment, 8) Temporal dynamics and trend analysis. "
    #         f"Write 200-300 words with clinical precision for integration with other zone analyses.\n\n"
    #         f"ZONE {zone_label} COMPUTER VISION DATA:\n{crowd_summary}\n\n"
    #         f"Reference zone {zone_label} throughout for spatial correlation with adjacent zones."
    #     )
        
    #     response = self.client.chat.completions.create(
    #         model="Llama-4-Maverick-17B-128E-Instruct-FP8",
    #         messages=[
    #             {"role": "user", "content": prompt}
    #         ],
    #     )
        
    #     return response.completion_message.content.text
        
    def lookup_guidelines(self, situation: str, top_k: int = 3) -> str:
        
        if not self.vectorstore_loaded:
            return "Vector store not found. Please initialize first."

        relevant_chunks = search_similar_chunks(situation, top_k)
        if not relevant_chunks:
            return "No relevant safety guidelines found."

        context = "\n\n".join([chunk['text'] for chunk in relevant_chunks])
        prompt = (
            f"As a safety policy expert, analyze this crowd situation against safety guidelines and provide comprehensive assessment. "
            f"Include: 1) Regulatory compliance analysis with specific violations, 2) Risk threshold comparison to safety standards, "
            f"3) Risk classification by severity and immediacy, 4) Detailed intervention recommendations with personnel/equipment needs, "
            f"5) Emergency response protocol requirements, 6) Preventive measures and monitoring protocols, 7) Technical safety calculations, "
            f"8) Operational decision priorities with implementation timelines. Reference specific guidelines supporting your recommendations.\n\n"
            f"SAFETY GUIDELINES:\n{context}\n\n"
            f"SITUATION ANALYSIS:\n{situation}\n\n"
            f"Provide actionable analysis for immediate use by incident commanders and emergency teams."
        )

        response = self.client.chat.completions.create(
            model="Llama-4-Maverick-17B-128E-Instruct-FP8",
            messages=[{"role": "user", "content": prompt}],
        )

        return response.completion_message.content.text

    # def zone_report(self, detailed_response: str) -> str:
    #     """
    #     Takes a longform safety guideline explanation and summarizes it into key takeaways.
    #     Ideal for alerts or summary sections in a report.
    #     """
    #     prompt = (
    #         f"Extract and organize ALL critical safety data from this analysis for operational use. Preserve complete information for: "
    #         f"1) Zone identification and spatial context, 2) All safety concerns with severity levels, 3) Complete risk assessments and classifications, "
    #         f"4) Behavioral observations and crowd dynamics, 5) All intervention recommendations with timelines/resources, 6) Technical metrics and measurements, "
    #         f"7) Emergency response requirements, 8) Monitoring and follow-up needs. Organize with clear headers for rapid decision-making by emergency personnel. "
    #         f"DO NOT summarize - extract complete detailed information while maintaining zone spatial context throughout.\n\n"
    #         f"DETAILED SAFETY ANALYSIS:\n{detailed_response}\n\n"
    #         f"Structure for integration with other zone reports while preserving all critical safety information."
    #     )

    #     response = self.client.chat.completions.create(
    #         model="Llama-4-Maverick-17B-128E-Instruct-FP8",
    #         messages=[{"role": "user", "content": prompt}],
    #     )

    #     return response.completion_message.content.text

    def get_zone_captions(self, zones_folder_path: str):
        """
        Returns a list of zone descriptions from the vision-language tool.
        Each item is { "zone": zone_id, "description": text }
        """
        results = []

        for filename in sorted(os.listdir(zones_folder_path)):
            if filename.endswith(".png"):
                zone_path = os.path.join(zones_folder_path, filename)
                zone_label = filename.replace(".png", "")
                caption = self.vision_tool.describe_zone(zone_path)
                results.append({
                    "zone": zone_label,
                    "description": caption
                })

        return results

