import "react-native-gesture-handler";
import Navigation from "./navigation/Navigation";
import Model from './components/Model'; // import komponen WebView

export default function App() {
  return (
    <Navigation/>
  );
}

/* Diff style
import * as React from 'react';
import NavContainer from './navigation/NavContainer';

function App() {
  return (
    <NavContainer/>
  )
}

export default App;
*/

/*
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  console.log("App executed")

  return (
    <View style={styles.container}>
      <Text>Hello React Native~</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/