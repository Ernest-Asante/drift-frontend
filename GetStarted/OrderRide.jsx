import { StyleSheet, Text, View, TextInput, TouchableOpacity ,FlatList, Pressable} from 'react-native'
import React, {useState, useEffect} from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, {Marker} from 'react-native-maps';

import MapViewDirections from 'react-native-maps-directions';


export default function OrderRide({navigation, route}) {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropOff, setDropoff] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [highestRatedDriver, setHighestRatedDriver] = useState(null);
 const { riderId } = route.params;

 const [origin, setOrigin] = useState(null);
 const [destination, setDestination] = useState(null);
 const [originName, setOriginName] = useState(null);
 const [destinationName, setDestinationName] = useState(null);
 const [zIndexValue1, setZIndexValue1] = useState(2);
 const [zIndexValue2, setZIndexValue2] = useState(2);
 const [zIndexValue3, setZIndexValue3] = useState(2);

 const origin1 = {latitude: 6.6695, longitude:-1.5607};
const destination1 = {latitude: 6.5263, longitude: -1.3043};
const GOOGLE_MAPS_APIKEY = 'AIzaSyCW7L8qQi78TOlySI6lc5ThzDKvqWmY0b8';

 console.log(riderId)

 const handleOriginPress = (data, details = null) => {
  setZIndexValue2(0)
   if (details) {
     const { lat, lng } = details.geometry.location;
     setOrigin({ latitude: lat, longitude: lng });
     setOriginName(details.name)
   }
 };  

 const handleDestinationPress = (data, details = null) => {
   if (details) {
     const { lat, lng } = details.geometry.location;
     setDestination({ latitude: lat, longitude: lng });
     setDestinationName(details.name)
   }
 };

    const fetchDrivers = async () => {
     
      try {
        const response = await fetch('http://10.20.32.44:3001/my', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }, 
          body: JSON.stringify({
            userId:riderId,
            latitude: origin.latitude.toFixed(4),
            longitude:origin.longitude.toFixed(4) , // Replace with actual user ID
 
          }), 
        });

        if (!response.ok) { 
          throw new Error('Network response was not ok'); 
        }

        const data = await response.json(); 
 
        // Assuming the response contains the highest rated driver directly
        setHighestRatedDriver(data.highest); 

        // If you want to get all nearest drivers and find the highest rated in the client side
         //const { nearest_drivers } = data;
         setDrivers(data.result);
         console.log(drivers)

        // Alternatively, you can fetch the entire nearest drivers payload
        // const fullResponse = await fetch('http://your-backend-url/full-nearest-drivers-endpoint', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     userId: 'your-user-id',
        //   }),
        // });
        // const fullData = await fullResponse.json();
        // setDrivers(fullData.nearest_drivers);

      } catch (error) {
        console.error('Error fetching drivers:', error); 
      }
    };
 

    const continueOrder = async () => {
      try {
        const response = await fetch('http://10.20.32.44:3001/orderride', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }, 
          body: JSON.stringify({
            userId: riderId,
            driverId: highestRatedDriver.driver_id,
            fare: 50,
            from:originName,
            to: destinationName,
            fromLat: origin.latitude.toFixed(4),
            fromLong:origin.longitude.toFixed(4) ,
            toLat: destination.latitude.toFixed(4),
            toLong: destination.longitude.toFixed(4),

            //tripId:0// Replace with actual user ID
            
          }), 
        });

        if (!response.ok) { 
          throw new Error('Network response was not ok'); 
        } else{
             navigation.navigate('RideStatus', {riderId: riderId})
        }

        const data = await response.json(); 
 
        console.log(data)
        // Assuming the response contains the highest rated driver directly
       // setHighestRatedDriver(data.highest); 
      //  console.log(data)
        //console.log('request sent')
        // If you want to get all nearest drivers and find the highest rated in the client side
         //const { nearest_drivers } = data;
        

      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };

   

