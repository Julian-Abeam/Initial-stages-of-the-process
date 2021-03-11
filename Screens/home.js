 import React, { Component } from 'react';
 import {View, Text, Button, ToastAndroid, StyleSheet} from 'react-native';
 import AsyncStorage from '@react-native-community/async-storage';


 class Home extends Component  {



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
      const navigation = this.props.navigation;
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#92a8d1'
          }}>
          <Text>Welcome to the Homepage</Text>
           <Button
            title="Login"
            onPress={() => this.props.navigation.navigate("Login")}
            />
            <Button
             title="Signup"
             onPress={() => this.props.navigation.navigate("Signup")}
             />
             <Button
              title="logout"
              onPress={() => this.logout()}
              />
        </View>
      );
    }
  }

  export default Home;
