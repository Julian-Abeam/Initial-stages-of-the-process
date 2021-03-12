import React, { Component } from 'react';
import { Image, View, Text, Button, Alert, TextInput, ToastAndroid, ActivityIndicator, ScrollView, FlatList, TouchableOpacity, StyleSheet, YellowBox } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
class LocationInfo extends Component {
  constructor(props) {
    super(props);


    this.state = {
      locationData: [],
      isLoading: true,
    };

  }
  componentDidMount() {
    this.getInfo();
  }

  getInfo = async () => {
    const value = await AsyncStorage.getItem("@session_token");
    const id = await AsyncStorage.getItem("@user_id");
    // console.log(id);

    return fetch("http://10.0.2.2:3333/api/1.0.0/find", {
      method: 'get',
      headers: {
        'X-Authorization': value
      },
    })
      .then((response) => {
        if (response.status === 200) {
// The response 200 means that everything good anything other that highlights that there is an issue.
          console.log("worked");
          return response.json();
        }
        else if (response.status === 401) {
          throw 'Unauthorised';
        }
        else {
          throw 'Something went wrong';
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
// let data  = this.state.locationData;
// item.location_name
// item.avg_overall_rating
// item.avg_price_rating
// item.avg_quality_rating
// item.avg_clenliness_rating

  return (
    <View >
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.locationData}
          renderItem={({ item }) => (
            <View>
              <View style={{ padding: 20 }}>
                <Text>Town {item.location_town}</Text>
                <Text>Name of Cafe: {item.location_name}</Text>
                <Text>Overall Rating: {item.avg_overall_rating}</Text>
                <Text>Overall Rating: {item.avg_overall_rating}</Text>
                <Text>Price Rating: {item.avg_price_rating}</Text>
                <Text>Quality Rating: {item.avg_quality_rating}</Text>
                <Text>Clenliness Rating: {item.avg_clenliness_rating}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => item.location_id.toString()}
        />

      </View>
      <Button
        onPress={() => this.getInfo()}
        title=" Confirm Changes"
        accessibilityLabel="Confirm Edit"
      />

    </View>
  );
}
}


 export default LocationInfo;
