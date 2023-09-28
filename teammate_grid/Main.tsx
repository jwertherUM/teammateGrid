import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, Image, Dimensions, View } from 'react-native';
import Grid from './Grid';
import Searchbar from './Searchbar';
import GameOver from './GameOver';

interface Player {
  id: number;
  name: string;
}

const windowWidth = Dimensions.get('window').width;

const MainScreen: React.FC = () => {
  const[playerRows, setRows] = useState([]);
  const[playerCols, setCols] = useState([]);
  const[allPlayers, setPlayers] = useState<Player[] | null>(null);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<number | null>(null);
  const [score, setScore] = useState<number | null>(0);
  const [guesses, setGuesses] = useState<number | null>(9);
  const [grid, setGrid] = useState<(string | number)[][] | null>([]);
  const [gameOver, setGameOver] = useState(false);


  //track selected grid indices
  const handleGridBoxSelection = (row: number, column: number) => {
    setSelectedRow(row);
    setSelectedColumn(column);
  };

  //populate starter rows and cols, empty grid
  const fetchRandomRows = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/random-rows');
      const data = await response.json();

      const rows = data['random_rows'].slice(0, 3);
      const cols = data['random_rows'].slice(3, 6);

      setRows(rows);
      setCols(cols);

      const newgrid = [
        [0, ' '],
        [cols[0].pid, cols[0].name],
        [cols[1].pid, cols[1].name],
        [cols[2].pid, cols[2].name],
        [rows[0].pid, rows[0].name],
        [0, ' '],
        [0, ' '],
        [0, ' '],
        [rows[1].pid, rows[1].name],
        [0, ' '],
        [0, ' '],
        [0, ' '],
        [rows[2].pid, rows[2].name],
        [0, ' '],
        [0, ' '],
        [0, ' '],
        [0, ' '],
      ];

      setGrid(newgrid);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  //populate dropdown with all players
  const fetchPlayers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/players');
      const data = await response.json();
      const playerlist = data['players'];

      const newPlayers: Player[] = playerlist.map((playerData: any) => ({
        id: playerData['pid'],
        name: playerData['name'],
      }));
  
      setPlayers(newPlayers);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  useEffect(() => {
    fetchRandomRows();
    fetchPlayers();
  }, []);

  //game over trigger
  useEffect(() => {
    if (guesses === 0) {
      setGameOver(true);
    }
  }, [guesses]);
  

  const handleRestart = () => {
    setScore(0);
    setGuesses(9);
    setSelectedColumn(0);
    setSelectedRow(0);
    fetchRandomRows();
    setGameOver(false);

  };

  
  return (
    <SafeAreaView style={styles.container}>
      { gameOver ? (<GameOver score={score} onRestart={handleRestart}/>) : (
      <React.Fragment>
      <Image
        source={require('./img/rink_diagram.jpeg')}
        style={[styles.rink, { width: windowWidth, opacity: 0.5 }]}
      />
      <Text style={styles.title}>The Teammate Grid</Text>
      {(allPlayers) ? <Searchbar 
        players={allPlayers} 
        pRows={playerRows} 
        pCols={playerCols} 
        colPlayer={selectedColumn} 
        rowPlayer={selectedRow} 
        score={score} 
        guesses={guesses}
        setScore={setScore}
        setGuesses={setGuesses}
        grid={grid}
        setGrid={setGrid}
      /> : (
        <Text>Loading...</Text>
      )}
      {(playerRows && playerCols && playerCols[0] && playerCols[1] && playerCols[2] &&
      playerRows[0] && playerRows[1] && playerRows[2] && grid) ? (
        <Grid
          dimensions={4}
          items={grid}
          onGridBoxSelect={handleGridBoxSelection}
        />
      ) : (
        <Text>Loading...</Text>
      )}
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreguess}>Guesses: {guesses}</Text>
        <Text style={styles.scoreguess}>Score: {score}</Text>
      </View>
      </React.Fragment>
      )}
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 45,
    fontFamily: 'Courier New',
    shadowRadius: 5,
  },
  scoreguess: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rink: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 125
  },
  scoreContainer: {
    position: 'absolute',
    bottom: 0,
    width: windowWidth,
    backgroundColor: '#F5FAFF',
    borderTopColor: '#FEC4CB',
    borderTopWidth: 3,
    padding: 7,
  }
});

export default MainScreen;
