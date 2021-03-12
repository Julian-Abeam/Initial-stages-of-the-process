import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

class About extends Component {
render(){

const navigation = this.props.navigation;


  return (
    <View style={styles.container}>
          <Text style={styles.text}>The Project</Text>

          <Text> This emulator is about to convey how you are able to Login, Sign up,
          Logout,Show location_id, User updates and many more things  </Text>
            <Button
               title="Go back"
               onPress={() => navigation.goBack()}
            />
           </View>
         );
      }
    }

    const styles = StyleSheet.create({
      container:{
         flex: 1,
         alignItems: 'center',
         justifyContent: 'center',
         backgroundColor: '#92a8d1'
      },
      text: {
        color: 'white',
        fontSize:25
      }
    });

    export default  About;
