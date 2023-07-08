import React from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar, Text, Image, View, TouchableHighlight} from 'react-native';
import { useDeviceOrientation } from '@react-native-community/hooks'
import Navigator from './routes/drawer';

export default function App() {
  const {landscape} = useDeviceOrientation();
  return (
    <SafeAreaView style={styles.container}>
      <Navigator/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#35363A',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
     paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
   
    },
});