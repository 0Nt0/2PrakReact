
import React, { Component } from 'react';
import { NavigationContainer,useLinkProps,useRoute } from '@react-navigation/native';

import {
 
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Button
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import RecipeData from '../data/RecipeData';
import { useState, useEffect } from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AllRecipePages({navigation})
{
    const route= useRoute();

    const [Spcomment,setSpComent]= useState('');
    const [Spcomentlist, setSpComentList]= useState([]);
    const [retreave, setRetreave]= useState(true)
  
    useEffect(()=>{
      const retreaveData=async()=>
      { try
        {
        const valueSt =await AsyncStorage.getItem('@storage_Key')
        const valPar= JSON.parse(valueSt)
        valPar=== null ? setSpComentList([]) : setSpComentList(valPar)
      }
      catch(e)
      {
        console.log(e)
      }
    }
     if(retreave)
     {
      retreaveData();
      setRetreave(false);
     } 
   },
   [retreave] 
   )
  
   const saveObject= async(Spcomment,pagenm)=>
   {
    try {
      const newSpComment={
        id: uuid.v4(),
        idd: pagenm, 
        Spcomment: Spcomment
      }
      const jsonValue=JSON.stringify([...Spcomentlist,newSpComment] );
      await AsyncStorage.setItem('@storage_Key',jsonValue)
      setSpComentList(JSON.parse(jsonValue))
    } catch (error) {
      console.log(error)
    }
   }
   const deleteItem = async (id) => {
    try {
      
      const rec= await AsyncStorage.getItem('@storage_Key'); 
      let jsonform = JSON.parse(rec);
      const coments = jsonform.filter(list=>{return list.id!==id });
    await AsyncStorage.setItem('@storage_Key', JSON.stringify(coments));
     /* const jsonValue=JSON.stringify([...Spcomentlist,newSpComment] );
      await AsyncStorage.setItem('@storage_Key',jsonValue)
      setSpComentList(JSON.parse(jsonValue))*/
     /* let ids=JSON.parse(rec)
        const newLt=ids.filter(iden=>iden.info!==info)
        await AsyncStorage.setItem('@storage_Key',JSON.stringify(newLt))*/
      const TempList= Spcomentlist.filter(list=>{return list.id!==id } )
      const emptyArray = [];
      setSpComentList(emptyArray);
      setSpComentList(TempList)
      
    } catch (e) {
  
    }
  }

    return(
       <View style={styles.body}>
          <View style={styles.side1}>
          <FlatList 
          data={RecipeData}
          keyExtractor={(item)=>item.id}
          renderItem={ ({item})=>{
    
              if(route.params.name===item.catagory)
              {
              return(<TouchableOpacity onPress={()=>  navigation.navigate('recipes', item)}>
                 <Text style={styles.textStyle}>{item.name}</Text></TouchableOpacity>
              )
              }
    
          }
          } 
          />
       </View><View style={styles.side2}>
   <Text></Text>
       
       <TextInput style={{borderColor:"#000000", 
                          borderWidth:2,
                          padding:2,
                          width: 250
                         }}
                         onChangeText={(text)=>setSpComent(text)} > </TextInput>
                         <Button title='Submit' onPress={()=>saveObject(Spcomment,route.params.name)} ></Button>
    
                         <FlatList 
        data={Spcomentlist}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=> {
            if(route.params.name===item.idd)
            {
          return(
            
            <View>
             <TouchableOpacity onPress={()=>deleteItem(item.id)}> 
              <Text style={{color:'#000000', fontSize:15}}>
                {item.Spcomment}
              </Text>
              </TouchableOpacity>
              </View>
          )}
        } } 
        /> 

   </View>
   </View>
  )
}
const styles= StyleSheet.create(

  {
    textStyle:{
     
       fontSize:20,
       color: "#000000",
       padding:20
    },
    
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
        {
          flex:3,
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
    export default AllRecipePages




