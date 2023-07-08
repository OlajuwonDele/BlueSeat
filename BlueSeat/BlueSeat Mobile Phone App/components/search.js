import React, {useState} from 'react';
import { StyleSheet, View, TextInput, Button} from 'react-native';
import { Formik } from 'formik';


export default function Search({addRoute}){
    

    return(
        <View>
            <Formik
                initialValues={{name: '', destination: '', stopno: ''}}
                onSubmit={(values, actions)=> {
                    actions.resetForm();
                    addRoute(values);
                    // adds user inputted information into the list of destinations etc
                }}
            >
                {(props) => (
                    <View>
                        {/* takes in user input for the route no, destination and stop no */}
                         <TextInput 
                            style = {styles.input}
                            keyboardType = 'numeric'
                            placeholder = '  Add Route No.'
                            onChangeText = {props.handleChange('name')}
                            value = {props.values.name}
                         />
                         <TextInput 
                            style = {styles.input}
                            placeholder = '  Add Destination'
                            onChangeText = {props.handleChange('destination')}
                            value = {props.values.destination}
                         />

                         <TextInput 
                            style = {styles.input}
                            placeholder = '  Add Stop Number'
                            onChangeText = {props.handleChange('stopno')}
                         />
                         <Button title = 'submit' color = '#ff914d' onPress={props.handleSubmit} />
                    </View>
                )}
            </Formik>
        </View>

        
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#e8f4f8",
        
    },
    input: {
       marginBottom: 10,
       paddingHorizontal: 8,
       paddingVertical: 6,
       borderBottomWidth: 1,
       borderColor: '#ddd',

    },

   

})