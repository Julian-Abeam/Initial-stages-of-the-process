import React, { Component } from 'react';
import { Button, ToastAndroid, View, StyleSheet } from 'react-native';
import { ScrollView, TextInput, TouchableHighlight, Text } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';




class Login extends Component {
    constructor(props) {
        super(props);



        this.state = {
            email: "",
            password: ""
        }




    }
    login = async() => {
        //Validation Here
        return fetch("http://10.0.2.2:3333/api/1.0.0/user/login", {
          // This goes and finds the url link
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
// The response status 200 shows that login has been accepted


                } else if (response.status === 400) {
                    throw 'Email or password seem to be wrong';
                } else {
                    throw 'There seems to be an issue somewhere';
                }

// The response 400 shows that there is an error because the information was not added properly.

            })



        .then(async(responseJson) => {
                console.log("Signed in!", responseJson);
                await AsyncStorage.setItem('@session_token', responseJson.token);
               //This will result in converting back
                await AsyncStorage.setItem('@user_id', JSON.stringify(responseJson.id));
                await AsyncStorage.setItem('@user_info', JSON.stringify(responseJson));
              // This will result in the id out
                this.props.navigation.navigate("Home");
                ToastAndroid.show("You have Logged in successfully!", ToastAndroid.SHORT, ToastAndroid.CENTER);
// This message hightlight to the user that they have managed to log in properly.
// Also highlighted by no errors at the bottom of the emulator


            })
            .catch((error) => {
                console.log(error);
                ToastAndroid.show("error", ToastAndroid.SHORT);
            })
    }



    render() {
        return (
           <View>
           
      <TextInput
      placeholder="Please enter your email"
      onChangeText={(email) => this.setState ({email})}
      value={this.state.email}
      style={{padding:5, borderWidth:1, margin:10}}
      />
      <TextInput
      placeholder="Please enter your password"
      onChangeText={(password) => this.setState ({password})}
      value={this.state.password}
      style={{padding:5, borderWidth:1, margin:10}}
      />
      <Button
      title="Login"
      onPress={() =>  this.login()}
      style={{padding:5, borderWidth:1, margin:10}}
      />
      <Button
         title="Go back"
          onPress={() => this.props.navigation.navigate("Home")}
      />
      </View>
        );
    }
}

// StyleSheet



export default Login;
