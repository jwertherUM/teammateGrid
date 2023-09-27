from flask import Flask, jsonify, request
#from flaskext.mysql import MySQL
from models import db, Player, PlayerGame  # Import your models from the models file
from import_data import import_data
import sqlite3
from sqlalchemy.orm import aliased

app = Flask(__name__)

# SQLite database file path
db_path = 'teammate_grid.db'

# Function to get a SQLite connection
def get_db():
    return sqlite3.connect(db_path)

# MySQL configurations
# app.config['MYSQL_DATABASE_USER'] = 'root'
# app.config['MYSQL_DATABASE_PASSWORD'] = 'Jw19794!'
# app.config['MYSQL_DATABASE_DB'] = 'teammate_grid_db'
# app.config['MYSQL_DATABASE_HOST'] = 'localhost'

# mysql = MySQL()
# mysql.init_app(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///teammate_grid.db'
#db.init_app(app)


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