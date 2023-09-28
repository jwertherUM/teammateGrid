import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface GameOverProps {
  onRestart: () => void;
  score: number | null;
}


const GameOver: React.FC<GameOverProps> = ({ onRestart, score }) => {
    const [username, setUsername] = useState('');
    const [highscore, setHS] = useState(0);

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
      <Text style={styles.message}>Game Over, {username}!</Text>
      <Text style={styles.message}>You Scored {score}!</Text>
      {score > highscore ? ( <Text style={styles.message}>That's a new High Score!</Text>) : (<Text style={styles.message}>High Score: {highscore}</Text>)}
      <TouchableOpacity onPress={onRestart} style={styles.button}>
        <Text style={styles.buttonText}>Restart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default GameOver;
