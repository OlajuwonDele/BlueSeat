import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import * as firebase from 'firebase';

const config = {
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


export default class Data extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      counterBT: '',
      bluetooth: [],
      counterLDR: '',
      ldr: [],
      counterTot: '',
      total: [],
    }
    
    
  }

  componentDidMount() {
    firebase
      .database()
      .ref()
      .child("counter")
      .on("value", snapshot => {
        const data = snapshot.val()
        if (snapshot.val()) {
          const initTot = [];
          Object
            .keys(data)
            .forEach(counterTot => initTot.push(data[counterTot]));
          this.setState({
            total: initTot
          })
        }
      });

      firebase
      .database()
      .ref()
      .child("counterBT")
      .on("value", snapshot => {
        const data = snapshot.val()
        if (snapshot.val()) {
          const initBT = [];
          Object
            .keys(data)
            .forEach(counterBT => initBT.push(data[counterBT]));
          this.setState({
            bluetooth: initBT
          })
        }
      });
      
      firebase
      .database()
      .ref()
      .child("counterLDR")
      .on("value", snapshot => {
        const data = snapshot.val()
        if (snapshot.val()) {
          const initLDR = [];
          Object
            .keys(data)
            .forEach(counterLDR => initLDR.push(data[counterLDR]));
            this.setState({
              ldr: initLDR
          })
        }
      });

  } 


  render() {
  
    return (
      <View style={styles.container}>
        <View style={styles.listItemContainer}>
          <Text style = {styles.listItem}> Bluetooth Value: {this.state.bluetooth}</Text>
        </View>
        <View style={styles.listItemContainer}>
          <Text style = {styles.listItem}> LDR Sensor Value: {this.state.ldr}</Text>
        </View>
        <View style={styles.listItemContainer}>
          <Text style = {styles.listItem}> Total Value: {this.state.total}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listcapacity: {
    flex: 0.5,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#e8f4f8',
  },
 
  listItemContainer: {
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  listItem: {
    fontSize: 20,
    padding: 10,
    color: '#374785',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  }

});