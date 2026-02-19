from PIL import Image
import os

input_path = "public/tq9p63fap5rmw0cwen486bdc3w (1) (2) (1).png"
output_path = "public/bg-optimized.jpg"

try:
    img = Image.open(input_path)
    # Resize to max 3840x2160 (4K) while maintaining aspect ratio
    img.thumbnail((3840, 2160), Image.Resampling.LANCZOS)
    # Convert to RGB (in case of RGBA) and save as JPEG with 85% quality
    if img.mode == 'RGBA':
        img = img.convert('RGB')
    
    img.save(output_path, "JPEG", quality=85, optimize=True)
    print(f"Recursively optimized image saved to {output_path}")
    print(f"Original size: {os.path.getsize(input_path)}")
    print(f"New size: {os.path.getsize(output_path)}")
except Exception as e:
    print(f"Error optimizing image: {e}")
