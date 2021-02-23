 import React, { Component } from 'react';
 import {View, Text} from 'react-native';
 import AsnyncStorage from '@react-native-async-storage/async-storage';


 class HomeScreen extends Component  {

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
   if (value == null) {
       this.props.navigation.navigate('Login');
   }
 };

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
        </View>
      );
    }
  }

  export default HomeScreen;
