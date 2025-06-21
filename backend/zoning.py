from PIL import Image
import io
import os

def crop_frame_into_grid_local(frame_bytes: bytes, grid_x: int = 4, grid_y: int = 4):
    """
    Splits an input image (JPG or PNG bytes) into a grid_x × grid_y grid of crops using Pillow.
    Returns: dict with metadata and crops for later reconstruction.
    """
    image = Image.open(io.BytesIO(frame_bytes))
    width, height = image.size
    zones = []
    for i in range(grid_y):
        for j in range(grid_x):
            left = int(j * width / grid_x)
            upper = int(i * height / grid_y)
            right = int((j + 1) * width / grid_x)
            lower = int((i + 1) * height / grid_y)
            crop = image.crop((left, upper, right, lower))
            buf = io.BytesIO()
            crop.save(buf, format="PNG" if image.format == "PNG" else "JPEG")
            zones.append({
                "grid_pos": (i, j),
                "crop_bytes": buf.getvalue()
            })
    return {
        "frame_size": (width, height),
        "grid_x": grid_x,
        "grid_y": grid_y,
        "zones": zones
    }

def save_zones_from_image(
    image_path: str,
    output_dir: str = "zoned_output",
    grid_x: int = 4,
    grid_y: int = 4
):
    """
    Splits the image at image_path into zones, saves each zone as an image in output_dir,
    and returns a list of dicts with grid position and file path.
    """
    os.makedirs(output_dir, exist_ok=True)
    with open(image_path, "rb") as f:
        img_bytes = f.read()
    result = crop_frame_into_grid_local(img_bytes, grid_x=grid_x, grid_y=grid_y)
    zones = result["zones"]
    output_info = []
    for zone in zones:
        i, j = zone["grid_pos"]
        out_path = os.path.join(output_dir, f"zone_{i}_{j}.png")
        with open(out_path, "wb") as out_f:
            out_f.write(zone["crop_bytes"])
        output_info.append({
            "grid_pos": (i, j),
            "file_path": out_path
        })
    return output_info

# Example usage:
if __name__ == "__main__":
    image_path = "Large_Crowd_Image.png"
    output_dir = "zoned_output"
    zone_paths = save_zones_from_image(image_path, output_dir)
    for zone in zone_paths:
        print(f"Zone {zone['grid_pos']}: {zone['file_path']}")
