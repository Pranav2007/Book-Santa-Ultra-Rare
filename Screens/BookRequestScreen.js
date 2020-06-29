import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Header, KeyboardAvoidingView } from 'react-native';
import db from '../Config';
import firebase from 'firebase';
import Header from '../components/header'

export default class BookRequestScreen extends Component{
  constructor(){
    super();
    this.state = {
      userId:firebase.auth().currentUser.email,
      bookName:"",
      reasonToRequest:"",
    }
  }
  createUniqueId(){
    return Math.random().toString(36).substring(7);
  }
  addRequest = (bookName, reasonToRequest)=>{
    var userId = this.state.userId;
    var randomRequestId = this.createUniqueId();
    db.collection('requested_books').add({
      "user_Id":userId,
      "book_Name":bookName,
      "reason_To_Request":reasonToRequest,
      "request_Id":randomRequestId,
    })
    this.setState({
      bookName:'',
      reasonToRequest:'',
    })
    return Alert.alert("Book Requested Succesfully!");
  }
  render(){
    return(
      <View style = {{flex:1}}>
        <Header title = {"Book Request"}/>
        <KeyboardAvoidingView style = {styles.keyboardStyle}>
          <TextInput style = {styles.formTextInput}
          placeholder = {"Enter Book Name"}
          onChangeText = {(text)=>{
            this.setState({
              bookName:text
            })
          }}
          value = {this.state.bookName}
          />
          <TextInput style = {[styles.formTextInput,{height:300}]}
          multiLine
          numberOfLines = {8}
          placeholder = {"Why do you need the book?"}
          onChangeText = {(text)=>{
            this.setState({
              reasonToRequest:text
            })
          }}
          value = {this.state.reasonToRequest}
          />
          <TouchableOpacity style = {styles.button}
          onPress = {()=>{
            this.addRequest(this.state.bookName, this.state.reasonToRequest)
          }}
          >
            <Text>
              Request
            </Text>
          </TouchableOpacity>
         </KeyboardAvoidingView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  keyboardStyle:{
    flex:1,
    alignItems:'center'
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderRadius:10,
    borderWidth:1,
    padding:10
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    shadowOffset:{width:0, height:8},
    shadowOpacity:0.44,
    shadowRadius:10.32
  }
})