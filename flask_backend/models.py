from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import UniqueConstraint

db = SQLAlchemy()

class Player(db.Model):
    pid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'<Player {self.name}>'

class PlayerGame(db.Model):
    __tablename__ = 'playergames'

    pid = db.Column(db.Integer, primary_key=True)
    gamepk = db.Column(db.Integer, primary_key=True)
    teamid = db.Column(db.Integer, primary_key=True)
    # ... other columns

    __table_args__ = (
        UniqueConstraint('pid', 'gamepk', 'teamid'),
    )

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    hashed_password = db.Column(db.String(100), nullable=False)
    high_score = db.Column(db.Integer, nullable=True)