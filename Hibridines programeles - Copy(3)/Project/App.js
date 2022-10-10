
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import {
 
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../Project/screens/HomeScreen';
import RecipeInfoPage from '../Project/screens/RecipeInfoPage';
import AllRecipePages from '../Project/screens/AllRecipePages';




const Stack = createNativeStackNavigator();

class App extends Component {

  render(){

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName={HomeScreen} >
      <Stack.Screen name="Home screen" component={HomeScreen}  />
      <Stack.Screen name="recipes" component={RecipeInfoPage}/>
      <Stack.Screen name="Pick a recipe" component={AllRecipePages}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
  }
}

export default App;
