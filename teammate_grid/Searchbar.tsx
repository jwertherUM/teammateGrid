import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface HockeyPlayer {
    id: number;
    name: string;
  }

type nspair = [number | string]

interface SearchBarProps {
  players: HockeyPlayer[];
  pRows: nspair[] | null;
  pCols: nspair[] | null;
  colPlayer: number | null;
  rowPlayer: number | null;
  score: number | null;
  guesses: number | null;
  grid: (string | number)[][] | null;
  setScore: React.Dispatch<React.SetStateAction<number | null>>;
  setGuesses: React.Dispatch<React.SetStateAction<number | null>>;
  setGrid: React.Dispatch<React.SetStateAction<(string | number)[][] | null>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ players, pRows, pCols, colPlayer, rowPlayer, score, guesses, grid, setScore, setGuesses, setGrid }) => {
  const [query, setQuery] = useState<string>('');
  const [filteredPlayers, setFilteredPlayers] = useState<HockeyPlayer[]>([]);

  const handleSearch = (text: string) => {
    setQuery(text);
    if(text.trim() === ''){
        setFilteredPlayers([]);
    }
    else{
        // Update filtered players based on the new query
        const filtered = players.filter(player =>
            player.name.toLowerCase().startsWith(text.toLowerCase())
        );
        setFilteredPlayers(filtered.slice(0, 5));
    }
   
  };

  const handleSelectPlayer = async (pid: number, name: string) => {
    console.log('Selected player:', name);
    if(pRows && rowPlayer && pCols && colPlayer){
        console.log(pRows);
        const p1 = String(pRows[rowPlayer - 1]['pid']);
        const p2 = String(pCols[colPlayer - 1]['pid']);
        let score1 = 0;
        let score2 = 0;

        console.log(p1);
        console.log(p2);

        const url1 = 'http://127.0.0.1:3000/search_teammates/' + String(pid) + '/' + p1
        const url2 = 'http://127.0.0.1:3000/search_teammates/' + String(pid) + '/' + p2

        try {
            const response = await fetch(url1);
            const data = await response.json();
            console.log(data);
            score1 += data['games'];
          } 
        catch (error) {
            console.error('Error:', error);
        }

        try {
            const response = await fetch(url2);
            const data = await response.json();
            console.log(data);
            score2 += data['games'];
          } 
        catch (error) {
            console.error('Error:', error);
        }

        console.log(score1, score2);
        //setQuery(' ');
        //setFilteredPlayers([]);
        if(score1 > 0 && score2 > 0){
            setScore((prevScore) => (prevScore || 0) + score1 + score2);
            if(grid){
                const newgrid = grid.map((row) => [...row]);
                const idx =  (rowPlayer * 4) + colPlayer;
                newgrid[idx] = [pid, name];
                console.log(rowPlayer, colPlayer);
                console.log(newgrid);
                setGrid(newgrid);
            }
            
        }
        setGuesses((prevGuesses) => prevGuesses ? (prevGuesses > 0 ? prevGuesses - 1 : prevGuesses = 0) : prevGuesses)

        return score;
    }


  };


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search Any Player Since the 2011-2012 Season"
        value={query}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredPlayers}
        keyExtractor={player => player.id.toString()}
        renderItem= {({ item }) => {
            
        const handleClick = () => {
            handleSelectPlayer(item.id, item.name); // Call the handleGridBoxClick function with the index
        };

        return (
        <TouchableOpacity onPress={handleClick}>
            <Text style={styles.item}>{item.name}</Text>
        </TouchableOpacity>
        )
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: '#FEC4CB',
    borderWidth: 1,
    marginBottom: -10,
    marginTop: 10,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#F5FAFF',
  },
  item: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    textDecorationLine: 'underline',
  },
});

export default SearchBar;
