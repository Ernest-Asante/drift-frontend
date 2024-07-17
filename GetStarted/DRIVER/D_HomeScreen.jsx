import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity,SafeAreaView} from 'react-native'
import React,{useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Modal from "react-native-modal";



const getstarted = require('../../assets/getstarted.jpeg');

const carr = require('../../assets/carr.jpg');


const D_HomeScreen = ({route,navigation}) => {
  const [dataId, setDataId] = useState('');
  const [data, setData] = useState(false);
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [plate, setPlate] = useState('');
 const [acceptData, setAcceptData] = useState('');
 const [rejectData, setRejectData] = useState('');
  const [data1, setData1] = useState('');
  const [accept, setAccept] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  const [rideAvailable, setRideAvailable] = useState(false);
  const [pollingTimer, setPollingTimer] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
 // const [loading, setLoading] = useState(true); // Initially set to true to show loading indicator
  const [timeInterval, setTimeInterval] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
//  const [carList, setCarList] = useState(null);
  const { identity } = route.params;
  console.log(identity)  

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
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.20.32.58:3001/riderequest', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({
              identity:identity,
             
              
            })
        })

        if (!response.ok) {
          throw new Error('Failed to fetch ride availability');
        }
 
        const data = await response.json();
      //  console.log('Ride availability:', data); 
      //  setRideAvailable(data.request);
          setData1(data[0])
        console.log(data[0].request)
        console.log(data[0].ride_request)
    
      //  console.log(rideAvailable)

        // If ride is not available, start polling every 5 seconds
        setRideAvailable(data[0].request);
        setModalVisible(data[0].request)
        setData(data[0].ride_request)
        setModel(data[0].car_model)
        setColor(data[0].car_color)
        setPlate(data[0].car_plate)
            console.log(rideAvailable)

        // If ride is available, stop polling and clear timers
        if (data.request === true) {
        //  setLoading(false); // Hide loading indicator
          clearInterval(pollingTimer); // Stop polling
          clearInterval(timeInterval); // Stop 60-second timer
        }
      } catch (error) {
        console.error('Error fetching ride availability:', error.message);
      }
    };

    // Start polling
    fetchData();
    const timer = setInterval(fetchData, 10000); // Poll every 10 seconds
    setPollingTimer(timer);

    // Start 60-second timer
    const interval = setInterval(() => {
      setTimeElapsed(prevTime => prevTime + 1);
    }, 1000); // Increment timeElapsed every second
    setTimeInterval(interval);

    // Clean up timers on unmount
    return () => {
      clearInterval(timer);
      clearInterval(interval);
    };
  }, []);

  // Check after 60 seconds if ride is still not available
  useEffect(() => {
    if (timeElapsed >= 60) {
      clearInterval(pollingTimer); // Stop polling
      clearInterval(timeInterval); // Stop 60-second timer
     // setLoading(false); // Hide loading indicator
      console.log('No ride available after 60 seconds');
      // Update UI or show alert to user
    }
  }, [timeElapsed]);
     

  const acceptRide = async () => {
    try {
      const response = await fetch('http://10.20.32.58:3001/acceptride', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({
          userId:data.riderId,
          driverId:data.driverId,
           fare: data.fare,
           // time:" 4 minutes",
            model: model, 
            color: color,
            plate: plate,
            tripId: data.tripId,
            
          // Replace with actual user ID
          
        })
      })

      if (!response.ok) { 
        throw new Error('Network response was not ok'); 
      }

      const data = await response.json(); 

      // Assuming the response contains the highest rated driver directly
      setAcceptData(data); 
      setModalVisible(false)
      

      // If you want to get all nearest drivers and find the highest rated in the client side
       //const { nearest_drivers } = data;
      

    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };


  const rejectRide = async () => {
    try {
      const response = await fetch('http://10.20.32.58:3001/rejectride', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({
          userId:data.riderId,
          driverId: data.driverId// Replace with actual user ID
          
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


  return (
   
   
   
      <>

      {accept == true? ( 
<>

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

          <View style={styles.driverCard}>
              <Text style={styles.title}>APPROACHING RIDER - ID: 18712816</Text>
              
             
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
             <TouchableOpacity style={styles.buttonM1} onPress={''}>
             <Text style={styles.buttonTextM1}> ACCEPT</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.buttonM2} onPress={''}>
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
      height: 280,
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