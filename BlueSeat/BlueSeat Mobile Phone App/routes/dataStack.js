import { createStackNavigator } from 'react-navigation-stack';
import Data from '../screens/data';


import Header from '../components/header';
import React from 'react';

const screens = {
    Data:{
        screen: Data,
        navigationOptions: ({navigation}) => {
            return {
                headerTitle: ()=> <Header navigation = {navigation}/>,
            }
        }
    },
    

    //navigates to data stack screens and opens data screen as a default from the drawer slide (open through clicking on header menu button)
        
}

const DataStack = createStackNavigator(screens);

export default DataStack;