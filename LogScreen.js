import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

const LogScreen = ({ route }) => {
  const { logs } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Session Logs</Text>
      <FlatList
        data={logs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Text style={styles.logText}>
            Session {index + 1}: {item} seconds
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  logText: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default LogScreen;
