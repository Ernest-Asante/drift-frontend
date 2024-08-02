import { FontAwesome, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Modal from "react-native-modal";

import MapViewDirections from 'react-native-maps-directions';


const supabase = createClient('https://ykvtwisrbzpkzejkposo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrdnR3aXNyYnpwa3plamtwb3NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgxNTk1NzcsImV4cCI6MjAzMzczNTU3N30.b1fqoxTiOYOVRTlnWwcSJTB-AWxCpfJudXnGRx_v_Lk')

const getstarted = require('../../assets/getstarted.jpeg');

const carr = require('../../assets/carr.png');




const D_HomeScreen = ({route,navigation}) => {
  const [userId, setUserId] = useState('');
  const [driverId, setDriverId] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [plate, setPlate] = useState('');
  const [fare, setFare] = useState(0);
  const [tripId, setTripId] = useState(0);

 const [acceptData, setAcceptData] = useState('');
 const [rejectData, setRejectData] = useState('');
  const [data1, setData1] = useState('');
  const [accept, setAccept] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
 
  const [pickupLat, setPickupLat] = useState(null);
  const [pickupLong, setPickupLong] = useState(null);

  const [dropOffLat, setDropOffLat] = useState(null);
  const [dropOffLong, setDropOffLong] = useState(null);


  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  const [phone, setPhone] = useState(null);

  

  const [rideAvailable, setRideAvailable] = useState(false);
  const [pollingTimer, setPollingTimer] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
 // const [loading, setLoading] = useState(true); // Initially set to true to show loading indicator
  const [timeInterval, setTimeInterval] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const [isRideAvailable, setIsRideAvailable] = useState(false);
//  const [carList, setCarList] = useState(null);


  const { identity } = route.params;
  console.log(identity)  

  const column = identity.includes('@') ? 'email' : 'phone';
 // let inverseColumn = identity.includes('@') ? 'phone' : 'email';



console.log(column)

const origin0 = {latitude: parseFloat(location.latitude), longitude:parseFloat(location.longitude)};
const origin1 = {latitude:   parseFloat(pickupLat), longitude:parseFloat(pickupLong)};
const destination1 = {latitude: parseFloat(dropOffLat), longitude: parseFloat(dropOffLong)};
const GOOGLE_MAPS_APIKEY = 'AIzaSyA7CbIXfXkekJjOLTnBCUkqR_MMkVC72QI';

  const openProfile = () => {
    navigation.navigate('Profile');
  };

  const openDrift = () => {
    navigation.navigate('Drift');
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  useEffect(() => {
    const getLocationAndUpdate = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      let initialLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = initialLocation.coords;
      setLocation({ latitude, longitude });
      await updateDriverLocation({ latitude, longitude });

      setLoading(false);

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
         distanceInterval: 5,
        },
        (newLocation) => {
          const { coords } = newLocation;
          const updatedLocation = {
            latitude: coords.latitude, 
            longitude: coords.longitude,
          };
          setLocation(updatedLocation);
          updateDriverLocation(updatedLocation);
        }
      );
    };
    getLocationAndUpdate();
  }, []);

  const updateDriverLocation = async (coords) => {
    const { latitude, longitude } = coords;
   // const userId = 'driver-id'; // Replace with actual driver ID

    const { error } = await supabase
      .from('driver')
      .update({ location: `POINT(${longitude} ${latitude})` , latitude: latitude, longitude: longitude})
      .eq(column, identity)

    if (error) {
      console.error('Error updating location:', error); 
    } else{
      console.log('updated', column, identity)
      console.log(latitude)
    }
  };

 

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
  
  //const driverId = 22;

  useEffect(()=>{

  //  const clientValue = identity;  // Replace with the client-supplied value
  //  const column = 'body';   
    const channel = supabase
     .channel('public:driver')
     .on(  
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'driver',
        filter: `${column}=eq.${identity}`
      },
      (payload) => {
        console.log(payload)
        const newIsRideAvailable = payload.new.request;
        setModel(payload.new.car_model)
        setColor(payload.new.car_colour)
        setPlate(payload.new.car_plate)
        setDriverId(payload.new.ride_request.driverId)
        setUserId(payload.new.ride_request.riderId)
        setFare(payload.new.ride_request.fare)
      //  console.log(payload)
        if(newIsRideAvailable !== false) {
          setIsRideAvailable(newIsRideAvailable);
          setModel(payload.new.car_model)
        setColor(payload.new.car_colour)
        setPlate(payload.new.car_plate)
        setDriverId(payload.new.ride_request.driverId)
        setUserId(payload.new.ride_request.riderId)
        setFare(payload.new.ride_request.fare)
        setPickupLat(payload.new.ride_request.fromLat)
        setPickupLong(payload.new.ride_request.fromLong)
        setDropOffLat(payload.new.ride_request.toLat)
        setDropOffLong(payload.new.ride_request.toLong)
        setFrom(payload.new.ride_request.from)
        setTo(payload.new.ride_request.to)
        setPhone(payload.new.phone)
          console.log(payload)
          setModalVisible(true)
          console.log(isRideAvailable)
          console.log(model)
          console.log(color)

          console.log()
          
        }
      }
     )
     .subscribe();

     return () => {
      supabase.removeChannel(channel);

     }
  }, [isRideAvailable])
  console.log(model)
  console.log(color)
          
  
  const acceptRide = async () => {
    try {
      const response = await fetch('http://172.20.10.3:3001/acceptride', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({
          userId: userId,
          driverId: driverId,
           fare:fare,
           // time:" 4 minutes",
            model: model, 
            color: color,
            plate: plate, 
           
            
          // Replace with actual user ID
          
        })
      })

      if (!response.ok) { 
        throw new Error('Network response was not ok'); 
      }

      const data = await response.json(); 

      // Assuming the response contains the highest rated driver directly
      setAccept(true); 
      setModalVisible(false)
      

      // If you want to get all nearest drivers and find the highest rated in the client side
       //const { nearest_drivers } = data;
      

    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };


  const rejectRide = async () => {
    try {
      const response = await fetch('http://172.20.10.3:3001/rejectride', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({
          userId:userId,
          driverId:driverId// Replace with actual user ID
          
        }), 
      }); 

      if (!response.ok) { 
        throw new Error('Network response was not ok'); 
      }

      const data = await response.json(); 

      // Assuming the response contains the highest rated driver directly
      setRejectData(data); 
      setModalVisible(false)
      console.log(rejectData)

      // If you want to get all nearest drivers and find the highest rated in the client side
       //const { nearest_drivers } = data;
      

    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };
  /*useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch('http://10.20.32.58:3001/d_getfirstname', {
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
  }, [identity]); */

  


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


  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  }


  return (
   
   
   
      <>

      {accept? ( 
<>

<View style={styles.container}>
     
     <MapView style={styles.map} 
     initialRegion={{
       latitude: parseFloat(location.latitude), 
       longitude: parseFloat(location.longitude),
       latitudeDelta: 0.195,
       longitudeDelta: 0.1421,
     }}>

<Marker
      
      coordinate={{latitude: parseFloat(location.latitude), longitude: (location.longitude)}}
      title={"me"}
      description={"uber driver"}
   //   pinColor= {"#4287f5"} 
      />
    

      <Marker
          
          coordinate={{latitude:parseFloat(location.latitude), longitude:parseFloat(location.longitude)}}
          title={"me"}
          description={"uber driver"}
        
          >
        
        <Image
              source={carr}
              style={{ width: 60, height: 60 }} // Adjust size as needed
        />
            
        </Marker>


     

<MapViewDirections
      origin={origin0}
      destination={origin1}
      apikey={GOOGLE_MAPS_APIKEY}
       strokeWidth={4}
    strokeColor="blue"
    />


<MapViewDirections
      origin={origin1}
      destination={destination1}
      apikey={GOOGLE_MAPS_APIKEY}
       strokeWidth={4}
    strokeColor="green"
    />


 <Marker
  coordinate={{
    latitude:  parseFloat(pickupLat),
    longitude: parseFloat(pickupLong),
  }}
  
  title={"Pickup @"}
  description={from}/>


    <Marker
  coordinate={{
    latitude: parseFloat(dropOffLat),
    longitude: parseFloat(dropOffLong),
  }}
  
  title={"Dropoff @"}
  description={to}/>

   
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

          <View style={styles.driverCard}>
              <Text style={styles.title}>APPROACHING RIDER -----</Text>
              <Text style={styles.title}>Telephone: {phone}</Text>
              
             
              <TouchableOpacity style={styles.button4} onPress={''}>
                <View style={styles.icon}>
              <FontAwesome name="phone" size={24}  color="#00FF00"/>
              <Text style={styles.buttonText4}>CALL</Text>
              </View>
             </TouchableOpacity>
          
            </View>

</>
      
      ):(
        <>
        
    <View style={styles.container}>
     
      <MapView style={styles.map} 
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.095,
        longitudeDelta: 0.0421,
      }}>
         <Marker 
      
      coordinate={{latitude: location.latitude, longitude: location.longitude}}
      title={"me"}
      description={"you are here"}
   //   pinColor= {"#4287f5"} 
      />

<Marker
       
          coordinate={{latitude: location.latitude, longitude: location.longitude}}
          title={"me"}
          description={"you are here"}
        
          >
          <View  style={{ width: 62, height: 62 }} >
              <Image
              source={carr}
              style={{ width: 60, height: 60 }} // Adjust size as needed
            />
            </View>
          </Marker>

         
     {
      carList.map((car)=>{
        return(
          <Marker
          key={car.id}
          coordinate={{latitude:car.latitude, longitude:car.longitude}}
          title={car.title}
        
          >
          <View  style={{ width: 62, height: 62 }} >
              <Image
              source={carr}
              style={{ width: 60, height: 60 }} // Adjust size as needed
            />
            </View>
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
      
      
  
     <Modal
              isVisible={isModalVisible}
               animationType="slide"
                transparent={true}>
        <View style={{ flex: 1 }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Ionicons name="close-circle-outline" size={24} color="brown" />
            </TouchableOpacity>
            <View>
            <Text style={styles.whyText1}>Why do you want to cancel</Text>
            <Text style={styles.whyText1}>From: Obuasi, new town</Text>
            <Text style={styles.whyText1}>To: Walewale</Text>
            <Text style={styles.whyText1}>Amount: GHS 30</Text>
            <Text style={styles.whyText1}>Estimated Time: 5 Minutes</Text>
          
        </View>
         

        <View  style={styles.buttonContainerM}>
             <TouchableOpacity style={styles.buttonM1} onPress={acceptRide}>
             <Text style={styles.buttonTextM1}> ACCEPT</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.buttonM2} onPress={rejectRide}>
             <Text style={styles.buttonTextM2}>REJECT</Text>
             </TouchableOpacity>

          </View>
          
          </View>
        </View>
         
          
        </View>
   </Modal>

     </View>

        <View style={styles.driverCard}>
              <Text style={styles.title}>AVAILABLE FOR RIDE - ID: 18712816</Text>
              
             
              <TouchableOpacity style={styles.button3} onPress={''}>
              <Text style={styles.buttonText3}>PAUSE</Text>
             </TouchableOpacity>
            </View>

         
        
        </>
      )}
        </>
  )
}

export default D_HomeScreen

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
    button1: {
      width: "70%",
      padding: 5,
      backgroundColor: '#fff',
      borderRadius: 6,
      height: 40,
      top: 10,
      marginLeft:"15%",
      margin: 5,
      zIndex: 10,
      borderColor:  '#98FB98',
      borderWidth: 1,
    },
    buttonText1: {
        color:'# 98FB98',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center"
    },
    button3: {
      width: "70%",
      padding: 5,
      backgroundColor: '#fff',
      borderRadius: 6,
      height: 40,
      top: 10,
      marginLeft:"15%",
      margin: 5,
      zIndex: 10,
      borderColor:  '#1e90ff',
      borderWidth: 1,
    },
    buttonText3: {
        color:'#1e90ff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center"
    },
    button4: {
      width: "70%",
      padding: 5,
      backgroundColor: '#fff',
      borderRadius: 6,
      height: 40,
      top: 10,
      marginLeft:"15%",
      margin: 5,
      zIndex: 10,
      borderColor:  '#00FF00',
      borderWidth: 1,
    },
    buttonText4: {
        color:'#00FF00',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center",
        marginLeft:10
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
    icon: {
       flexDirection: 'row',
       alignItems: "center",
       justifyContent: 'center',
       
    },
    whyText1: {
      fontSize: 20,
      margin: "1px"
    },
   
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    closeButton: {
      position: 'absolute',
      top: 10,
      right: 10,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      height: 300,
      width: "90%",
     // alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    button2: {
      width:"90%",
      padding: 5,
      backgroundColor: '#1e90ff',
      borderRadius: 6,
      height: 45,
     // bottom: 1,
      margin: 5,
      top:10
  },
  buttonText5: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: "center"
  },
  buttonContainerM: {
    flexDirection: 'row',
//    alignItems: 'center',
   margin: 2,
   top:6
  },
  
buttonM1: {
width:"47%",
padding: 5,
backgroundColor: '#00FF00',
borderRadius: 6,
height: 45,
// bottom: 1,
margin: 5
},
buttonM2: {
  width:"47%",
  padding: 5,
  backgroundColor: '#FF0000',
  borderRadius: 6,
  height: 45,
  // bottom: 1,
  margin: 5
  },
buttonTextM1: {
  color: '#fff',
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: "center"
},
buttonTextM2: {
  color: '#fff',
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: "center"
},
  });