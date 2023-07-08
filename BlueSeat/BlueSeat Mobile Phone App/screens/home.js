import React from 'react';
import { StyleSheet, View, Text, Button, TouchableHighlight} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Flatbutton from  '../components/button';
import { MaterialIcons } from '@expo/vector-icons';


export default function Home({navigation}){

    const pressHandlerTrain = () => {
        navigation.navigate('Train');
    }
    //when button pressed navigates screen to Train screen

    const pressHandlerBus = () => {
        navigation.navigate('Bus');
    }
    //when button pressed navigates screen to Bus screen
    

    const pressHandlerLuas = () => {
        navigation.navigate('Luas');
    }
    //when button pressed navigates screen to Luas screen
    
    return(
        <View style={styles.home}>
            <Text style = {styles.text}>                      Welcome back.   {'\n'} {'\n'} Choose your method of transportation:</Text>
            
            <View style = {styles.buttontrain}>
            <Flatbutton text ='Train' onPress = {pressHandlerTrain} />
            </View>
            
            <View style = {styles.buttonbus}>
            <Flatbutton text ='Bus' onPress = {pressHandlerBus}/>
            </View>
           
            <View style = {styles.buttonLuas}>
            <Flatbutton text ='Luas' onPress = {pressHandlerLuas}/>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: '#e8f4f8',
        flexDirection: 'row',
        justifyContent: 'center',
        
    },

    icons: {
        backgroundColor: "#242529",
        padding: '1%',
        color : '#0F1012',
        fontSize: 50,
    },


    text: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#374785',
        letterSpacing: 1,
        top:200,
        position: 'absolute',
    },

    buttontrain: {
        width: 100,
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        position: 'absolute',
        bottom: '45%',
        top:290,
    },

    buttonbus: {
        width: 200,
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        position: 'absolute',
        bottom: '45%',
        top:450,
    },
    buttonLuas: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        position: 'absolute',
        bottom: '45%',
        top: 370,
    },
    icon:{
    
    }
})