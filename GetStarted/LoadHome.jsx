import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React,{useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoadHome = ({navigation}) => {
    const [data, setData] = useState('');
    const [data2, setData2] = useState('');
    const [loading, setLoading] = useState(true);

    async function getData(){
       const data2 = await AsyncStorage.getItem('id');
        const data = await AsyncStorage.getItem('type');
        console.log(data)
       console.log(data2)
       // console.log(isLoggedIn)
        setData2(data2)
        setData(data)
        console.log(data)
        setLoading(false) 

        if(data2 && data == 'rider'){
            navigation.navigate('HomeScreen', { identity:data2 });
          } else if(data2 && data == 'driver'){
            navigation.navigate('HomeScreenD', { identity:data2 });
          }
      }

     
    
      useEffect(()=>{
        getData()
      }, [data]); 

     
    
      
      if (loading) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#1e90ff" />
            <Text>Loading...</Text>
          </View> 
        );
      }

      return (
        <View >   
          
          <Text>Loading...</Text> 
        </View> 
      );


}

export default LoadHome

const styles = StyleSheet.create({
    container: {
        flex: 1,   
        backgroundColor: '#fff',
      
      },
      loadingContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
      }, 
})