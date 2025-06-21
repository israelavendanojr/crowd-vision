from zoning import save_zones_from_image

#placeholder img change w variable?
TEST_IMAGE = "Large_Crowd_Image.png"
# placeholder until temp folder & functionality created 
OUTPUT_DIR = "zoned_output"

def main():
    zone_paths = save_zones_from_image(TEST_IMAGE, OUTPUT_DIR)
    for zone in zone_paths:
        print(f"Zone {zone['grid_pos']}: {zone['file_path']}")

main()