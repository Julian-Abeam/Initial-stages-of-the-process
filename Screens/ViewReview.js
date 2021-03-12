import React, { Component } from 'react';
import { View, Text, Button, Alert, TextInput, ToastAndroid, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class ViewReview extends Component {
  constructor(props) {
    super(props);

  //  this.state = {
  //    locationData: [],
  //    isLoading: true,
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
    const loc_id = this.props.route.params.location_id;

// fetch("http://10.0.2.2:3333/api/1.0.0/location/
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/" + loc_id, {
      method: 'get',
      headers: {
        'X-Authorization': value
      },
    }) //If the response is 200 this means that the code is running properly
      .then((response) => {
        if (response.status === 200) {
          return response.json();

        } // If the code shows this response when the review has been added there seems to be something wrong.
        else if (response.status === 401) {
          throw 'Unauthorised/ This will not be accepted';
        }
        else {
          throw 'There seems to be an issue';
        }
      })
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
            locationData: responseJson,
        })

      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT, ToastAndroid.CENTER);
      })


  }
  render() {
    return (
      <View >
        <View>
          <FlatList
            data={this.state.locationData.location_reviews}
            renderItem={({ item }) => (

              //Items: overall_rating, price_rating, quality, clenliness, Likes

              <View style={{ padding: 20 }}>
<TouchableOpacity

  onPress ={() =>  {
// Navigate to likeUnlike
// add review id
  }}>
                <Text>{item.review_body}</Text>
                <Text>Overall Rating:  {item.overall_rating}</Text>
                <Text>Price Rating:  {item.price_rating}</Text>
                <Text>Quality:  {item.quality_rating}</Text>
                <Text>clenliness:  {item.clenliness_rating}</Text>
                <Text>Likes:  {item.likes}</Text>
</TouchableOpacity>
              </View>


            )}
            keyExtractor={(item, index) => item.review_id.toString()}
          />

        </View>

      </View>
    );
  }
}

export default ViewReview;
