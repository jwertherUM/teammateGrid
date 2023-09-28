import csv
from models import db, Player, PlayerGame

#imports csvs in bulk, creates players and playergames tables
def import_data():
    print("Importing Data")
    plist = []
    with open('playertable.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            plist.append(Player(pid=row['pid'], name=row['name']))
        db.session.bulk_save_objects(plist)

    pglist = []
    with open('playergames.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            pglist.append(PlayerGame(pid=row['pid'], gamepk=row['gamepk'], teamid=row['teamid']))
        db.session.bulk_save_objects(pglist)
    
    db.session.commit()

