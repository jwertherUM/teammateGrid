from flask import Flask, jsonify, request, session
#from flaskext.mysql import MySQL
from models import db, Player, PlayerGame, User
from import_data import import_data
import sqlite3
from sqlalchemy.orm import aliased
from werkzeug.security import generate_password_hash, check_password_hash
import secrets

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)
# SQLite database file path
db_path = 'teammate_grid.db'

# Function to get a SQLite connection
def get_db():
    return sqlite3.connect(db_path)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///teammate_grid.db'


@app.route('/random-rows', methods=['GET'])
def get_random_rows():
    random_players = Player.query.order_by(db.func.random()).limit(6).all()
    random_rows = [{'pid': player.pid, 'name': player.name} for player in random_players]
    print(random_rows)
    return jsonify({'random_rows': random_rows})

@app.route('/players', methods=['GET'])
def get_players():
    players = Player.query.all()
    player_data = [{'pid': player.pid, 'name': player.name} for player in players]
    print(player_data[0])
    return jsonify({'players': player_data})

@app.route('/search_teammates/<int:pid1>/<int:pid2>', methods=['GET'])
def search_teammates(pid1, pid2):
    pg1 = aliased(PlayerGame)
    pg2 = aliased(PlayerGame)
    games = (
        db.session.query(pg1)
        .join(pg2, (pg1.gamepk == pg2.gamepk) & (pg1.teamid == pg2.teamid))
        .filter(pg1.pid == pid1, pg2.pid == pid2)
        .all()
    )

    filtered_games = [game for game in games if str(game.gamepk)[5] == '2']
    return jsonify({'games': len(filtered_games)})

# Registration Endpoint
@app.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    hashed_password = generate_password_hash(password, method='sha256')

    new_user = User(username=username, hashed_password=hashed_password, high_score=0)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'})


@app.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.hashed_password, password):
        session['user_id'] = user.id
        session['username'] = user.username
        session['high_score'] = user.high_score
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'message': 'Invalid credentials'})
    

@app.route('/profile', methods=['GET'])
def profile():
    # Access the user ID from the session
    user_id = session.get('user_id')
    high_score = session.get('high_score')
    username = session.get('username')

    if user_id:
        return jsonify({'user': {'user_id': user_id, 'high_score': high_score, 'username': username}})
    else:
        return 'User not logged in'

def drop_and_create_tables():
    with app.app_context():
        # Drop all tables
        db.drop_all()
        
        # Create tables and import data
        db.create_all()
        import_data()
    

if __name__ == '__main__':
    # Initialize the app and database
    from app import app
    app.app_context().push()
    db.init_app(app)
    
    print("Initializing App")
    drop_and_create_tables()

    app.run(host='0.0.0.0', port=3000, debug=True)