import React from 'react';
import { StyleSheet, View, Text, FlatList, Image} from 'react-native';



export default function Footer(){

    const creator = [
        {name: 'Olajuwon Dele', role: 'Software App & Electronics Manager', image:  1,  key: '1'},
        {name: 'Niamh Cowan', role: 'Software App Manger', image: 2 ,  key: '2'},
        {name: 'Jack McCarthy', role: 'Electronics Manager', image: 3 ,  key: '3'},
        {name: 'Eoghan O Leary', role: 'Bluetooth Manager', image: 4 ,  key: '4'},
        {name: 'James Collins', role: 'Bluetooth Manager', image: 8 ,  key: '8'},
        {name: 'Connor Curran', role: '3D Printing Manager', image: 5 ,  key: '5'},
        {name: 'Ahad Khalil', role: 'Videos Manager', image: 6 ,  key: '6'},
        {name: 'Tim Dolan', role: 'Solidworks Manager', image: 7 ,  key: '7'},
    
    ];
    
    const images = {
        key: {
            1: require("../assets/juwon.png"),
            2: require("../assets/niamh.png"),
            3: require("../assets/jack.png"),
            4: require("../assets/eoghan.png"),
            5: require("../assets/connor.png"),
            6: require("../assets/ahad.png"),
            7: require("../assets/tim.png"),
            8: require("../assets/james.png"),
        }
    }

    function Item({name, role, image}){
        return(
            <View style={styles.listItem}>
                <Text style={styles.listname}>{name} </Text>
                <Text style={styles.listrole}> Role: {role} </Text>
                <View>
                    <Image style ={styles.image} source={images.key[image]}/> 
                </View>
            </View>
        );

    } 

    return(
        <View style={styles.container}>
            <View style={styles.aboutApp}>
            <Text style = {styles.text}>                            About us: {'\n'} {'\n'} 
             We're Group 5. {'\n'} {'\n'} 
              Our mission is to develop an electro-mechanic system which monitors public transport capacity and provides public
             access to this live data. {'\n'} {'\n'} 
              We want to create a comfortable, stress-free journey for our users by controlling overcrowding on Irish public transport.</Text>
            </View>
            <View style={styles.aboutCreators}>
                <FlatList
                    numColumns={1}
                    keyExtractor= {(item) => item.key}
                    data = {creator}
                    renderItem = {({item}) => (
                        <Item name = {item.name} role = {item.role}  image ={item.image}/>
                    )}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dddd',
    },

    aboutApp:{
        flex: 1,
        borderColor: '#374785',
        borderWidth: 1,
    },

    aboutText:{
        fontSize: 10,
        
    },
    aboutCreators:{
        borderWidth: 1,
        borderColor: '#374785',
        flex: 3,
        backgroundColor: '#ff914d',
    },

    listItem:{
        flex: 1,
        padding: 10,
        flexDirection: 'column',
    },
    

    listname:{
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#374785',
       
    },

    listrole:{
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#374785',
    },
    
    image:{
        borderRadius: 50,
        height:100,
        width:100,
        borderColor: '#374785',
        borderWidth: 1,
        backgroundColor: '#374785',
        alignContent: 'flex-end'
    },

    text: {
        padding: 10,
        paddingBottom: 3,
        fontSize: 12,
        color: '#374785',
        letterSpacing: 1,
        position: 'absolute',
        fontWeight: 'bold',

       
    },
})