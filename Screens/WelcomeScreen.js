import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import db from '../Config';
import firebase from 'firebase';

export default class WelcomeScreen extends Component{
  constructor(){
    super();
    this.state = {
      emailId:'',
      password:'',
      firstName:'',
      lastName:'',
      address:'',
      contact:'',
      confirmPassword:'',
      isModelVisible:'false',
    }
  }
  userSignUp = (emailId, password, confirmPassword)=>{
    if(password !== confirmPassword){
      return Alert.alert("The password doesn't match. Please check.")
    }
    else{
      firebase.auth().createUserWithEmailAndPassword(emailId, password).then(()=>{
      db.collection('users').add({
        first_name:this.state.firstName,
        last_name:this.state.lastName,
        contact:this.state.contact,
        email_id:this.state.emailId,
        address:this.state.address,
      })
      return Alert.alert("User added successfully.",
      '',
      [{
        text:'Ok', onPress:()=>{
          this.setState({"isModelVisible":false})
        }
      }]
      )
    })
    .catch((error)=>{
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    })
  } 
  }
  userLogin = (emailId, password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId, password).then((response)=>{
      return Alert.alert("Successfully Logged In.")
    })
    .catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    })
  }
  showModel = ()=>{
    return(
      <Modal animationType = "fade"
      transparent = {true}
      visible = {this.state.isModelVisible}
      >
        <View style = {styles.modelContainer}>
          <ScrollView style = {{width:100}}>
            <KeyboardAvoidingView style = {styles.keyboardAvoidingView}>
              <Text style = {styles.modelTitle}>
                Registration
              </Text>
              <TextInput style = {styles.formTextInput}
              placeholder = {"First Name"}
              maxLength = {12}
              onChangeText = {(text)=>{
                this.setState({firstName:text})
              }}
              />
              <TextInput style = {styles.formTextInput}
              placeholder = {"Last Name"}
              maxLength = {12}
              onChangeText = {(text)=>{
                this.setState({lastName:text})
              }}
              />
              <TextInput style = {styles.formInputText}
              placeholder = {"Contact Number"}
              maxLength = {11}
              keyboardType = {'numeric'}
              onChangeText = {(text)=>{
                this.setState({contact:text})
              }}
              />
              <TextInput style = {styles.formTextInput}
              placeholder = {"Residence Address"}
              multiline = {true}
              onChangeText = {(text)=>{
                this.setState({address:text})
              }}
              />
              <TextInput style = {styles.formTextInput}
              placeholder = {"Email ID"}
              keyboardType = {'email-address'}
              onChangeText = {(text)=>{
                this.setState({emailId:text})
              }}
              />
              <TextInput style = {styles.formTextInput}
              placeholder = {"Enter Password"}
              secureTextEntry = {true}
              onChangetext = {(text)=>{
                this.setState({password:text})
              }}
              />
              <TextInput style = {styles.formTextInput}
              placeholder = {"Confirm Password"}
              secureTextEntry = {true}
              onChangeText = {(text)=>{
                this.setState({confirmPassword:text})
              }}
              />
              <View style = {styles.modelBackButton}>
                <TouchableOpacity style = {styles.registerButton}
                onPress = {()=>{
                  this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                }}>
                  <Text style = {styles.registerButtonText}>
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
              <View style = {styles.modelBackButton}>
                <TouchableOpacity style = {styles.cancelButton}
                onPress = {()=>{
                  this.setState({"isModelVisible":false})
                }}>
                  <Text style = {styles.cancelButtonText}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    )
  }
  render(){
    return(
      <View style = {styles.container}>
        <View>
          <Text style = {styles.title}>
              Book Santa
          </Text>
        </View>
        <View style = {styles.buttonContainer}>
          <TextInput
          style = {styles.loginBox}
          placeholder = "Email Ex: abc@booksanta.com"
          placeholderTextColor = '#ccc'
          keyboardType = 'email-address'
          onChangeText = {(text)=>{
            this.setState({
              emailId:text,
            })
          }}
          />
          <TextInput
          style = {styles.loginBox}
          secureTextEntry = {true}
          placeholder = "Password"
          placeholderTextColor = "#ccc"
          onChangeText = {(text)=>{
            this.setState({
              password:text,
            })
          }}
          />
          <TouchableOpacity style = {[styles.button, {marginBottom:20, marginTop:20}]}
          omPress = {()=>{
            this.userLogin(this.state.emailId, this.state.password)
          }}
          >
            <Text style = {styles.button}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.button}
          onPress = {()=>{
            this.userSignUp(this.state.emailId, this.state.password);
          }}
          >
            <Text style = {styles.buttonText}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    backgroundColor:"#ff00ff"
  },
  title:{
    alignItems:'center',
    fontSize:20
  },
  loginBox:{
    width:300,
    height:40,
    borderWidth:1.5,
    borderColor:"#000",
    fontSize:20,
    margin:20,
    paddingLeft:10,
    alignItems:'center',
    justifyContent:'center'
  },
  buttonContainer:{
    flex:1,
    alignItems:'center'
  },
  buttonText:{
    color:"#FFFF00",
    fontSize:20
  },
  button:{
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#FF9800",
    shadowColor:"#000",
    shadowOffset:{width:0, height:8},
    shadowOpacity:0.3,
    shadowRadius:10.3,
    elevation:16
  },
  modelContainer:{
    flex:1,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#FFF",
    marginRight:30,
    marginLeft:30,
    marginTop:80,
    marginBottom:80
  },
  modelTitle:{
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',
    color:"#FF5722",
    margin:50
  },
  formTextInput:{
    width:75,
    height:35,
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',
    borderColor:"#FFAB91",
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10
  },
  modelBackButton:{
    flex:1,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#FFF",
    marginRight:30,
    marginLeft:30,
    marginTop:80,
    marginBottom:80
  },
  registerButton:{
    width:200,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderRadius:10,
    marginTop:30,
    backgroundColor:"#FFF",
  },
  registerButtonText:{
    color:"#120A8F",
    fontSize:15
  },
  cancelButton:{
    width:200,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#FFF",
    borderRadius:10,
    borderWidth:1,
    marginTop:30
  },
  cancelButtonText:{
    color:"#120A8F",
    fontSize:15
  }
})