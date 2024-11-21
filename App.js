import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LogScreen from './LogScreen'; // Import LogScreen
import Timer from './Timer';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Sound from 'react-native-sound';
import { useNavigation } from '@react-navigation/native';

Sound.setCategory('Playback'); // Allow sound playback in silent mode

const App = () => {
  const [time, setTime] = useState(60); // Initial time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([]); // Store timer logs
  const navigation = useNavigation();

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
        if (prevTime === Math.floor(60 / 6)) {
          playSound('beep.mp3');
        }
      }, 1000);
    } else if (time === 0) {
      playSound('beep_end.mp3');
      setLogs((prevLogs) => [...prevLogs, 60]); // Log completed session
      setIsRunning(false);
    }

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [isRunning, time]);

  const playSound = (soundFile) => {
    const beep = new Sound(soundFile, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      beep.play();
    });
  };

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setTime(60);
    setIsRunning(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{time}</Text>
      <Button title={isRunning ? 'Pause' : 'Start'} onPress={toggleTimer} />
      <TouchableOpacity style={styles.button} onPress={resetTimer}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('LogScreen', { logs })}
      >
        <Text style={styles.buttonText}>View Logs</Text>
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
  timerText: {
    fontSize: 40,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Timer" component={Timer} />
        <Stack.Screen name="LogScreen" component={LogScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
