import React, {useCallback, useLayoutEffect, useState,} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {auth, db} from '../firebase';
import {AntDesign} from '@expo/vector-icons';
import {Avatar} from 'react-native-elements';
import {GiftedChat} from 'react-native-gifted-chat';

export default function Chat({navigation}) {
    const [messages, setMessages] = useState([]);

    // useEffect(() => {
    //   setMessages([
    //     {
    //       _id: 1,
    //       text: 'Hello developer',
    //       createdAt: new Date(),
    //       user: {
    //         _id: 2,
    //         name: 'React Native',
    //         avatar: 'https://placeimg.com/140/140/any',
    //       },
    //     },
    //   ]);
    // }, []);

    useLayoutEffect(() => {
        const unsubscribe = db
            .collection('chats')
            .orderBy('createdAt', 'desc')
            .onSnapshot((snapshot) =>
                setMessages(
                    snapshot.docs.map((doc) => ({
                        _id: doc.data()._id,
                        createdAt: doc.data().createdAt.toDate(),
                        text: doc.data().text,
                        user: doc.data().user,
                    }))
                )
            );
        return unsubscribe;
    }, []);
    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages)
        );
        const {_id, createdAt, text, user} = messages[0];
        db.collection('chats').add({
            _id,
            createdAt,
            text,
            user,
        });
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{marginLeft: 20}}>
                    <Avatar rounded source={{uri: auth?.currentUser?.photoURL}}/>
                </View>
            ),

            headerRight: () => (
                <TouchableOpacity style={{marginRight: 20}} onPress={signOut}>
                    <AntDesign name="logout" size={24} color="black"/>
                </TouchableOpacity>
            ),
        });
    });

    const signOut = () => {
        auth
            .signOut()
            .then(() => {
                // Sign-out successful.
                navigation.replace('Login');
            })
            .catch((error) => {
                // An error happened.
            });
    };

    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage
            onSend={(messages) => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                name: auth?.currentUser?.displayName,
                avatar: auth?.currentUser?.photoURL,
            }}
        />
    );
}
