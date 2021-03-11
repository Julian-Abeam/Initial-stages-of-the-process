import 'react-native-gesture-handler';



import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';




import Home from './Screens/home';
import About from './components/about';
import Contact from './components/contact';
import Signup from './Screens/Signup';
import Login from './Screens/Login';
import UpdateUser from './Screens/UpdateUser';
import Locations from './Screens/Locations';
import UserData from './Screens/GetUserInfo';
import CreateReview from './Screens/CreateReview';
import ViewLocation from './Screens/ViewLocation';
import ViewReview from './Screens/ViewReview';
// import Home from './components/home_with_buttons';




const Drawer = createDrawerNavigator();




  class App extends Component{
    render(){
      return (
    <NavigationContainer>
    <Drawer.Navigator>
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="About" component={About} />
    <Drawer.Screen name="Contact" component={Contact} />
    <Drawer.Screen name="Signup" component={Signup} />
    <Drawer.Screen name="Login" component={Login} />
    <Drawer.Screen name="UpdateUser" component={UpdateUser} />
    <Drawer.Screen name="Locations" component={Locations} />
    <Drawer.Screen name="UserData" component={UserData} />
   <Drawer.Screen name="ViewLocation" component={ViewLocation} />
    <Drawer.Screen name="CreateReview" component={CreateReview} />
   <Drawer.Screen name="ViewReview" component={ViewReview} />
      </Drawer.Navigator>
     </NavigationContainer>
  );
 }
}
    export default App;
