import React, { Component } from 'react';
import { Button, ToastAndroid, View, StyleSheet } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';



class Signup extends Component{


  constructor(props){
    super(props);

// this.state first_name, last_name, email, password

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    }
  }


  signup = () => {
    //Validation takes place here

// return fetch("http://10.0.2.2:3333/api/1.0.0/user",
    return fetch("http://10.0.2.2:3333/api/1.0.0/user", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then((response) => {
      if(response.status === 201){
          console.log("User Created with ID: ", response);
        return response.json()
      }else if(response.status === 400){
        throw 'The validation has failed';
      }else{
        throw 'There seems to be an issue';
      }
    })
    .then(async (responseJson) => {
      console.log("User Created with ID: ", responseJson);
      this.props.navigation.navigate("Login");
      ToastAndroid.show('Successfully logged in', ToastAndroid.SHORT);
    })
    .catch((error) => {
      console.log(error);
      ToastAndroid.show("there seems to be an error",ToastAndroid.SHORT);
    })
  }

// This section will display a box for the user first name
// This section will display a box for the user Last name
// This section will display a box for the user email address
// This section will display a box for the user password

  render(){
    return (
      <View style={styles.background}>

      <ScrollView>
        <TextInput
          placeholder="Please enter your first name..."
          onChangeText={(first_name) => this.setState({first_name})}
          value={this.state.first_name}
          style={{padding:5, borderWidth:1, margin:5}}
        />




        <TextInput
          placeholder="Please enter your last name..."
          onChangeText={(last_name) => this.setState({last_name})}
          value={this.state.last_name}
          style={{padding:5, borderWidth:1, margin:5}}
        />




        <TextInput
          placeholder="Please enter your email..."
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          style={{padding:5, borderWidth:1, margin:5}}
        />




        <TextInput
          placeholder="Please enter your password..."
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          secureTextEntry
          style={{padding:5, borderWidth:1, margin:5}}
        />
        <Button // The button allows the user to create the account
          title="Create your account"
          onPress={() => this.signup()}
        />
        <Button
         title="Go Back"
         onPress={() => this.props.navigation.navigate("Home")}
         />
      </ScrollView>
      </View>
    )
  }
}
// This is the StyleSheet
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
})






export default Signup;
