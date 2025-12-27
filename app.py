from flask import Flask, render_template, jsonify

app = Flask(__name__)

# --- GALACTIC DATABASE ---
# This data is sent to the frontend when a kid clicks a planet.
PLANET_DATA = {
    "sun": {
        "title": "The Sun",
        "fact": "The Sun accounts for 99.86% of the mass in the solar system!",
        "activity": "Stand outside and feel the warmth. That energy traveled 93 million miles to touch your skin!"
    },
    "mercury": {
        "title": "Mercury",
        "fact": "Mercury has wrinkles! As the iron core cooled, the planet shrank and wrinkled.",
        "activity": "Draw a planet with wrinkles like a raisin!"
    },
    "venus": {
        "title": "Venus",
        "fact": "Venus spins backwards compared to Earth. The sun rises in the West there!",
        "activity": "Try spinning in a circle clockwise, then counter-clockwise."
    },
    "earth": {
        "title": "Earth",
        "fact": "Earth is the only planet not named after a Greek or Roman god.",
        "activity": "Go find three different types of leaves outside."
    },
    "mars": {
        "title": "Mars",
        "fact": "Mars has the largest volcano in the solar system, Olympus Mons.",
        "activity": "Build a volcano using baking soda and vinegar!"
    }
}

@app.route('/')
def home():
    """Renders the 3D Experience."""
    return render_template('index.html')

@app.route('/api/info/<planet_name>')
def get_planet_info(planet_name):
    """Fetches specific planet data."""
    # Convert name to lowercase to match our dictionary keys
    data = PLANET_DATA.get(planet_name.lower())
    if data:
        return jsonify(data)
    return jsonify({
        "title": "Unknown Signal", 
        "fact": "This object is currently unmapped in our database.", 
        "activity": "Keep exploring, cadet!"
    })

if __name__ == '__main__':
    # Running on port 5000
    app.run(debug=True, port=5000)