import React, { Component } from 'react';
import { NavigationContainer, useLinkProps, useRoute } from '@react-navigation/native';

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
import RecipeInfo from '../data/RecipeInfo';
import DrinkSaladData from '../data/DrinkSaladData';
import Pizza from '../data/Pizza';
import { useState, useEffect } from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

function RecipeInfoPage(){

  const [Reccomment,setRecComent]= useState('');
  const [Reccomentlist, setRecComentList]= useState([]);
  const [retreave, setRetreave]= useState(true)

   const route= useRoute();

   useEffect(()=>{
    const retreaveData=async()=>
    
    { try
      {
      const valueRec =await AsyncStorage.getItem('@storage_Key')
      const valRec= JSON.parse(valueRec)
      valRec=== null ? setRecComentList([]) : setRecComentList(valRec)
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

 const saveObject= async(Reccomment, Recipe)=>
 {
  try {
    const newRecComment={
      id: uuid.v4(),
      idd: Recipe, 
      Reccomment: Reccomment
    }
    const jsonValue=JSON.stringify([...Reccomentlist,newRecComment] );
    await AsyncStorage.setItem('@storage_Key',jsonValue)
    setRecComentList(JSON.parse(jsonValue))
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
     /* const jsonValue=JSON.stringify([...Reccomentlist,newSpComment] );
      await AsyncStorage.setItem('@storage_Key',jsonValue)
      setReccomentlist(JSON.parse(jsonValue))*/
     /* let ids=JSON.parse(rec)
        const newLt=ids.filter(iden=>iden.info!==info)
        await AsyncStorage.setItem('@storage_Key',JSON.stringify(newLt))*/
      const TempList= Reccomentlist.filter(list=>{return list.id!==id } )
      const emptyArray = [];
      setReccomentlist(emptyArray);
      setReccomentlist(TempList)

  } catch (e) {

  }
}

    return(

<View style={styles.body}>
  <View style={styles.side1}>
  <Text>
     <FlatList 
        data={RecipeData}
        renderItem={ ({item,index})=>{
            if(item.id===route.params.id)
            {
            return(
              <View>
                <Text style={styles.textStyle}>{item.name} </Text>
              </View>
            )
            }
        }
        } 
        /> 
  </Text>

  </View>
  <View style={styles.side2}>
    <Text>
    <FlatList 
      data={RecipeInfo}
      renderItem={({item,index}) =>{
        if(item.id=== route.params.id)
        {
          return(
            <View>
              <Text style={{fontSize:18, color:"#000000"}}>
                *{item.product_name}
              </Text>
            </View>

          )
        }
        else 
        {
          return(
            null
          )
        }
      } }
      keyExtractor={item => item.idd}
      />
      <FlatList data={DrinkSaladData}
             renderItem={({item})=>{
              if(item.id===route.params.id)
              {
                return(
                  <View>
                    <Text style={{fontSize:18, color:"#000000"}}>
                      *{item.product_name}
                    </Text>
                  </View>
                )
              }
              else return(null)

             } } keyExtractor={item => item.idd}/>

             <FlatList data={Pizza}
             renderItem={({item})=>{
              if(item.id===route.params.id)
              {
                return(
                  <View>
                    <Text style={{fontSize:18, color:"#000000", alignSelf:'flex-end'}}>
                      *{item.product_name}
                    </Text>
                  </View>
                )
              }
              else return(null)

             } } keyExtractor={item => item.idd}/>


</Text>
  </View>

  <View style={styles.side3}>
  <FlatList data={RecipeData}
             renderItem={({item})=>{
              if(item.id===route.params.id)
              {
                return(
                  <View>
                    <Text style={{fontSize:18, color:"#000000"}}>
                      {item.step1}</Text>
                      <Text style={{fontSize:18, color:"#000000"}}>
                      {item.step2}</Text>
                      <Text style={{fontSize:18, color:"#000000"}}>
                      {item.step3}</Text>
                    
                  </View>
                )
              }
              else return(null)

             } } keyExtractor={item => item.id}/>
  </View>
  <View style={styles.side4}>
  <Text></Text>
         
         <TextInput style={{borderColor:"#000000", 
                            borderWidth:2,
                            padding:2,
                            width: 250,
                            alignItems: 'center'
                           }}
                           onChangeText={(text)=>setRecComent(text)} > </TextInput>
          <Button title='Submit' onPress={()=>saveObject(Reccomment,route.params.name)} ></Button>
      
          <FlatList 
        data={Reccomentlist}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=> {
          if(route.params.name===item.idd)
          {
          return(
            <View>
             
             <TouchableOpacity onPress={()=>deleteItem(item.id)}> 
              <Text style={{color:'#000000', fontSize:15}}>
                {item.Reccomment}
              </Text>
              </TouchableOpacity>
        
              </View>
          )}
        }
        } 
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
      justifyContent: 'flex-start'
    },
    side1:
    {
     flex:1,
     flexDirection: 'row',
     justifyContent: 'flex-start',
    
    },
    side2:
    {flex:2,
      flexDirection:'column',
      alignItems:'flex-start',
      justifyContent:'flex-start',
      padding:10
    },
    side3:
    {flex:1,
      alignItems:'flex-start',
      justifyContent:'center',
      padding:10
    },
    side4:
    {flex:3,
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
export default RecipeInfoPage