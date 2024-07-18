import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity,SafeAreaView} from 'react-native'
import React,{useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import { FontAwesome } from '@expo/vector-icons';
//import MyDrawer from '../Drawer';
//import { Root } from '../App';


const getstarted = require('../assets/getstarted.jpeg');

const carr = require('../assets/carr.jpg');

const HomeScreen = ({route,navigation}) => {
  const [dataId, setDataId] = useState('');
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
//  const [carList, setCarList] = useState(null);
  const { identity } = route.params;
  console.log(identity)

  const openProfile = () => {
    navigation.navigate('Profile');
  };

  const openDrift = () => {
    navigation.navigate('Drift');
  };
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        console.log(location)
        setLat(location.coords.latitude)
        setLong(location.coords.longitude)

       
      } catch (error) {
        setErrorMsg('Failed to fetch location');
        console.log(errorMsg)
      }
     

    })();
  }, []);

  const  carList = ([
    {
      id: 1,
      latitude: 6.6695 + 0.0079,
      longitude:  -1.560 + 0.0067,
      title: "ayeduase"
    },
    {
      id: 2,
      latitude: 6.6695+ 0.0063,
      longitude:  -1.560 + 0.0121,
      title: "commercial area"
    },
    {
      id: 3,
      latitude: 6.6695 - 0.014,
      longitude:  -1.560 + 0.0006,
      title: "main entrance"
    },
    {
      id: 4,
      latitude:6.6695 + 0.022,
      longitude: -1.560 + 0.0102,
      title: "indece hall"
    },
    {
      id: 5,
      latitude: 6.6695 + 0.0123,
      longitude:  -1.560 - 0.0142,
      title: "ksb"
    },
    {
      id: 6,
      latitude: 6.6695 + 0.0023,
      longitude: -1.5607 + 0.0042,
      title: "one"
    },
    {
      id: 7,
      latitude:6.6695 + 0.0045,
      longitude:  -1.560 - 0.0174,
      title: "two"
    },
  ]);
  
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch('http://10.20.32.44:3001/getfirstname', {
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
      //  setLoading(false); // Set loading to false once data is fetched
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
   
   
      
     <View style={styles.container}>
     
      <MapView style={styles.map} 
      initialRegion={{
        latitude: 6.6695,
        longitude: -1.5607,
        latitudeDelta: 0.095,
        longitudeDelta: 0.0421,
      }}>
         <Marker
      
      coordinate={{latitude: 6.6695, longitude: -1.5607}}
      title={"knust"}
      description={"knust location"}
   //   pinColor= {"#4287f5"} 
      />

         
     {
      carList.map((car)=>{
        return(
          <Marker
          key={car.id}
          coordinate={{latitude:car.latitude, longitude:car.longitude}}
          title={car.title}
        
          >
              <Image
              source={carr}
              style={{ width: 32, height: 32 }} // Adjust size as needed
            />
          </Marker>
        )

      })
     }

      </MapView> 
      
     <View style={styles.toggleContainer}>
        <TouchableOpacity
        // style={styles.drift}
          onPress={openDrift}
        >
          <Text  style={styles.drift}>DRIFT</Text>
        </TouchableOpacity>
     </View>

     <View style={styles.toggleContainer2}>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={openProfile}
        >
          <FontAwesome name="bars" size={24} color="black" />
        </TouchableOpacity>
     </View>
      
  

     </View>

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
       backgroundColor: 'white',     // Background color is blue
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
        backgroundColor: '#f0f0f0',
        margin: 5,
        borderRadius: 5,
        flexDirection: 'row', // Arrange buttons in a row
        justifyContent: 'space-around',
         borderWidth: 1,           // 1 pixel border width
  borderColor: '#808080'
       // justify: 'center'

      
        
    },
    main4: {
        height: '8vh',                  // Height is 50 pixels
        width: '45%',               // Width is 100% of the parent
        backgroundColor: '#f0f0f0',
        margin: 5,
        borderRadius: 5,
        flexDirection: 'row', // Arrange buttons in a row
        justifyContent: 'space-around',
         borderWidth: 1,           // 1 pixel border width
  borderColor: '#808080'
        
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
     },
     toggleContainer: {
      position: 'absolute',
      top: 30,
      left: 20,
      zIndex: 1,
      backgroundColor: 'white',
      borderRadius: 50,
      elevation: 5,
      padding: 5,
      width: 120,
      height:45
    },
    toggleContainer2: {
      position: 'absolute',
      top: 30,
      left: "80%",
      zIndex: 1,
      backgroundColor: 'white',
      borderRadius: 50,
      elevation: 5,
      padding: 10,
    },
    toggleButton: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rowContainer: {
    //  flexDirection: 'row',
     // justifyContent: 'space-between',
     // marginBottom: 20,
    },
    drift:{
     fontWeight:"bold",
      fontSize:25,
      textAlign: "center"
    },
     map: {
      width: '100%',
      height: '99%',

    },
  });