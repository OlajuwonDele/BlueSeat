import { createStackNavigator } from 'react-navigation-stack';
import About from '../screens/about';

import Header from '../components/header';
import React from 'react';

const screens = {
    About:{
        screen: About,
        navigationOptions: ({navigation}) => {
            return {
                headerTitle: ()=> <Header navigation = {navigation}/>,
            }
        }
    },
    
    //navigates to about stack screens and opens about screen as a default from the drawer slide (open through clicking on header menu button)
    
}

const AboutStack = createStackNavigator(screens);

export default AboutStack;