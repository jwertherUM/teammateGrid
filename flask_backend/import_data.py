import csv
from models import db, Player, PlayerGame  # Import your models from the models file

def import_data():
    print("Importing Data")
    with open('playertable.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            player = Player(pid=row['pid'], name=row['name'])
            db.session.add(player)

    with open('playergames.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            playergame = PlayerGame(pid=row['pid'], gamepk=row['gamepk'], teamid=row['teamid'])
            db.session.add(playergame)
    
    db.session.commit()

