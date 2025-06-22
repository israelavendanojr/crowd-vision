from llama_api_client import LlamaAPIClient
from roboflow import Roboflow
from rag_utils import load_vectorstore, search_similar_chunks
import os
import base64
import re
from concurrent.futures import ThreadPoolExecutor
import json

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
        try:
            result = self.rfmodel.predict(image_path, confidence=0.08).json()
            return result
        except Exception as e:
            print(f"Prediction failed for image {image_path}: {e}")
            raise e

        if not os.path.exists(image_path):
            raise FileNotFoundError(f"Missing image file: {image_path}")
        else:
            print(f"Sending image to Roboflow: {image_path}")
        
        
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


    def process_zone(self, full_path):
        crowd_response = self.getresponse_crowd(full_path)
        guidelines = self.lookup_guidelines(crowd_response)
        return self.zone_report(guidelines)

    def grid_analyze_crowd(self, folder_path: str) -> str:
        """Each Frame is already turned into individual zones, each zone is labeled zone_row_column.png,
           We are going to iterate through all the zone images and analyze the density in each and add it all together

        Args:
            folderpath (str): Folder containing zone images

        Returns:
            str: description of each folder
        """
        res = ""
        # 8 MAX WORKERS is the fastest Speed
        with ThreadPoolExecutor(max_workers=8) as executor:
            futures = []
            for filename in os.listdir(folder_path):
                full_path = os.path.join(folder_path, filename)
                futures.append(executor.submit(self.process_zone, full_path))
            for future in futures:
                res += future.result()
        return res
    
    def getresponse_grid(self, folder_path: str):
        
        grid_analysis = self.grid_analyze_crowd(folder_path)

        prompt = (
            "You are a crowd safety expert analyzing a grid-based surveillance system. Each zone follows 'row_column' format (e.g., zone '0_0' = top-left). "
            "Provide comprehensive safety analysis for ALL zones with: 1) Zone-by-zone density assessment (people/m², risk level with detailed justification), "
            "2) Movement patterns and bottlenecks, 3) Infrastructure risks and escape routes, 4) Behavioral anomalies and safety concerns, "
            "5) Inter-zone correlations and cascade risks, 6) Critical intervention requirements with specific personnel/resource needs, "
            "7) Executive summary with overall threat assessment. Format with clear zone headers for operational use by emergency teams.\n\n"
            f"GRID ANALYSIS DATA:\n{grid_analysis}\n\n"
            "Provide detailed analysis ensuring no zone or safety consideration is overlooked - this data guides life-safety decisions."
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
        zone_match = re.search(r'zone_(\d+_\d+)', image_path)
        zone_label = zone_match.group(1) if zone_match else "UNKNOWN_ZONE"
        
        scene_description = "#The image presents an aerial view of a bustling night market, characterized by a grid-like layout of stalls and vendors. The scene is illuminated by a multitude of lights, creating a vibrant and dynamic atmosphere. Key Features: Grid Layout: The market is organized into a grid pattern, with rows and columns of stalls and vendors. Crowd Density: The area is densely populated, with a large number of people visible throughout the market.Lighting: The scene is brightly lit, with a variety of light sources, including overhead lighting, stall lights, and possibly streetlights.Stall Variety: The stalls appear to be diverse, with different colors, shapes, and sizes, suggesting a range of products and services being offered. Motorcycles: Many motorcycles are parked throughout the market, indicating that they are a common mode of transportation for attendees. Basketball Courts: Two basketball courts are visible on the right side of the image, suggesting that the market is located in a public park or recreational area. Visual Cues: The image is taken from directly above, providing a bird's-eye view of the market. The lighting is predominantly artificial, with a warm orange glow emanating from the left side of the image. The crowd is densely packed, with people visible in every direction. The stalls and vendors are arranged in a seemingly organized manner, with clear pathways between them. Relevant Information for Llama: The image suggests a high level of activity and energy, with a large crowd and a variety of vendors and stalls. The grid layout and organized arrangement of stalls imply a well-planned and managed event. The presence of motorcycles and basketball courts provides context about the surrounding environment and the demographics of the attendees. The image could be used to analyze crowd behavior, vendor distribution, and market dynamics, among other aspects.By examining this image, Llama can gain insights into the characteristics of a night market, including its layout, crowd density, and vendor diversity. This information can be used to inform reasoning about the features encoded in a video feed that looks like this, such as object detection, crowd tracking, and scene understanding"
        
        prompt = (
            f"Analyze surveillance data for zone {zone_label} from computer vision crowd monitoring. "
            f"This scene is part of a larger environment described as: {scene_description}\n\n"
            f"Provide a comprehensive description including: "
            f"1) Spatial layout and infrastructure, 2) Precise crowd density (people/m²) and distribution patterns, 3) Movement flows and directional conflicts, "
            f"4) Crowd clustering and social organization, 5) Bottlenecks and movement restrictions, 6) Behavioral indicators and anomalies, "
            f"7) Safety risk indicators and stability assessment, 8) Temporal dynamics and trend analysis. "
            f"Write 200–300 words with clinical precision for integration with other zone analyses.\n\n"
            f"ZONE {zone_label} COMPUTER VISION DATA:\n{crowd_summary}\n\n"
            f"Reference zone {zone_label} throughout for spatial correlation with adjacent zones."
        )

        
        response = self.client.chat.completions.create(
            model="Llama-4-Maverick-17B-128E-Instruct-FP8",
            messages=[
                {"role": "user", "content": prompt}
            ],
        )
        
        return response.completion_message.content.text
        
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

    def zone_report(self, detailed_response: str) -> str:
        """
        Takes a longform safety guideline explanation and summarizes it into key takeaways.
        Ideal for alerts or summary sections in a report.
        """
        prompt = (
            f"Extract and organize ALL critical safety data from this analysis for operational use. Preserve complete information for: "
            f"1) Zone identification and spatial context, 2) All safety concerns with severity levels, 3) Complete risk assessments and classifications, "
            f"4) Behavioral observations and crowd dynamics, 5) All intervention recommendations with timelines/resources, 6) Technical metrics and measurements, "
            f"7) Emergency response requirements, 8) Monitoring and follow-up needs. Organize with clear headers for rapid decision-making by emergency personnel. "
            f"DO NOT summarize - extract complete detailed information while maintaining zone spatial context throughout.\n\n"
            f"DETAILED SAFETY ANALYSIS:\n{detailed_response}\n\n"
            f"Structure for integration with other zone reports while preserving all critical safety information."
        )

        response = self.client.chat.completions.create(
            model="Llama-4-Maverick-17B-128E-Instruct-FP8",
            messages=[{"role": "user", "content": prompt}],
        )

        return response.completion_message.content.text

    def summarize_frame_as_json(self, folder_path: str, timestamp: str = None):
        """
        Generates a complete JSON summary of a frame for frontend display.
        """
        # 1. Frame metadata
        summary = self.getresponse_grid(folder_path)
        guidelines = self.lookup_guidelines(summary)

        frame_id = os.path.basename(os.path.dirname(folder_path))

        # 2. Prompt to LLM
        prompt = (
            f"You are a safety analytics agent generating JSON for a crowd monitoring dashboard.\n"
            f"Using both the visual analysis and the safety policy reasoning below, generate a structured JSON with these fields:\n\n"
            f"FRAME VISUAL ANALYSIS:\n{summary}\n\n"
            f"SAFETY POLICY ANALYSIS:\n{guidelines}\n\n"
            f"- risk_level (High/Medium/Low)\n"
            f"- risk_trend (Stable/Increasing/Decreasing — infer from context)\n"
            f"- hot_zones (list of zone IDs in format 'Zone 1_2', not just '1_2')\n"
            f"- insights (string of comma-separated safety observations)\n"
            f"- flags (list of bold alert strings like EMERGENCY CROWD - CRUSH RISK)\n"
            f"- protocol (summary of recommended response strategy)\n"
            f"- summary (3–5 sentence analysis of the situation in clinical tone)\n\n"
            f"Respond ONLY in raw JSON. DO NOT include code blocks or explanations. Example:\n"
            f'{{"risk_level": "High", "risk_trend": "Stable", "hot_zones": ["Zone 1_2"], "insights": "...", "flags": [...], "protocol": "...", "summary": "...", ...}}'
        )

        # 3. Call LLM
        response = self.client.chat.completions.create(
            model="Llama-4-Maverick-17B-128E-Instruct-FP8",
            messages=[{"role": "user", "content": prompt}],
        )
        raw_output = response.completion_message.content.text

        # 4. Cleanup
        cleaned_output = re.sub(r"^```(?:json)?\s*|```$", "", raw_output.strip(), flags=re.MULTILINE).strip()
        try:
            json_response = json.loads(cleaned_output)
        except json.JSONDecodeError as e:
            print("JSON parse error:", e)
            return {"error": "Invalid JSON from LLM"}

        # 5. Inject required metadata
        json_response["id"] = frame_id
        json_response["time_stamp"] = timestamp or "unknown"
        json_response["frame_summary"] = json_response.get("summary", "")
        json_response["image"] = "./backend/data/test_video_4k.mp4"

        # 6. Fix zone formatting if necessary
        if "hot_zones" in json_response:
            json_response["hot_zones"] = [f"Zone {z}" if not z.startswith("Zone ") else z for z in json_response["hot_zones"]]

        return json_response