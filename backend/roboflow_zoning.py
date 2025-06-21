# roboflow_zoning.py

import os
import requests

# Make sure ROBOFLOW_API_KEY is set in your environment
ROBOFLOW_API_KEY = os.getenv("ROBOFLOW_API_KEY")
CROP_ENDPOINT     = "https://inference.roboflow.com/workflows/blocks/relative_static_crop/v1"


def crop_zone(frame_bytes: bytes, x_center: float, y_center: float, width: float, height: float):
    """
    Calls Roboflow’s Relative Static Crop block for one zone.
    Returns: list of cropped-image references (URLs or base64 data).
    """
    files = {
        "images": (
            "frame.jpg",
            frame_bytes,
            "image/jpeg"
        )
    }
    data = {
        "x_center": x_center,
        "y_center": y_center,
        "width": width,
        "height": height
    }
    headers = {
        "Authorization": f"Token {ROBOFLOW_API_KEY}"
    }
    resp = requests.post(CROP_ENDPOINT, files=files, data=data, headers=headers)
    resp.raise_for_status()
    return resp.json().get("crops", [])


def crop_frame_into_grid(frame_bytes: bytes, grid_x: int = 4, grid_y: int = 4):
    """
    Splits a full frame into a grid_x × grid_y grid of crops.
    Returns: list of dicts with {"grid_pos": (row, col), "crops": [...]}
    """
    zones = []
    for i in range(grid_y):
        for j in range(grid_x):
            xc = (j + 0.5) / grid_x
            yc = (i + 0.5) / grid_y
            w  = 1.0 / grid_x
            h  = 1.0 / grid_y

            crops = crop_zone(frame_bytes, xc, yc, w, h)
            zones.append({
                "grid_pos": (i, j),
                "crops": crops
            })
    return zones


