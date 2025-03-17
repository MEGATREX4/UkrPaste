from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

# Define path to your pastes.json
PASTE_FILE = 'pastes.json'

# Function to read pastes from the file
def read_pastes():
    with open(PASTE_FILE, 'r', encoding='utf-8') as file:
        return json.load(file)

# Function to write pastes to the file
def write_pastes(pastes):
    with open(PASTE_FILE, 'w', encoding='utf-8') as file:
        json.dump(pastes, file, ensure_ascii=False, indent=4)

# Home page that displays pastes
@app.route('/')
def index():
    pastes = read_pastes()
    return render_template('index.html', pastes=pastes)

# Route to add a new paste
@app.route('/add_paste', methods=['POST'])
def add_paste():
    data = request.json
    author = data.get('author')
    text = data.get('text')

    if not author or not text:
        return jsonify({'error': 'Missing author or text'}), 400

    pastes = read_pastes()
    new_paste = {"author": author, "text": text}
    pastes.append(new_paste)
    write_pastes(pastes)

    return jsonify({'message': 'Paste added successfully!'}), 201

# Route to the form for adding pastes
@app.route('/apply')
def apply():
    return render_template('apply.html')

if __name__ == '__main__':
    app.run(debug=True)
