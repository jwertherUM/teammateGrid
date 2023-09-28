import mysql.connector
from mysql.connector import Error
import csv

def connect_to_mysql():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='root',
            password='Jw19794!',
            database='teammate_grid_db'
        )
        if connection.is_connected():
            print('Connected to MySQL database')
            return connection
    except Error as e:
        print(f"Error: {e}")
        return None


def upload_csv_to_mysql(connection, filename, table_name):
    try:
        cursor = connection.cursor()
        with open(filename, 'r') as file:
            print(filename)
            csv_reader = csv.reader(file)
            next(csv_reader)

            if table_name == "players":
                cursor.execute(f"CREATE TABLE IF NOT EXISTS {table_name} (pid INT, name VARCHAR(255));")

                data_to_insert = [(int(row[0]), row[1]) for row in csv_reader]

                cursor.executemany(f"INSERT INTO {table_name} (pid, name) VALUES (%s, %s);", data_to_insert)
                print(data_to_insert[0])
                connection.commit()
                print('CSV data uploaded to MySQL')

            elif table_name == "playergames":
                cursor.execute(f"CREATE TABLE IF NOT EXISTS {table_name} (pid INT, gamepk INT, teamid INT);")

                data_to_insert = [(int(row[0]), int(row[1]), int(row[2])) for row in csv_reader]
                print(data_to_insert[0])
                cursor.executemany(f"INSERT INTO {table_name} (pid, gamepk, teamid) VALUES (%s, %s, %s);", data_to_insert)
                connection.commit()
                print('CSV data uploaded to MySQL')

    except Error as e:
        print(f"Error: {e}")



if __name__ == "__main__":
    connection = connect_to_mysql()

    if connection:
        filename = 'data.csv'  # Change to your CSV file path
        table_name = 'your_table_name'  # Change to your desired table name

        upload_csv_to_mysql(connection, "teammate_grid/db/playertable.csv", "players")
        upload_csv_to_mysql(connection, "teammate_grid/db/playergames.csv", "playergames")

        connection.close()
