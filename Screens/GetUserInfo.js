import React, { Component } from 'react';
import { Image, View, Text, Button, Alert, TextInput, ToastAndroid, ActivityIndicator, ScrollView, FlatList, TouchableOpacity, StyleSheet, YellowBox } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// imports are required to ensure that the emulator is able to function correctly

class UserInfo extends Component  {
  constructor(props) {
    super(props);

    //this.state = {
    //  userData: [],
    //  locationData: [],

    this.state = {
      userData: [],
      locationData: [],
    };
  }


componentDidMount(){
  this.getData();
}
getData = async () => {
    const value = await AsyncStorage.getItem("@session_token");
    const id = await AsyncStorage.getItem("@user_id");
    //console.log(id);
//  return fetch("http://10.0.2.2:3333/api/1.0.0/user/" + id, {
    return fetch("http://10.0.2.2:3333/api/1.0.0/user/" + id, {
      method: 'get',
      headers: {
        'X-Authorization': value
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        else if (response.status === 401) {
          throw 'Unauthorised, please maske sure you are Logged in first';
        }
        else {
          throw 'There seems to be an issue';
        }
      })
      .then((responseJson) => {
        // console.log(responseJson);
        console.log('Data has loaded');
        this.setState({
          userData: responseJson,
        })

      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT, ToastAndroid.CENTER);
      })



  }


  getInfo = async () => {
    const value = await AsyncStorage.getItem("@session_token");
    const id = await AsyncStorage.getItem("@user_id");
    // console.log(id);
//   return fetch("http://10.0.2.2:3333/api/1.0.0/find", {
//AsyncStorage is used to getItem for the session token
    return fetch("http://10.0.2.2:3333/api/1.0.0/find", {
      method: 'get',
      headers: {
        'X-Authorization': value
      },
    })
      .then((response) => {
        if (response.status === 200) {

          console.log("It worked");
          return response.json();
        }
        else if (response.status === 401) {
          throw 'Unauthorised';
        }
        else {
          throw 'There seems to be an issue';
        }
      })
      .then((responseJson) => {
        //console.log(responseJson);
        this.setState({
          isLoading: false,
          locationData: responseJson
        })

      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT, ToastAndroid.CENTER);
      })


  }

   render() {
// Navigation to instruct where page will go when the button has been pressed
     const navigation = this.props.navigation;
     return (
       <View
         style={{
           flex: 1,
           flexDirection: 'column',
           justifyContent: 'center',
           alignItems: 'center',
         }}>
         <Text>User page</Text>
          <Text style={{ padding: 5 }}>Name: {this.state.userData.first_name} {this.state.userData.last_name}</Text>
           <Text style={{ padding: 5 }}>Email: {this.state.userData.email}</Text>


           <Button
             onPress={() => this.getInfo()}
             title="Show the required location data"
             accessibilityLabel="Confirm Edit"
           />

           <FlatList
             data={this.state.locationData}
             renderItem={({ item }) => (
               <View>
                 <View style={{ padding: 20 }}>
                   <Text>{item.location_town}</Text>
                    <Text>{item.location_id}</Text>
                   <Text>{item.location_name}</Text>
                   <Text>Overall Rating: {item.avg_overall_rating}</Text>
                   <Text>Price Rating: {item.avg_price_rating}</Text>
                   <Text>Quality Rating: {item.avg_quality_rating}</Text>
                   <Text>Clenliness Rating: {item.avg_clenliness_rating}</Text>
                 </View>
                 <Button style={{ padding: 20 }}
                       title="Create new Review"
                       onPress={() => this.props.navigation.navigate("CreateReview", { location_id: item.location_id })}
                     />
                     <Button style={{ padding: 20 }}
                             title="view the Reviews"
                           onPress={() => this.props.navigation.navigate("ViewReview", { location_id: item.location_id })}
                         />
               </View>
             )}
             keyExtractor={(item, index) => item.location_id.toString()}
           />

           <Button
              title="Go back"
              onPress={() => navigation.goBack()}
           />


       </View>
     );
   }
 }

 export default UserInfo;
