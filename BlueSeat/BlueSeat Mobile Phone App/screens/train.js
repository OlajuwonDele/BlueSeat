import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard, FlatList, Modal} from 'react-native';
import Search from '../components/search';
import Firebase from "../connection/firebase";
import { MaterialIcons } from '@expo/vector-icons';


export default function Train(){
    
    const [route, setRoute] = useState([
        {name: '120', destination: 'O Connell', capacity: '14/50', time: '30',  key: '1'},
        {name: '39', destination: 'Finglas', capacity: '30/30', time: '10', key: '2'},
        {name: '40', destination: 'Dublin', capacity: '10/40', time: '2', key: '3'},
        {name: '123', destination: 'Drogheda', capacity: '46/60', time: '14', key: '4'},
    ]);
    
    function Item({name, destination, capacity, time}){
        return(
            <View style={styles.listItem}>
                <Text style={styles.listname}>{name}</Text>
                <Text style={styles.listdestination}>{destination}</Text>
                <Text >{capacity}</Text>
                <Text style={styles.listtime}>{time} mins</Text>
            </View>
        );

    }
   
    const [modalOpen, setModalOpen] = useState(false);

    const addRoute = (route) => {
        route.key =  Math.random().toString(); //generates random number for key
        route.time = new Date().getSeconds(); //sets time to stop at the exact second of when new route is added
        route.capacity = <Firebase/>; //poor method of getting total value into list
        setRoute((prevSearch) => {
            return [route, ...prevSearch];
        });
        setModalOpen(false);
    }

    
    return(

        <View style={styles.train}>
            <View style={styles.searchcontent}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Modal visible={modalOpen} animationType = 'slide'>
                    <View style ={styles.modalContent}>
                        <MaterialIcons 
                            name = 'close'
                            size ={24}
                            style ={{...styles.modalToggle, ...styles.modalClose}}
                            onPress={() => setModalOpen(false)}
                        />
                        <Search addRoute={addRoute}/>
                    </View>
                </Modal>
                </TouchableWithoutFeedback>
                <MaterialIcons 
                    name = 'add'
                    size ={24}
                    style ={styles.modalToggle}
                    onPress={() => setModalOpen(true)}
                />
            </View>
            <View style ={styles.listheader}>
            <Text>         ROUTE           DESTINATION    CAPACITY     TIME </Text>
            </View>
            <View style ={styles.list}>
                <FlatList
                    numColumns={1}
                    keyExtractor= {(item) => item.key}
                    data = {route}
                    renderItem = {({item}) => (
                        <Item name = {item.name} destination = {item.destination} capacity = {item.capacity} time ={item.time}/>
                    )}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    train: {
        flex: 1,
        backgroundColor: "#e8f4f8",
    },

    searchcontent: {
        flex: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },

    listheader: {
        flex: 1,
        paddingStart: 8,
        paddingTop: 10,
        paddingBottom: 20,
        alignItems: 'flex-start',
        backgroundColor: '#ff914d',
        height: '3%',
        width: '100%',
        borderWidth: 1,
        borderColor: 'black',
    },

    list: {
        flex: 40,
        
    },

    listItem:{
        flexDirection: 'row',
        backgroundColor: '#dddd',
        borderColor: 'black',
        borderWidth: 0.5,
        padding: 5,
    },

    listname: {
        flex: 0.5,
        alignItems: 'flex-start',
        textAlign: 'center',
    },

    listname: {
        flex: 0.5,
        alignItems: 'flex-start',
        textAlign: 'center',
    },
    listdestination:{
        flex: 0.5,
        textAlign: 'center',
    },

    listcapacity: {
        flex: 0.5,
        textAlign: 'center',
    },
    listtime:{
        flex: 0.5,
        alignItems: 'flex-end',
        textAlign: 'center',
    },

    modalToggle: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: 'white',
    },

    modalClose:{
        marginTop: 20,
        marginBottom: 0,

    },

    modalContent:{
        flex: 1,
    },

})