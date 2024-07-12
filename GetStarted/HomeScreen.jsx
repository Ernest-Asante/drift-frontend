import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity,SafeAreaView} from 'react-native'
import React,{useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const getstarted = require('../assets/getstarted.jpeg');
const HomeScreen = ({route,navigation}) => {
  const [dataId, setDataId] = useState('');
  const { identity } = route.params;
  console.log(identity)


  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch('http://localhost:3001/getfirstname', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({ identity: identity}), 
        });

        if (!response.ok) {
          throw new Error('Failed to fetch userId');
        }

        const data = await response.json();
        setDataId(data.dataId);  
        console.log(dataId)
        console.log(data)
      } catch (error) { 
        console.error('Error fetching userId:', error.message);
      }  finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchUserId();
  }, [identity]);

  const signOut = async () => {
    try {
      // Remove the 'token' key from AsyncStorage
      await AsyncStorage.removeItem('key');
      await AsyncStorage.removeItem('id');
      await AsyncStorage.removeItem('type');

      console.log('Success', 'You have been signed out.');
      navigation.navigate('GetStarted')
    } catch (error) { 
      console.error('Error signing out:', error); 
    
    }
  };


  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
     
     
      <TouchableOpacity style={styles.button} onPress={signOut}>
          <Text style={styles.buttonText}>Signout</Text>
        </TouchableOpacity> 
        <SafeAreaView style={{height: '100%'}}>
        <GooglePlacesAutocomplete
      placeholder='Search'
      minLength={2}
      onFail={(err) => console.error(err)}
      fetchDetails={true}
      currentLocation={true}
      listViewDisplayed="auto"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyCW7L8qQi78TOlySI6lc5ThzDKvqWmY0b8',
        language: 'en',
      }}
     
    />
    </SafeAreaView>

      <View style={styles.main}>
         <Text style={styles.main1}>KELVIN, how may we help you today?</Text>
         <View style={styles.main2}>
       
           
           <Pressable style={styles.main3} onPress={() => navigation.navigate('OrderRide', { riderId:dataId})}>
           <Image 
              source={getstarted}
              style={styles.image} />
            <View>
                <Text  style={styles.rideText}>DRIFT RIDE</Text>
                <Text >Order a ride</Text>
            </View>
            </Pressable>
          
        
           <Pressable style={styles.main4} onPress={() => navigation.navigate('SendParcel', { riderId:dataId})}>
           <Image 
              source={getstarted}
              style={styles.image} />
            <View>
                <Text  style={styles.rideText}>DRIFT SEND</Text>
                <Text >Send a parcel</Text>
            </View>
          </Pressable>
         </View>
        </View>
    </View>
  )
}

export default HomeScreen

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
    button:{
      height:50, 
      width:200,
      color:"blue"
    },
    buttonText: {
      fontSize: 12
    },

    main: {
        height: '20vh',                  // Height is 50 pixels
        width: '100%',               // Width is 100% of the parent
       backgroundColor: '#1e90ff',     // Background color is blue
       // justifyContent: 'center',    // Vertically center the text inside the container
        alignItems: 'left',
        marginTop: '70vh'
    },
    main1: {
        color: 'black',              // Text color is white
        fontSize: 18,
        marginLeft: "8px",
        marginBottom: 15
    },
    main2: {
        flexDirection: 'row', // Arrange buttons in a row
        justifyContent: 'space-between',
        marginBottom:2
    },
    main3: {
        height: '8vh',                  // Height is 50 pixels
        width: '45%',               // Width is 100% of the parent
        backgroundColor: 'yellow',
        margin: 5,
        borderRadius: 5,
        flexDirection: 'row', // Arrange buttons in a row
        justifyContent: 'space-around',
       // justify: 'center'

      
        
    },
    main4: {
        height: '8vh',                  // Height is 50 pixels
        width: '45%',               // Width is 100% of the parent
        backgroundColor: 'yellow',
        margin: 5,
        borderRadius: 5,
        flexDirection: 'row', // Arrange buttons in a row
        justifyContent: 'space-around',
        
    },
    image: {
        width: 35,
        height: 35,
        borderRadius: 20, 
        margin:2,
        marginTop: 8
       
     },
     rideText: {
        marginTop: 4
     }
  });