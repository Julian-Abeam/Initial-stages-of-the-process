import React, { Component } from 'react';
import {Button} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {View, Text, TextInput, Alert, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// These imports are required to ensure that the code is able to run on the emulator
class UpdateUser extends Component {
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

  //   async getAsync() {
  //     let id = await AsyncStorage.getItem('id');
  //     let token = await AsyncStorage.getItem('token');
  //     let idParse = await JSON.parse(id);
  //     let tokenParse = await JSON.parse(token);

     this.setState({
       id: idParse,
       token: tokenParse,
     });
   }

   editAccount= async () => {

     const id = await AsyncStorage.getItem('@user_id');
     console.log(id);
     const token = await AsyncStorage.getItem('@session_token');
     console.log(token);
     //Connecting to the server
     return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + id, {
       method: 'PATCH',
       headers: {
         'Content-Type': 'application/json',
         'X-Authorization': token,
       },
       body: JSON.stringify(this.state),
       })
        .then(response => {
          if (response.status !=200) {
            Alert.alert('Error! Make sure you have been logged in please.');
          } else {
            this.props.navigation.navigate('Home');
          }
        })
       .catch(e => {
         console.error(e);
       });


   }


   render() {


     /*
This displays the Firstname, surname, email address, password that the user
is required to added in the boxes to ensure that everything can be added.
Through this code the user is able change the details to what they seem fit
and if there is an issue the go back button allows them to go back to the homepage.

     */
     const navigation = this.props.navigation;
     return (
       <View style={styles.background}>
        <Text style={styles.text}>Change the Forename</Text>
        <TextInput
        style={styles.box}
        onChangeText={text => this.setState({givenName: text})}
        value={this.state.givenName}
        accessibilityLabel="Edit Forename"
        />
        <Text style={styles.text}>Change the Surname</Text>
        <TextInput
           style={styles.box}
           onChangeText={text => this.setState({familyName: text})}
           value={this.state.familyName}
           accessibilityLabel="Edit Surname"
         />
         <Text style={styles.text}>Change the Email Address</Text>
         <TextInput
            style={styles.box}
            onChangeText={text => this.setState({email: text})}
            value={this.state.email}
            accessibilityLabel="Edit Email Address"
          />
          <Text style={styles.text}>Change the Password</Text>
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
            <Button // This is a button which ensures that all the changes made has been accepted or cncelled.
               icon={<Icon name="content-save-edit" size={30} color="white" />}
              onPress={() => this.editAccount()}
              buttonStyle={styles.button}
              title=" Confirm all the Changes that have been made" // The button will display those instructions
              accessibilityLabel="Confirm Edit"
            />

            <Button
               title="Go Back"  // Allows the user to go back to the homepage
               onPress={() => navigation.goBack()}
            />
          </View>

        </View>
      );
    }
  }

  // Stylesheet
  // This has enabled the layout and colour of the page to be more aesthetically pleasing
  // The background is lilac and the boxes are white which makes it easier for the user to change their details.
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#92a8d1',
      justifyContent: 'center',
    },
    text: {
      fontSize: 18,
      color: '#ffffff',
      marginHorizontal: 30,
    },
    box: {
      backgroundColor: '#fefbd8',
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

export default  UpdateUser;
