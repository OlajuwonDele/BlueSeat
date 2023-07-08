import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import * as firebase from 'firebase';

const config = {
  // firebase database information 
  apiKey: "AIzaSyD2383WtXLMGPnhoJz1icmmgxmv6HYKY98",
  authDomain: "bluetest-ca08a.firebaseapp.com",
  databaseURL: "https://bluetest-ca08a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bluetest-ca08a",
  storageBucket: "bluetest-ca08a.appspot.com",
  messagingSenderId: "492435381618",
  appId: "1:492435381618:web:074855342fadf4151651eb",
  measurementId: "G-0T7BBLRSF4"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}


export let data;

export default class Firebase extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: '',
      messages: []
    }
    
    
  }

  // searches for value of 'messages' in firebase database 
  componentDidMount() { 
    firebase
      .database()
      .ref()
      .child("counter")
      .on("value", snapshot => {
        const data = snapshot.val()
        if (snapshot.val()) {
          const initMessages = [];
          Object
            .keys(data)
            .forEach(message => initMessages.push(data[message]));
          this.setState({
            messages: initMessages
          })
        }
      });

  } 

//sends the total value of people on board mode of transport to bus/train/luas screen
  render() {
    data = this.state.messages
    return (
      <View>
            <Text>{data}/60</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listcapacity: {
    flex: 0.5,
    textAlign: 'center',
  },

  data:{
    flex: 1,
  },

});