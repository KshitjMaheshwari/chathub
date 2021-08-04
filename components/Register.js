import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Input} from 'react-native-elements';
import {Card} from 'react-native-paper';
import {auth} from '../firebase';

export default function Register({navigation}) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [imageURL, setImageURl] = useState('');

    const register = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;

                user
                    .updateProfile({
                        displayName: name,
                        photoURL: imageURL
                            ? imageURL
                            : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
                    })
                    .then(() => {
                        // Update successful
                        // ...
                    })
                    .catch((error) => {
                        // An error occurred
                        // ...
                    });
                // ...
            })
            .catch((error) => {
                var errorMessage = error.message;
                alert(errorMessage);
                // ..
            });
        navigation.replace('Chat');
    };

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Input
                    style={styles.input}
                    leftIcon={{type: 'material', name: 'lock'}}
                    placeholder="Name"
                    onChangeText={(text) => {
                        setName(text);
                    }}
                />
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
                <Input
                    style={styles.input}
                    leftIcon={{type: 'material', name: 'face'}}
                    placeholder="Image URL"
                    onChangeText={(text) => {
                        setImageURl(text);
                    }}
                />
                <TouchableOpacity styles={styles.button} onPress={register}>
                    <Text style={styles.buttonText}>Register</Text>
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
        height: 500,
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
