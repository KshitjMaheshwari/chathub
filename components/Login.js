import React, {useEffect, useState,} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Input} from 'react-native-elements';
import {Card} from 'react-native-paper';
import {auth} from '../firebase';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      var errorMessage = error.message;
      alert(errorMessage);
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace('Chat');
      } else {
      }
    });
    return unsubscribe;
  });

  return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <Input
              style={styles.input}
              leftIcon={{type: 'ant-design', name: 'mail'}}
              placeholder="Email Id"
              onChangeText={(text) => {
                setEmail(text);
              }}
          />
          <Input
              style={styles.input}
              placeholder="Password"
              leftIcon={{type: 'entypo', name: 'lock'}}
              onChangeText={(text) => {
                setPassword(text);
              }}
              secureTextEntry
          />
          <TouchableOpacity styles={styles.button} onPress={signIn}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </Card>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    height: 300,
    margin: 20,
    padding: 20,
  },
  input: {
    margin: 10,
    outline: 'none',
  },
  buttonText: {
    backgroundColor: '#1E90FF',
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    margin: 25,
    top: 10,
    // borderWidth : 1,
    padding: 10,
    marginLeft: 40,
    marginRight: 40,
  },
});
