import React, { useState } from 'react';
import { View, Text, Button, SafeAreaView, TextInput, StyleSheet } from 'react-native';
import MainScreen from './Main'; // Import your MainScreen component
import LoginScreen from './Login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleRegister = async () => {
      // Perform registration logic
      if(password === confirm){
        const response = await fetch('http://127.0.0.1:3000//register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });
    
        const data = await response.json();
        if (data.message === 'User registered successfully') {
          setIsRegistered(true);
        }
    }
  };

  const handleLogin = async () => {
    // Perform login logic
    const response = await fetch('http://127.0.0.1:3000//login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();
    if (data.message === 'Login successful') {
      setIsLoggedIn(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoggedIn ? (
        <MainScreen />
      ) : isRegistered ? (
        <View>
          <Text style={styles.header}>Welcome back! Please log in: </Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Login" onPress={handleLogin} />
        </View>
      ) : (
        <View>
          <Text style={styles.header}>Welcome to Teammate Grid! Register Below: </Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirm}
            onChangeText={setConfirm}
          />
          <Button title="Register" onPress={handleRegister} />
          <Button title="Already Registered? Login" onPress={() => setIsRegistered(true)} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 30,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    width: '80%',
    marginLeft: '10%',
  },
});

export default App;
