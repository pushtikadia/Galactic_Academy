import os
from PIL import Image, ImageDraw # Requires: pip install pillow

# Configuration
ASSETS_DIR = "static/assets"
os.makedirs(ASSETS_DIR, exist_ok=True)

# Define the textures we need and their colors
textures = {
    "2k_sun.jpg": (255, 200, 0),       # Bright Yellow
    "2k_mercury.jpg": (150, 150, 150), # Grey
    "2k_venus_surface.jpg": (200, 100, 50), # Orange/Brown
    "2k_earth_daymap.jpg": (50, 100, 255),  # Blue
    "2k_mars.jpg": (200, 50, 50),      # Red
    "2k_stars_milky_way.jpg": (10, 10, 30)  # Dark Blue (Space)
}

def create_texture(filename, color):
    # Create a 512x512 image
    img = Image.new('RGB', (512, 512), color=color)
    d = ImageDraw.Draw(img)
    
    # Add some "noise" so it looks like a texture when spinning
    if "sun" not in filename and "stars" not in filename:
        d.rectangle([50, 200, 450, 300], fill=(color[0]-30, color[1]-30, color[2]-30))
        d.rectangle([200, 50, 300, 450], fill=(color[0]-30, color[1]-30, color[2]-30))
    
    # Add stars to background if it's the milky way
    if "stars" in filename:
        import random
        for _ in range(100):
            x = random.randint(0, 512)
            y = random.randint(0, 512)
            d.point((x, y), fill=(255, 255, 255))

    path = os.path.join(ASSETS_DIR, filename)
    img.save(path, quality=95)
    print(f"✅ Generated: {path}")

if __name__ == "__main__":
    print("--- GENERATING ASSETS ---")
    try:
        # Install Pillow if missing (using a subprocess call is safer, but we'll assume user runs pip)
        for name, color in textures.items():
            create_texture(name, color)
        print("\n🎉 Success! All texture files created.")
        print("You can now run 'python app.py'")
    except ImportError:
        print("❌ Error: You need the 'Pillow' library.")
        print("Please run: pip install pillow")