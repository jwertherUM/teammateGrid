from flask import Flask, jsonify, request
from flaskext.mysql import MySQL

app = Flask(__name__)

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'Jw19794!'
app.config['MYSQL_DATABASE_DB'] = 'teammate_grid_db'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'

mysql = MySQL()
mysql.init_app(app)

@app.route('/random-rows', methods=['GET'])
def get_random_rows():
    cursor = mysql.get_db().cursor()
    cursor.execute('SELECT * FROM teammate_grid_db.players ORDER BY RAND() LIMIT 6')
    rows = cursor.fetchall()
    print(rows)
    cursor.close()
    return jsonify({'random_rows': rows})

@app.route('/players', methods=['GET'])
def get_players():
    cursor = mysql.get_db().cursor()
    cursor.execute('SELECT * FROM teammate_grid_db.players')
    rows = cursor.fetchall()
    print("HELLO")
    print(rows[0])
    cursor.close()
    return jsonify({'players': rows})

@app.route('/search_teammates/<int:pid1>/<int:pid2>', methods=['GET'])
def search_teammates(pid1, pid2):
    print(pid1, pid2)
    cursor = mysql.get_db().cursor()
    cursor.execute("""
        SELECT *
        FROM teammate_grid_db.playergames t1
        JOIN teammate_grid_db.playergames t2 ON t1.gamepk = t2.gamepk
                          AND t1.teamid = t2.teamid
                          AND t1.pid <> t2.pid
        WHERE t1.pid = %s AND t2.pid = %s
    """, (str(pid1), str(pid2)))

    rows = cursor.fetchall()
    rows = [row for row in rows if str(row[1])[5] == '2']
    cursor.close()
    return jsonify({'games': len(rows)})
    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)