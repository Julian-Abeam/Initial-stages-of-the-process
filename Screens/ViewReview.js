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
          throw 'This will not be authorised!!!Sorry';
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

  liketheReview = async (loc_id,rev_id) => {
    const value = await AsyncStorage.getItem("@session_token");
    const id = await AsyncStorage.getItem("@user_id");
    // console.log(id);

    return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+loc_id+"/review/"+rev_id+"/like", {
      method: 'post',
      headers: {
        'X-Authorization': value
      },
    })
      .then((response) => {
        if (response.status === 200) {

          //console.log("loc favourited");
          //return response.json();
        }
        else if (response.status === 401) {
          throw 'Sorry but you cannot View This Information';
        }
        else {
          throw 'There Seems To Be A Problem';
        }
      })
      .then(async () => {
        console.log("Review has been liked");
        this.getInfo();

      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT, ToastAndroid.CENTER);
      })
// This section allows review  that has been ticked by the user or unliked
}
unlikedReview = async (loc_id,rev_id) => {
  const value = await AsyncStorage.getItem("@session_token");
  const id = await AsyncStorage.getItem("@user_id");
  // console.log(id);

  return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+loc_id+"/review/"+rev_id+"/like", {
    method: 'delete',
    headers: {
      'X-Authorization': value
    },
  })
    .then((response) => {
      if (response.status === 200) {
// 200 ighlights the fuctions are all working correctly
        //console.log("loc favourited");
        //return response.json();
      }
      else if (response.status === 401) {
        throw 'Sorry You Are Unauthorised To View This Information';
      }
      else {
        throw 'Problem has occured';
      }
    })
    .then(async () => {
      console.log("review has been unliked!!!");
      this.getInfo();

    })
    .catch((error) => {
      console.log(error);
      ToastAndroid.show(error, ToastAndroid.SHORT, ToastAndroid.CENTER);
    })

}


//



  render() {
    const loc_id = this.props.route.params.location_id;
    return (
      <View style={styles.background}>
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
// add review id AsyncStorage => get this from item.review_id
// Text: overall_rating
// Text: price_rating
// Text: quality_rating
// Text: clenliness_rating
// Text: Likes
  }}>
                <Text>{item.review_body}</Text>
                <Text>Overall Rating:  {item.overall_rating}</Text>
                <Text>Price Rating:  {item.price_rating}</Text>
                <Text>Quality:  {item.quality_rating}</Text>
                <Text>clenliness:  {item.clenliness_rating}</Text>
                <Text>Likes:  {item.likes}</Text>
                <Button style={{ padding: 20 }}
                      title="like rev"
                      onPress={() => this.liketheReview(loc_id,item.review_id)}
                    />
                    <Button style={{ padding: 20 }}
                          title="unlike rev"
                          onPress={() => this.unlikedReview(loc_id,item.review_id)}
                        />

                        <Button
                         title="Go Back"
                         onPress={() => this.props.navigation.navigate("UserData")}
                         />
</TouchableOpacity>
              </View>


            )}
            keyExtractor={(item, index) => item.review_id.toString()}
          />

        </View>

      </View>
  </View>
    );
  }
}

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

export default ViewReview;
