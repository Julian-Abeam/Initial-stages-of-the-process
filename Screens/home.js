 import React, { Component } from 'react';
 import {View, Text, Button, ToastAndroid} from 'react-native';
 import AsyncStorage from '@react-native-async-storage/async-storage';


 class HomeScreen extends Component  {



 checkLoggedIn = async () => {
   const value = await AsyncStorage.getItem('@session_token');
   if (value == null) {
       this.props.navigation.navigate('Login');
   }
 }

 logout = async () => {
  //Validation Here
  let token =  await AsyncStorage.getItem('@session_token');
  await AsyncStorage.removeItem('@session_token');
  return fetch("http://10.0.2.2:3333/api/1.0.0/user/logout" , {
      method: 'post',
      headers: {
        'X-Authorization': token
      },
    })
    .then((response) => {
      if(response.status === 200){
        ToastAndroid.show("The logout has been Successful!",ToastAndroid.SHORT,
        ToastAndroid.CENTER);
        this.props.navigation.navigate("Login");
      }
       else if (response.status ===401){
        ToastAndroid.show("Make sure you are logged in mate!",ToastAndroid.SHORT,ToastAndroid.CENTER);
        this.props.navigation.navigate("Login");
      }
      else{
        throw 'Something went wrong';
      }
    })
    .then(async (responseJson) => {
      console.log("Logged out now!" , responseJson);
      AsyncStorage.removeItem('@session_token');
      AsyncStorage.removeItem('@user_id');
      this.props.navigation.navigate("Login");

    })
    .catch((error) => {
      console.log(error);
      ToastAndroid.show(error, ToastAndroid.SHORT,ToastAndroid.CENTER);
    })
}

    render() {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Home</Text>
          <Button
           title="logout"
           onPress={() => this.logout()}
           />

        </View>
      );
    }
  }

  export default HomeScreen;
