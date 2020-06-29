import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Flatlist, TextInput } from 'react-native';
import WelcomeScreen from './Screens/WelcomeScreen';

export default class App extends Component{
  render(){
    return(
      <WelcomeScreen/>
    );
  }
}