from flask import Flask, render_template, request, redirect, url_for, g, flash
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

# Configuration
DATABASE = 'users.db'

# Create the Flask app
app = Flask(__name__, static_folder='Statics')  # Static folder for CSS and images
app.secret_key = 'your_secret_key'  # Required for flashing messages

# Function to connect to the database
def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

# Close database connection when the request ends
@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

# Initialize the database with a table
def init_db():
    with app.app_context():
        db = get_db()
        cursor = db.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS user (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE
            )
        ''')
        db.commit()

# Routes
@app.route('/')
def home():
    return render_template('index.html')  # Home page

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    # Authenticate user by querying the database
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM user WHERE username = ?', (username,))
    user = cursor.fetchone()

    if user and check_password_hash(user[2], password):  # user[2] is the hashed password
        return redirect(url_for('gue'))  # Redirect to Gue.html
    else:
        flash('Invalid credentials')
        return redirect(url_for('home'))

@app.route('/register', methods=['POST'])
def register():
    username = request.form['username']
    email = request.form['email']
    password = request.form['password']

    hashed_password = generate_password_hash(password)

    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute('INSERT INTO user (username, email, password) VALUES (?, ?, ?)', (username, email, hashed_password))
        db.commit()
    except sqlite3.IntegrityError:
        flash('Username or email already exists')
        return redirect(url_for('home'))

    return redirect(url_for('home'))  # Redirect to login after registration

@app.route('/Gue.html', methods=['GET'])
def gue():
    return render_template('Gue.html')  # Gue.html page

# Route to serve temp.html (domain selection page)
@app.route('/temp.html', methods=['GET'])
def temp():
    return render_template('temp.html')  # temp.html page for domain selection

# Route to serve index.html from template 2 folder (main builder)
@app.route('/template 2/index.html', methods=['GET'])
def builder():
    return render_template('template 2/index.html')  # index.html from template 2 folder

if __name__ == '__main__':
    init_db()  # Initialize the database on startup
    app.run(debug=True)
