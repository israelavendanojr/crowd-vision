import os
from PIL import Image
from transformers import Blip2Processor, Blip2ForConditionalGeneration
import torch

class VisionLanguageTool:
    def __init__(self):
        device = "cuda" if torch.cuda.is_available() else "cpu"
        self.device = device
        self.processor = Blip2Processor.from_pretrained("Salesforce/blip2-opt-2.7b")
        self.model = Blip2ForConditionalGeneration.from_pretrained("Salesforce/blip2-opt-2.7b").to(device)

    def describe_zone(self, image_path):
        image = Image.open(image_path).convert("RGB")
        inputs = self.processor(images=image, return_tensors="pt").to(self.device)
        generated_ids = self.model.generate(**inputs, max_new_tokens=100)
        caption = self.processor.decode(generated_ids[0], skip_special_tokens=True)
        return caption

    
