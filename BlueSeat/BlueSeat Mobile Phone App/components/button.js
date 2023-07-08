import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import { HeaderTitle } from 'react-navigation-stack';
import { MaterialIcons } from '@expo/vector-icons';

export default function FlatButton({text, onPress}){
    const opentrain = () => {
     navigation.openDrawer() 
    }
    

    return (
        <TouchableOpacity onPress={onPress}>
            <View style = {styles.button}>
            <MaterialIcons name = 'commute' size = {20} onPress={opentrain} style={styles.icon} />
            <Text style = {styles.buttonText}> {text} </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create ({
    button: {
        width:110,
        height: 70,
        borderRadius: 30,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: '#ff914d',
        flexDirection:'row',
        justifyContent: 'space-between',
    
    },

    buttonText:{
        color: '#374785',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 17,
        textAlign: 'center',
        right:4,
    },

    icon:{
        color: '#374785',
        right:6,
}
   
})
