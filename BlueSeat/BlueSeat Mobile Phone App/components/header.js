import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Header({navigation}){
    const openMenu = () => {
        navigation.openDrawer() 
        // opens the drawer slide when menu button is pressed
    }

    return(
        <View style={styles.header}>
            <MaterialIcons name = 'menu' size = {28} onPress={openMenu} style={styles.icon} />
            <View>
                <Text style = {styles.headerText}>BlueSeat </Text>
                <View >
                 <Image source={require('../assets/splash_custom.png')} style={styles.images} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        
    },



   headerText:{
    flex: 1,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#003366',
    letterSpacing: 4,
 
},

   icon: {
       position: 'absolute',
       left: 16,
       color: '#374785',
   },


   
images: {
    width: 40,
    height: 40,
    left: 100,
    marginHorizontal: 30,
    alignContent: 'flex-end',
    bottom: -2,
    position: "absolute",
},
})