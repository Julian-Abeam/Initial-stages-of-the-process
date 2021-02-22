import React, {Component} from 'react';
import {View, Text, ToastAndroid, FlatList} from 'react-native';
import AsnyncStorage from '@react-native-async-storage/async-storage';


class HomeScreen extends Component {
  constructor(props){
    super(props);

    this.state = {
      isloading: true,
      listData: []
    }
  }

componentDidMount() {
  this.unsubscribe = this.props.navigation.addListener('focus', () => {
    this.checkLoggedIn();
  });

  this.getData();
}

componentWillUnmount() {
  this.unsubscribe();
}

getData = async () => {
  const value = await AsnyncStorage.getItem('@session_token');
  return fetch("http://10.0.2.2:3333/api/1.0.0/find", {
    'headers': {
      'X-Authorization': value
    }
  })
  .then((response) => {
    if(response.status === 200){
      return response.json()
    }else if(response.status === 401){
      ToastAndroid.show("You're not logged in", ToastAndroid.SHORT);
      this.props.navigation.navigate("Login");
    }else{
      throw 'Something went wrong';
    }
  })
  .then((responseJson) => {
    this.setState({
      isloading: false,
      listData: responseJson
    })
  })
  .catch((error) => {
    console.log(error);
    ToastAndroid.show(error, ToastAndroid.SHORT);
  })
}

checkLoggedIn = async () => {
  const value = await AsnyncStorage.getItem('@session_token');
  if (value == null) {
    this.props.navigation.navigate('Login');
  }
};

render() {

  if (this.state.isloading){
    return (
      <View
         style={{
           flex: 1,
           flexDirection: 'column'
           justifyContent: 'center'
         }}
    )
  }

}
