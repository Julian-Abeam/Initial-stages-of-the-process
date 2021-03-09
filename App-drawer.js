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



      </Drawer.Navigator>
     </NavigationContainer>
  );
 }
}
    export default App;
