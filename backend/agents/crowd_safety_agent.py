# agents/crowd_safety_agent.py
from langchain.agents import Tool, AgentExecutor, create_react_agent
from langchain_openai import ChatOpenAI  # We'll use this for Llama 4 API
from langchain.prompts import PromptTemplate
from typing import List, Dict, Any
import json
import os
from datetime import datetime
from roboflow import RoboFlow

class CrowdSafetyAgent:
    def __init__(self, api_key: str, base_url: str = None):
        """Initialize the Crowd Safety Agent with Llama 4 API"""
        # Configure for Llama 4 API - adjust base_url as needed for your provider
        self.llm = ChatOpenAI(
            api_key=os.getenv("LLAMA_API_KEY"),
            model="llama-4",  # Adjust model name as provided
            base_url=base_url,  # Set this to your Llama 4 API endpoint
            temperature=0.1
        )
        self.tools = self._create_tools()
        self.agent = self._create_agent()
        self.agent_executor = AgentExecutor(
            agent=self.agent,
            tools=self.tools,
            verbose=True,
            max_iterations=5,
            handle_parsing_errors=True
        )
        
        # Create Roboflow model
        self.rf = RoboFlow(api_key=os.getenv("ROBOFLOW_API_KEY"))
        self.project = self.rf.workspace().project("visao-computacional-ywewq")
        self.model = self.project.version(15).model     
    
    def _create_tools(self) -> List[Tool]:
        """Create the three required tools for crowd safety analysis"""
        tools = [
            Tool(
                name="analyze_crowd_density",
                description="Analyzes crowd density from image/video data using computer vision. Input: base64 encoded image or video path. Returns density metrics, people count, and movement patterns.",
                func=self._analyze_crowd_density
            ),
            Tool(
                name="describe_scene",
                description="Converts visual data to detailed text description of crowd behavior, emotions, and activities using CV-to-language pipeline. Input: base64 encoded image or video path.",
                func=self._describe_scene
            ),
            Tool(
                name="lookup_safety_guidelines",
                description="Retrieves relevant safety guidelines and protocols using RAG pipeline. Input: situation description or specific safety query.",
                func=self._lookup_safety_guidelines
            )
        ]
        return tools
    
    def _create_agent(self):
        """Create the ReAct agent with crowd safety focus"""
        template = """You are a Crowd Safety AI Agent that analyzes crowd situations to detect potential dangers.

Your mission: Analyze crowd footage/images to identify safety risks and provide actionable recommendations.

Process:
1. First, analyze crowd density to get quantitative metrics
2. Then, describe what's happening in the scene to understand crowd behavior  
3. Look up relevant safety guidelines based on the situation
4. Provide a comprehensive safety assessment with risk level and recommendations

Available tools:
{tools}

Use this format:

Question: the input question you must answer
Thought: you should always think about what to do
Action: the action to take, should be one of [{tool_names}]
Action Input: the input to the action
Observation: the result of the action
... (this Thought/Action/Action Input/Observation can repeat N times)
Thought: I now know the final answer
Final Answer: the final answer to the original input question

Question: {input}
Thought: {agent_scratchpad}"""

        prompt = PromptTemplate(
            template=template,
            input_variables=["input", "agent_scratchpad"],
            partial_variables={
                "tools": "\n".join([f"{tool.name}: {tool.description}" for tool in self.tools]),
                "tool_names": ", ".join([tool.name for tool in self.tools])
            }
        )
        
        return create_react_agent(self.llm, self.tools, prompt)
    
    # Tool implementations - replace these with your actual CV/RAG pipelines
    def _analyze_crowd_density(self, image_path: str) -> str:
        
        result = self.model.predict(image_path,confidence=0.01).json()
        return result
        
        
    
    def _describe_scene(self, input_data: str) -> str:
        """CV-to-Language Pipeline: Scene description"""
        # TODO: Replace with actual CV-to-language model
        # Implementation steps:
        # 1. Load image/video frame
        # 2. Run vision-language model (BLIP, LLaVA, etc.)
        # 3. Generate contextual description
        # 4. Extract behavioral indicators
        
        return json.dumps({
            "scene_description": "Large crowd at outdoor music festival. People are tightly packed near the main stage area. Many individuals are pushing forward, with raised arms and excited expressions. Some people appear distressed near the barriers. Security personnel visible but outnumbered.",
            "crowd_behavior": {
                "energy_level": "very_high", 
                "mood": "excited_but_agitated",
                "movement": "surging_forward",
                "concerning_behaviors": ["pushing", "crowd_surge", "barrier_pressure"]
            },
            "environmental_factors": {
                "lighting": "evening_low_light",
                "weather": "clear",
                "venue_type": "outdoor_festival"
            },
            "safety_observations": ["people_against_barriers", "limited_exit_visibility", "security_overwhelmed"]
        })
    
    def _lookup_safety_guidelines(self, situation: str) -> str:
        """RAG Pipeline: Safety guidelines lookup"""
        # TODO: Replace with actual RAG implementation
        # Implementation steps:
        # 1. Embed the situation description
        # 2. Query vector database of safety protocols
        # 3. Retrieve most relevant guidelines
        # 4. Format for agent consumption
        
        return json.dumps({
            "relevant_guidelines": {
                "crowd_density": [
                    "Maximum safe density: 2 people per square meter",
                    "High risk density: 4+ people per square meter", 
                    "Critical density: 6+ people per square meter"
                ],
                "crowd_surge": [
                    "Identify surge early: look for coordinated forward movement",
                    "Stop music/performance immediately if surge detected",
                    "Open additional exit routes to relieve pressure"
                ],
                "barrier_safety": [
                    "Monitor barrier pressure continuously",
                    "Create buffer zones near barriers", 
                    "Have medical teams stationed near high-pressure areas"
                ]
            },
            "emergency_protocols": {
                "immediate_actions": [
                    "Alert security teams",
                    "Prepare crowd dispersal measures",
                    "Position medical teams"
                ],
                "escalation_triggers": [
                    "Density exceeds 4 people/sqm",
                    "Aggressive crowd behavior observed",
                    "Barrier failure risk detected"
                ]
            },
            "risk_assessment_factors": [
                "Current density level vs. safe thresholds",
                "Crowd behavior and energy",
                "Exit accessibility and visibility",
                "Security presence and positioning"
            ]
        })
    
    def analyze_crowd_footage(self, image_data: str, context: str = "") -> Dict[str, Any]:
        """Main method: Analyze crowd footage for safety risks"""
        query = f"""Analyze this crowd footage for potential safety dangers:
        
        Image/Video Data: {image_data[:100]}... (truncated)
        Additional Context: {context}
        
        Please use all three tools systematically:
        1. Analyze crowd density metrics
        2. Describe the scene and crowd behavior  
        3. Look up relevant safety guidelines
        
        Then provide a comprehensive safety assessment with risk level and immediate recommendations."""
        
        try:
            result = self.agent_executor.invoke({"input": query})
            return {
                "status": "success",
                "safety_analysis": result["output"],
                "timestamp": datetime.now().isoformat()
            }
        except Exception as e:
            return {
                "status": "error",
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            }
