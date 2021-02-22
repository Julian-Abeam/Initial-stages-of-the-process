import React, { Component } from 'react';
import { Button, ToastAndroid } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import AsnyncStorage from 'react-native-async-storage/async-storage';

class HomeScreen extends Component {
  constructor(props){
    super(props);

    this.state = {
      token: ''
    }
  }

componentDidMount() {
  this.unsubscribe = this.props.navigation.addListener('focus', () => {
    this.checkLoggedIn();
  });
}

componentWillUnmount() {
  this.unsubscribe();
}

checkLoggedIn = async () => {
  const value = await AsnyncStorage.getItem('@session_token');
  if(value !== null) {
    this.setState({token:value});
  }else{
    this.props.navigation.navigate("Login");
  }
}

logout = async () => {
  let token = await AsnyncStorage.getItem('@session_token');
  await AsnyncStorage.removeItem('@session_token');
  return fetch("http://10.0.2.2:3333/api/1.0.0/user/logout", {
    method: 'post',
    headers: {
      "X-Authorization": token
    }
  })
  .then((response)) => {
    if(response.status === 200){
      ToastAndroid.show("Successfully gone!", ToastAndroid.SHORT);
      this.props.navigation.navigate("Login");
    }else if (response.status === 401){
       ToastAndroid.show("You weren't even logged in...", ToastAndroid.SHORT);
  }