// Effect to update zIndexValue based on data state
useEffect(() => {
  if (origin !== null) {
    setZIndexValue2(9); // Set zIndex to 5 when data is not null
  } else if(origin == null) {
    setZIndexValue1(9); // Set zIndex to 9 when data is null
  } else if(origin && destination){
    setZIndexValue3(10)
  }
}, [origin, destination]);

  return ( 
<>
{highestRatedDriver ? (

<>
<View style={styles.container}>
<MapView style={styles.map} 
      initialRegion={{
        latitude: 6.6695,
        longitude: -1.5607,
        latitudeDelta: 0.095,
        longitudeDelta: 0.0421,
      }}
      >
         <MapViewDirections
      origin={origin1}
      destination={destination1}
      apikey={GOOGLE_MAPS_APIKEY}
       strokeWidth={4}
    strokeColor="green"
    />
    <Marker
  coordinate={{
    latitude: 6.6695,
    longitude: -1.5607,
  }}/>


    <Marker
  coordinate={{
    latitude:  6.5263,
    longitude: -1.3043,
  }}/>
      </MapView>
     

  <View style={styles.driverCard}>
    <Text style={styles.title}>AVAILABLE RIDE</Text>
    <Text>Driver ID: {highestRatedDriver.driver_id}</Text>
    <Text>Driver Name: {highestRatedDriver.driver_name}</Text>
    <Text>Final Rating: {highestRatedDriver.final_rating}</Text>
    <Text>Time of Arrival: 5 Miniutes</Text>
    <TouchableOpacity style={styles.button1} onPress={continueOrder}>
    <Text style={styles.buttonText}>ORDER</Text>
   </TouchableOpacity>
  </View>
</View>

</>

):(

  <View style={styles.container}>
         <View>
           <Text style={styles.textlabel1}>Enter pick-up location: </Text>
       
          </View>
       
          <View
          style={{
           height: "100%",
           width: "100%",
            paddingTop: 22,
            paddingHorizontal: 26,
            position: "absolute",
          zIndex: zIndexValue1
         // zIndex:2
          }}
         >
          <GooglePlacesAutocomplete
            placeholder='Search'
            minLength={2}
            onPress={handleOriginPress}
            query={{
              key: 'AIzaSyCW7L8qQi78TOlySI6lc5ThzDKvqWmY0b8',
              language: 'en',
            }}
            fetchDetails={true}
            styles={{
              textInputContainer: {
                backgroundColor: '#FFFFFF',
                borderTopWidth: 0,
                borderBottomWidth: 0,
                borderColor: '#CCCCCC',
                paddingHorizontal: 10,
                top:10,
                marginBottom:30,
              //  zIndex:2
              },
              textInput: {
                marginLeft: 0,
                marginRight: 0,
                height: 38,
                color: '#5d5d5d',
                fontSize: 16,
              },
            }}
          
          />
        </View>
        <View
          style={{
             flex: 1,
            height: "90%",
           width: "100%",
          paddingTop: 32,
           paddingHorizontal: 26,
          position: "absolute",
           zIndex: zIndexValue2
       //  zIndex: 2
          }}
        >
        <Text style={styles.textlabel2}>Enter drop-off location: </Text>
          <GooglePlacesAutocomplete
            placeholder='Search'
            minLength={2}
            onPress={handleDestinationPress}
            query={{
              key: 'AIzaSyCW7L8qQi78TOlySI6lc5ThzDKvqWmY0b8',
              language: 'en',
            }}
            fetchDetails={true}
            styles={{
              textInputContainer: {
                backgroundColor: '#FFFFFF',
                borderTopWidth: 0,
                borderBottomWidth: 0,
                borderColor: '#CCCCCC',
                paddingHorizontal: 10,
                marginTop:70,
              //  zIndex:9
              },
              textInput: {
                marginLeft: 0,
                marginRight: 0,
                height: 38,
                color: '#5d5d5d',
                fontSize: 16,
              },
            }}
          />
        
        </View>
  
          <View>
          <TouchableOpacity style={styles.button}  onPress={fetchDrivers}>
          <Text style={styles.buttonText}>CONTINUE</Text> 
         </TouchableOpacity>
          </View>

      </View>)}
      </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  
    paddingHorizontal: 2,
  },
  textlabel1: {
    fontSize: 15,
    margin: "1px"
  },
  textlabel2: {
    fontSize: 15,
   top:60,
    marginLeft:5
  },
  input: {
  height: 30,
  marginLeft: "2%",  // Sets a fixed height for the input
  width: '96%',  // Makes the input take the full width of its container
  marginVertical: 10,  // Adds vertical margin for spacing
  borderWidth: 1,  // Adds a border to the input field  // Sets the border color
  paddingLeft: 10,  // Padding inside the input for text
  borderRadius: 5,  // Rounds the corners of the input field
   // Sets the background color to grey
  },
  button: {
    width: "70%",
    padding: 5,
    backgroundColor: '#1e90ff',
    borderRadius: 6,
    height: 50,
    top: 400,
    marginLeft:"15%",
    margin: 5,
    zIndex: 10
  },
  map: {
    width: '100%',
    height: '69%',
  },
button1: {
  width: "70%",
  padding: 5,
  backgroundColor: '#1e90ff',
  borderRadius: 6,
  height: 40,
  top: 5,
  marginLeft:"15%",
  margin: 5,
  zIndex: 10
},
buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: "center"
},

driverCard: {
  padding: 8,
  marginVertical: 4,
  backgroundColor: '#f9f9f9',
  borderRadius: 8,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  //top: "72%",
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },
},
title: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 8,
},
})