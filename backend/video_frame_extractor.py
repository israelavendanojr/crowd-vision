import cv2
import os

# seperate func so it can be reused for live feed if needed
def save_frame_as_jpg(frame, output_dir, idx):
    """
    Saves a single frame (numpy array) as a JPG in output_dir with a sequential name.
    Returns the file path.
    """
    os.makedirs(output_dir, exist_ok=True)
    out_path = os.path.join(output_dir, f"frame_{idx:04d}.jpg")
    cv2.imwrite(out_path, frame)
    return out_path


# takes in inputted video file, extracts every n-th frame, saves as JPGs
def extract_frames_every_n(video_path, output_dir="video_frames", n=30):
    """
    Extracts every n-th frame from the input video and saves as JPGs in output_dir.
    Returns a list of file paths to the saved frames.
    """
    cap = cv2.VideoCapture(video_path)
    frame_count = 0
    saved_paths = []
    idx = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        if frame_count % n == 0:
            out_path = save_frame_as_jpg(frame, output_dir, idx)
            saved_paths.append(out_path)
            idx += 1
        frame_count += 1

    cap.release()
    return saved_paths

# Example usage:
if __name__ == "__main__":
    video_file = "test_video_4k.mp4"  # Change this to your video file name
    # placeholder for temp cache again 
    output_folder = "video_frames"
    frames = extract_frames_every_n(video_file, output_folder, n=30)
    print(f"Extracted {len(frames)} frames:")
    for path in frames:
        print(path)