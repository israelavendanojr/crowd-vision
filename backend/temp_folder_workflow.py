import os
from video_frame_extractor import extract_frames_every_n
from zoning import save_zones_from_image
import shutil

def main(
    video_path="test_video_4k.mp4",
    main_output_dir=None,
    frame_interval=30,
    grid_x=4,
    grid_y=4
):
    # Name main output folder after video file (without extension)
    if main_output_dir is None:
        base_name = os.path.splitext(os.path.basename(video_path))[0]
        main_output_dir = base_name
    os.makedirs(main_output_dir, exist_ok=True)

    # Step 1: Extract frames
    print(f"Extracting frames from {video_path} ...")
    temp_frames_dir = os.path.join(main_output_dir, "_temp_frames")
    frame_paths = extract_frames_every_n(video_path, output_dir=temp_frames_dir, n=frame_interval)
    print(f"Extracted {len(frame_paths)} frames.")

    # Step 2: For each frame, create a subfolder and zone it
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

    # Clean up temp frames
    shutil.rmtree(temp_frames_dir, ignore_errors=True)

    print("All frames zoned and saved.")

if __name__ == "__main__":
    main()