import os
import shutil
import cv2
from PIL import Image
import io

# --- Frame Extraction Functions ---

def save_frame_as_jpg(frame, output_dir, idx, timestamp_ms):
    os.makedirs(output_dir, exist_ok=True)
    out_path = os.path.join(output_dir, f"frame_{idx:04d}_{timestamp_ms}ms.jpg")
    cv2.imwrite(out_path, frame)
    return out_path

def extract_frames_every_n(video_path, output_dir="video_frames", n=30):
    cap = cv2.VideoCapture(video_path)
    frame_count = 0
    saved_paths = []
    idx = 0
    fps = cap.get(cv2.CAP_PROP_FPS)

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        if frame_count % n == 0:
            timestamp_ms = int((frame_count / fps) * 1000) if fps > 0 else frame_count * n
            out_path = save_frame_as_jpg(frame, output_dir, idx, timestamp_ms)
            saved_paths.append(out_path)
            idx += 1
        frame_count += 1

    cap.release()
    return saved_paths

# --- Zoning Functions ---

def crop_frame_into_grid_local(frame_bytes: bytes, grid_x: int = 4, grid_y: int = 4):
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

def save_zone_metadata_for_video(folderwork_dir, grid_x=4, grid_y=4):
    """
    Saves a single zones_metadata.txt in the main folderwork_dir,
    describing the x/y pixel boundaries and center of each zone for the whole video.
    Uses the first frame found in the folderwork_dir for dimensions.
    """
    # Find the first frame image in the first frame folder
    frame_folders = sorted(
        [os.path.join(folderwork_dir, d) for d in os.listdir(folderwork_dir) if os.path.isdir(os.path.join(folderwork_dir, d))]
    )
    if not frame_folders:
        print("No frame folders found in", folderwork_dir)
        return

    first_folder = frame_folders[0]
    frame_imgs = [f for f in os.listdir(first_folder) if f.endswith('.jpg')]
    if not frame_imgs:
        print("No frame image found in", first_folder)
        return

    frame_path = os.path.join(first_folder, frame_imgs[0])

    with Image.open(frame_path) as img:
        width, height = img.size

    lines = []
    for i in range(grid_y):
        for j in range(grid_x):
            x0 = int(j * width / grid_x)
            x1 = int((j + 1) * width / grid_x)
            y0 = int(i * height / grid_y)
            y1 = int((i + 1) * height / grid_y)
            center_x = (x0 + x1) // 2
            center_y = (y0 + y1) // 2
            lines.append(
                f"zone_{i}_{j}: x={x0}-{x1}, y={y0}-{y1}, center=({center_x},{center_y})"
            )

    out_path = os.path.join(folderwork_dir, "zones_metadata.txt")
    with open(out_path, "w") as f:
        f.write("\n".join(lines))
    print(f"Zone metadata saved to {out_path}")

# --- Main Workflow Function ---

def process_video_to_zoned_frames(
    video_path,
    main_output_dir=None,
    frame_interval=30,
    grid_x=4,
    grid_y=4
):
    if main_output_dir is None:
        base_name = os.path.splitext(os.path.basename(video_path))[0]
        main_output_dir = base_name
    os.makedirs(main_output_dir, exist_ok=True)

    print(f"Extracting frames from {video_path} ...")
    temp_frames_dir = os.path.join(main_output_dir, "_temp_frames")
    frame_paths = extract_frames_every_n(video_path, output_dir=temp_frames_dir, n=frame_interval)
    print(f"Extracted {len(frame_paths)} frames.")

    for frame_path in frame_paths:
        frame_name = os.path.splitext(os.path.basename(frame_path))[0]
        frame_folder = os.path.join(main_output_dir, frame_name)
        os.makedirs(frame_folder, exist_ok=True)

        # Copy the frame jpg into the frame folder
        frame_jpg_path = os.path.join(frame_folder, os.path.basename(frame_path))
        shutil.copy2(frame_path, frame_jpg_path)

        # Create zones subfolder
        zones_folder = os.path.join(frame_folder, "zones")
        os.makedirs(zones_folder, exist_ok=True)

        print(f"Zoning {frame_path} into {zones_folder} ...")
        zone_infos = save_zones_from_image(frame_path, output_dir=zones_folder, grid_x=grid_x, grid_y=grid_y)
        print(f"  Saved {len(zone_infos)} zones for {frame_name}")

    # Save a single metadata file for the whole video
    save_zone_metadata_for_video(main_output_dir, grid_x=grid_x, grid_y=grid_y)

    shutil.rmtree(temp_frames_dir, ignore_errors=True)
    print("All frames zoned and saved.")

# --- Script Entrypoint ---

if __name__ == "__main__":
    process_video_to_zoned_frames(
        video_path="data/test_video_4k.mp4",  # Change as needed
        main_output_dir="data/folderwork",         # Uses video name by default
        frame_interval=30,
        grid_x=4,
        grid_y=4
    )