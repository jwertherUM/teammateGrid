import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import MainScreen from './Main'; // Import your MainScreen component

const windowWidth = Dimensions.get('window').width;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  //registration logic
  const handleRegister = async () => {

      if(password === confirm && username && password && confirm){
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

  //login logic
  const handleLogin = async () => {

    if(username && password){
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
    }
  };

  //navigate back to registration
  const handleBack = () => {
    setIsRegistered(false);
  }

  //navigate back to login
  const handleToLogin = () => {
    setIsRegistered(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      {isLoggedIn ? (
        <MainScreen />
      ) : isRegistered ? (
        <View style={styles.outer}>
          <View style={styles.stripe}></View>
          <View style={styles.stripel}></View>
          <View style={styles.striper}></View>
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
          <TouchableOpacity style={styles.button} onPress={handleLogin} ><Text style={styles.buttonText}>Login</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleBack}><Text style={styles.buttonText}>Back to Registration</Text></TouchableOpacity>
        </View>
      ) : (
        <View style={styles.outer}>
          <View style={styles.stripe}></View>
          <View style={styles.stripel}></View>
          <View style={styles.striper}></View>
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
          <TouchableOpacity style={styles.button} onPress={handleRegister} ><Text style={styles.buttonText}>Register</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleToLogin}><Text style={styles.buttonText}>Already Registered? Login Here</Text></TouchableOpacity>
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
    padding: 25,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    width: '80%',
    marginLeft: '10%',
    borderRadius: 10,
    backgroundColor: 'white'
  },
  outer: {
    borderWidth: 2,
    borderColor: 'gray',
    width: windowWidth * .9,
    left: '5%',
    borderRadius: 15,
    backgroundColor: '#F5FAFF',
  },
  stripe: {
    position: 'absolute',
    backgroundColor: '#FEC4CB',
    width: 7, 
    height: '100%',
    left: '50%',
    marginLeft: -2,
  },
  stripel: {
    position: 'absolute',
    backgroundColor: '#D4DEFC',
    width: 4,
    height: '100%',
    left: '25%',
    marginLeft: -2,
  },
  striper: {
    position: 'absolute',
    backgroundColor: '#D4DEFC',
    width: 4, 
    height: '100%',
    left: '75%',
    marginLeft: -2,
  },
  button: {
    backgroundColor: 'white',
    alignSelf: 'center',
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 3,
    marginBottom: 7,
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Arial',
    padding: 5,
  }
});

export default App;
