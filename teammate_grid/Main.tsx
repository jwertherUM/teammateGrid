// src/MainScreen.tsx
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
//import SearchBar from './SearchBar';
import Grid from './Grid';
import Searchbar from './Searchbar';

interface Player {
  id: number;
  name: string;
}

type NumberStringTuple = [number, string];

const MainScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const[playerRows, setRows] = useState([]);
  const[playerCols, setCols] = useState([]);
  const[allPlayers, setPlayers] = useState<Player[] | null>(null);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<number | null>(null);
  const [score, setScore] = useState<number | null>(0);
  const [guesses, setGuesses] = useState<number | null>(9);
  const [grid, setGrid] = useState<(string | number)[][] | null>([]);


  const handleGridBoxSelection = (row: number, column: number) => {
    setSelectedRow(row);
    setSelectedColumn(column);
    //console.log(playerRows[row - 1], playerCols[column - 1]);
  };

  const handleSearch = () => {
    if(selectedRow && selectedColumn){

    }
  }

  const fetchRandomRows = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/random-rows');
      const data = await response.json();

      const [rows, cols] = data.random_rows.reduce((acc, curr, index) => {
        if (index < 3) {
          acc[0].push(curr);
        } else {
          acc[1].push(curr);
        }
        return acc;
      }, [[], []]);
      

      setRows(rows);
      setCols(cols);

      const newgrid = [
        [0, ' '],
        cols[0],
        cols[1],
        cols[2],
        rows[0],
        [0, ' '],
        [0, ' '],
        [0, ' '],
        rows[1],
        [0, ' '],
        [0, ' '],
        [0, ' '],
        rows[2],
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

  const fetchPlayers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/players');
      const data = await response.json();
      const playerlist = data['players'];
  
      // Convert the response data to an array of Player objects
      const newPlayers: Player[] = playerlist.map((playerData: any) => ({
        id: playerData[0],
        name: playerData[1],
      }));
  
      setPlayers(newPlayers);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  useEffect(() => {
    fetchRandomRows(); // Fetch data when the component mounts
    fetchPlayers();
  }, []);


  const handleSearchChange = (text: string) => {
    setSearchTerm(text);
  };

  
  //console.log(data);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Teammate Grid</Text>
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
    <Text style={styles.scoreguess}>Guesses: {guesses}</Text>
    <Text style={styles.scoreguess}>Score: {score}</Text>
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
  },
  scoreguess: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default MainScreen;
