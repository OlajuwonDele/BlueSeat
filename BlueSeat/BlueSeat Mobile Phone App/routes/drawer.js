import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import HomeStack from './homeStack';
import DataStack from './dataStack';
import AboutStack from './aboutStack';


const RootDrawerNavigator = createDrawerNavigator({
    Home:{
        screen: HomeStack
    },
    Data:{
        screen: DataStack
    },
    About: {
        screen: AboutStack
    }
});
//navigates between the various different stacks of screens

export default createAppContainer(RootDrawerNavigator);