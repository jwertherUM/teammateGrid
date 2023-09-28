import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface GameOverProps {
  onRestart: () => void;
  score: number | null;
}


const GameOver: React.FC<GameOverProps> = ({ onRestart, score }) => {
    const [username, setUsername] = useState('');
    const [highscore, setHS] = useState(0);

    //retrieve profile for high score, messages
    const fetchProfile = async () => {
        try {
            const response = await fetch('http://127.0.0.1:3000/profile');
            const data = await response.json();
            
            if(data['user']){
                setUsername(data['user']['username']);
                setHS(data['user']['high_score']);
            }
            
          } catch (error) {
            console.error('Error:', error);
          }
    }
    
    useEffect(() => {
        fetchProfile();
      }, []);

  return (
    <View style={styles.container}>
        <View style={styles.popup}>
            <Text style={styles.message}>Good Work, {username}!</Text>
            <Text style={styles.message}>Score: {score}</Text>
            {score && (score > highscore) ? ( <Text style={styles.message}>That's a new High Score!</Text>) : (<Text style={styles.message}>High Score: {highscore}</Text>)}
            <TouchableOpacity onPress={onRestart} style={styles.button}>
                <Text style={styles.buttonText}>Restart</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    alignSelf: 'center',
    borderColor: '#FEC4CB',
    borderWidth: 4,
    padding: 30,
    borderRadius: 7,
    backgroundColor: '#F5FAFF',
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },

});

export default GameOver;
