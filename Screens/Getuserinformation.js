import React, { Component } from 'react';
import {Button} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {View, Text, TextInput, Alert, Stylesheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class Getuserinformation extends Component {
   constructor(props) {
     super(props);
     this.state = {
       givenName: '',
       familyName: '',
       email: '',
       password: '',
     };
   }


   componentDidMount() {
     this.onFocus = this.props.navigation.addListener('focus', () => {
       this.getAsync();
     });
     this.getAsync();
   }


   async getAsync() {
     let id = await AsyncStorage.getItem('id');
     let token = await AsyncStorage.getItem('token');
     let idParse = await JSON.parse(id);
     let tokenParse = await JSON.parse(token);

     this.setState({
       id: idParse,
       token: tokenParse,
     });
   }

   editAccount() {
     //Connecting to the server
     return fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + this.state.id, {
       method: 'PATCH',
       body: JSON.stringify({
         given_name: this.state.givenName,
         family_name: this.state.familyName,
         email: this.state.email,
         password: this.state.password,
       }),
       headers: {
         'Content-Type': 'application/json',
         'X-Authorization': JSON.parse(this.state.token),
       },
     })
        .then(response =. {
          if (response.status !=201) {
            Alert.alert('Error! Edit failed.');
          } else {
            this.props.navigation.navigate('Profile');
          }
        })
       .catch(e => {
         console.error(e);
       });
   }

   //Display components
   render() {
     return (
       <View style={styles.background}>
        <Text style={styles.text}>Edit Forename</Text>
        <TextInput
        style={styles.box}
        onChangeText={text => this.setState({givenName: text})}
        value={this.state.givenName}
        accessibilityLabel="Edit Forename"
        />
        <Text style={styles.text}>Edit Surname</Text>
        <TextInput
           style={styles.box}
           onChangeText={text => this.setState({familyName: text})}
           value={this.state.familyName}
           accessibilityLabel="Edit Surname"
         />
         <Text style={styles.text}>Edit Email Address</Text>
         <TextInput
            style={styles.box}
            onChangeText={text => this.setState({email: text})}
            value={this.state.email}
            accessibilityLabel="Edit Email Address"
          />
          <Text style={styles.text}>Edit Password</Text>
          <TextInput
             style={styles.box}
             onChangeText={text => this.setState({password: text})}
             value={this.state.password}
             accessibilityLabel="Edit Password"
             secureTextEntry
          />
          <View style={styles.buttonContainer}>
             <Button
              title=" Edit Photo"
              icon={<Icon name="camera-account" size={30} color="white" />}
              onPress={() => this.props.navigation.navigate('Edit Photo')}
              buttonStyle={styles.button}
              accessibilityLabel="Edit Profile Photo"
            />
            <Button
               icon={<Icon name="content-save-edit" size={30} color="white"}
              on Press={() => this.editAccount()}
              buttonStyle={styles.button}
              title=" Confirm Changes"
              accessibilityLabel="Confirm Edit"
            />
          </View>
        </View>
      ):
    }
  }

  // Stylesheet
  const styles = Stylesheet.create({
    background: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#0353a4',
      justifyContent: 'center',
    },
    text: {
      fontsize: 18,
      color: '#ffffff',
      marginHorizontal: 30,
    },
    box: {
      backgroundColor: '#002855',
      marginHorizontal: 10,
      marginVertical: 5,
      width: 200,
      height: 50,
    },
    buttonContainer: {
      alignItems: 'center',
      flexDirection:'column',
      marginTop:50,
      marginBottom: 10,
      justifyContent: 'center',
    },
  })

export default  Getuserinformation;
