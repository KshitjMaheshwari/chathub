import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function Home({navigation}) {
  return (
      <View style={styles.container}>
        <TouchableOpacity
            style={{margin: 20, fontSize: 20}}
            onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={{margin: 20, fontSize: 20}}
            onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonText: {
    backgroundColor: '#1E90FF',
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    margin: 20,
    top: 10,
    // borderWidth : 1,
    padding: 10,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 5,
  },
});
