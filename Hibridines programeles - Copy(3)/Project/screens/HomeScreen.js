import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

function HomeScreen({navigation:{navigate}})
{
  const [comment,setComent]= useState('');

   
    return(
       <View style={styles.body}>
        <View style={{
                     padding: 50,
                     }}>
            <Button color="#FAD02C"
                     title="Soups"
                     onPress={() => navigate('Pick a recipe',{name:'Soups',})}>
            </Button>
          <View style={{marginTop:20}}>
            <Button color={"#FAD02C"}
                     title="Deserts"
                     onPress={() => navigate('Pick a recipe',{name:'Deserts',})}>
            </Button>
          </View>
          <View style={{marginTop:20}}>
            <Button color={"#FAD02C"}
                     title="Drinks"
                     onPress={() => navigate('Pick a recipe',{name:'Drinks',})}>
            </Button>
            </View>
            <View style={{marginTop:20}}>
            <Button color={"#FAD02C"}
                     title="Salads"
                     onPress={() => navigate('Pick a recipe',{name:'Salads',})}>
            </Button>
            </View>
            <View style={{marginTop:20}}>
            <Button color={"#FAD02C"}
                     title="Pizzas"
                     onPress={() => navigate('Pick a recipe',{name:'Pizzas',})}>
            </Button>
            </View>
            </View>
        
        </View>

    )
}
const styles= StyleSheet.create(

  {
    body:{
      flex:1, 
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'center'
    },
    side1:
    {
     flex:3,
     flexDirection: 'column',
     justifyContent: 'flex-start'
    },
    side2:
    {flex:3,
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'flex-start',
      borderRadius:1,
      elevation:3,
      shadowOffset:{width:1, height:1},
      shadowColor:"#000000",
      shadowRadius:15,
      margin:2
    },
    
  },
  
) 
export default HomeScreen;