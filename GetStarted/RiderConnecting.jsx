import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Modal from "react-native-modal";
import RadioGroup from 'react-native-radio-buttons-group';

import { createClient } from '@supabase/supabase-js';

const carr = require('../assets/carr.png');

import MapViewDirections from 'react-native-maps-directions';



const supabase = createClient('https://ykvtwisrbzpkzejkposo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrdnR3aXNyYnpwa3plamtwb3NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgxNTk1NzcsImV4cCI6MjAzMzczNTU3N30.b1fqoxTiOYOVRTlnWwcSJTB-AWxCpfJudXnGRx_v_Lk')

const RideStatus = ({route}) => {
  const [rideAvailable, setRideAvailable] = useState(false);
  const [pollingTimer, setPollingTimer] = useState(null);
  const [model, setModel] = useState('');
  const [driverId, setDriverId] = useState(null);
  const [color, setColor] = useState('');
  const [plate, setPlate] = useState('');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [loading, setLoading] = useState(true); // Initially set to true to show loading indicator
  const [timeInterval, setTimeInterval] = useState(null);
  const { riderId } = route.params; // Initially set to true to show loading indicator

  const [isModalVisible, setModalVisible] = useState(false);

  const [pickupLat, setPickupLat] = useState(6.1234);
  const [pickupLong, setPickupLong] = useState(-1.0123);

  const [dropOffLat, setDropOffLat] = useState(6.1023);
  const [dropOffLong, setDropOffLong] = useState(-1.2345);

  const [driverLat, setDriverLat] = useState(6.3214);
  const [driverLong, setDriverLong] = useState(-1.5646);


  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);


  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };


  
  const radioButtons = useMemo(() => ([
    {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'It was a mistake',
        value: 'option2'
    },
    {
        id: '2',
        label: 'Ride is keeping long',
        value: 'option2'
    },
    {
      id: '3',
      label: 'Ride too expensive',
      value: 'option3'
    },
    {
      id: '4',
      label: 'No problem',
      value: 'option4'
  }
]), []);

const [selectedId, setSelectedId] = useState();
 // const [amount, setAmount] = useState('');
const toggleModal = () => {
  setModalVisible(!isModalVisible);
};
  
const origin0 = {latitude:parseFloat(driverLat) , longitude: parseFloat(driverLong)};
const origin1 = {latitude:parseFloat(pickupLat), longitude:parseFloat(pickupLong)};
const destination1 = {latitude:parseFloat(dropOffLat), longitude: parseFloat(dropOffLong)};
const GOOGLE_MAPS_APIKEY = 'AIzaSyA7CbIXfXkekJjOLTnBCUkqR_MMkVC72QI';


const getDriver = async(driversId) =>{

  try {
    
    const { data, error } = await supabase
      .from('driver')
      .select('*')
      .eq("id", driversId)
      .order('created_at', { ascending: false })
      .limit(1);

      console.log("new driver data",data)

    } catch (error) {
      console.error('Unexpected error:', error);
      return res.status(500).json({ error: 'Unexpected error' });
    }

}


 useEffect(()=>{

  //  const clientValue = identity;  // Replace with the client-supplied value
  //  const column = 'body';   
    const channel = supabase
     .channel('public:rider')
     .on(  
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'rider',
        filter: `id=eq.${riderId}`
      },
      (payload) => {
        console.log(payload.new)
        const newRideAvailable = payload.new.ongoing_ride;
       /* setModel(payload.new.car_model)
        setColor(payload.new.car_colour)
        setPlate(payload.new.car_plate)*/
       // setDriverId(payload.new.ride_payload.driverId)
      //  console.log("driverId",driverId)r
        
        /*  setUserId(payload.new.ride_request.riderId)
        setFare(payload.new.ride_request.fare) */
      //  console.log(payload) 
        if(newRideAvailable !== false) {
          setRideAvailable(newRideAvailable);
          const newDriverId = payload.new.ride_payload.driverId;

          setLoading(false)
          console.log(loading)

          console.log("Attempting to set new driverId:", newDriverId);
          console.log("DriverId after setDriverId call:", driverId); 
         // setDriverId(newDriverId),
          console.log(driverId)
          console.log(newDriverId)
          console.log("DriverId after setDriverId call:", driverId); 
       
          clearInterval(timeInterval)
        /*  setModel(payload.new.car_model)
        setColor(payload.new.car_colour) 
        setPlate(payload.new.car_plate)
        setDriverId(payload.new.ride_request.driverId)
        setUserId(payload.new.ride_request.riderId)
        setFare(payload.new.ride_request.fare) */
          console.log(payload)
        
          
        }
      }
     )
     .subscribe();




     const interval = setInterval(()=>{
      setTimeElapsed(prevTime => prevTime + 1);
     }, 1000);
     setTimeInterval(interval)

     return () => {
      supabase.removeChannel(channel);
      clearInterval()

     }
  }, [rideAvailable]);

  useEffect(() => {
    if(timeElapsed >= 60){
      clearInterval(timeInterval);
      setLoading(false)
    }
  }, [timeElapsed])


/*  useEffect(()=>{

    //  const clientValue = identity;  // Replace with the client-supplied value
    //  const column = 'body';   

    if(driverId){
      const channel = supabase
       .channel('public:driver')
       .on(  
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'driver',
         filter: `id=eq.${driverId}`
        },
        (payload) => {
          console.log(payload.new)
         
        
          
         
          
        /*  setPickupLat(payload.new.ride_request.fromLat)
          setPickupLong(payload.new.ride_request.fromLong)
          setDropOffLat(payload.new.ride_request.toLat)
          setDropOffLong(payload.new.ride_request.toLong)
          setDriverLat(payload.new.latitude)
          setDriverLong(payload.new.longitude)
          setFrom(payload.new.ride_request.from)
          setTo(payload.new.ride_request.to)
          
            console.log(payload)
         
  
            console.log(driverLat)

            setLoading(false) 
            
          
        }
       )
       .subscribe();
  
       return () => {
        supabase.removeChannel(channel);
  
       }
      } 
    }, [driverId]) */



    const panicButton = async () => {
      
      try {
        const response = await fetch('http://172.20.10.3:3001/sendpanic', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ riderId: riderId}),
        });
   
        if (!response.ok) { 
          throw new Error('Failed to add panic'); 
        }  else { 
          console.error('Panic added');
          // Show an alert or other notification to the user
         
   
      
     
        }

        const data = await response.json();
        console.log('Panic added successfully:', data);
  
  
      } catch (error) {
        console.error('Error adding panic:', error.message);
        // Handle error (e.g., show error message)
        alert('Error adding panic. Please try again.');
      }

    }


    /*if(!driverId){ 
      return<Text>Waiting driver assignmnet</Text> 
    }   
*/

 

  /* if(loading === true){
      return  ( <>
     
      <View style={{alignItems: "center", justifyContent:"center", marginTop:"90%"}}>
        
        <Text style={{fontSize: 20}}>WAITING FOR DRIVER TO CONNECT</Text>
        <ActivityIndicator size="large" color="#0000ff" style={{marginTop: 50}} /> 
        
        </View>
      </>
    )
    } */

 
 
     
  return (
  
          <>
          <View style={styles.container}>
          <MapView style={styles.map} 
                initialRegion={{
                  latitude: parseFloat(driverLat),
                  longitude: parseFloat(driverLong),
                  latitudeDelta: 0.095,
                  longitudeDelta: 0.0421,
                }}
                >
             {/*      <MapViewDirections
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

             */}

<Marker
      
      coordinate={{latitude:parseFloat(driverLat), longitude:parseFloat(driverLat)}}
      title={"me"}
      description={"uber driver"}
   //   pinColor= {"#4287f5"} 
      />


    <Marker
          
          coordinate={{latitude: parseFloat(driverLat), longitude: parseFloat(driverLong)}}
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
  description={ "from"}/>


    <Marker
  coordinate={{
    latitude:  parseFloat(dropOffLat),
    longitude: parseFloat(dropOffLong),
  }}
  
  title={"Dropoff @"}
  description={ "to"}/>




          </MapView>
               
          
            <View style={styles.driverCard}>
              <Text style={styles.title}>DRIVER COMING</Text>
              
              <Text style={styles.text}>Time of Arrival: 5 Miniutes</Text>
              <Text style={styles.text}>TripId: 2047832741</Text>
              <View style={{flexDirection:"row"}}>
              <TouchableOpacity style={styles.button1} onPress={toggleModal}>
              <Text style={styles.buttonText1}>CANCEL</Text>
             </TouchableOpacity>

             <TouchableOpacity style={styles.button3} onPress={panicButton}>
              <Text style={styles.buttonText2}>SAFE BUTTON</Text>
             </TouchableOpacity>

              </View>
             
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
            <RadioGroup 
            radioButtons={radioButtons} 
            onPress={setSelectedId}
            selectedId={selectedId}
            size={22}
        /></View>
          <TouchableOpacity style={styles.button2}  onPress={toggleModal}>
          <Text style={styles.buttonText1}>SUBMIT</Text>
        </TouchableOpacity>
          
          </View>
        </View>
         
          
        </View>
 </Modal>
      </View> 
          
          </>
          
    //   ):(<View style={styles.containern}>
    //     <Text style={styles.textn}>NO AVAILABLE DRIVER. TRY AGAIN</Text>
    //     <TouchableOpacity style={styles.buttonn} onPress={goBack}>
    //       <Text style={styles.buttonTextn}>Go Back</Text>
    //     </TouchableOpacity>
    //   </View>)}
    // </>
  );
};

const styles = StyleSheet.create({

  containern: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textn: {
    fontSize: 20,
    marginTop: '20%',
    marginBottom: 20,
  },
  buttonn: {
    backgroundColor: 'black', // Using the color code you provided earlier
    padding: 10,
    borderRadius: 5,
    width: "80%"
  },
  buttonTextn: {
    color: '#fff',
    fontSize: 16,
    textAlign:"center"
  },
  container: {
   
  },
 
  button1: {
    width: "45%",
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 6,
    height: 40,
    top: 10,
    marginLeft:"1%",
    margin: 5,
    zIndex: 10,
    borderColor:  '#FF0000',
    borderWidth: 1,
    
  },

  button3: {
    width: "45%",
    padding: 5,
    backgroundColor: '#FF0000',
    borderRadius: 6,
    height: 40,
    top: 10,
    marginLeft:"1%",
    margin: 5,
    zIndex: 10,
   borderColor:  'red',
    borderWidth: 1,
  },
  buttonText2: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: "center"
  },
  text: {
    fontSize: 19,
    margin: "1px"
  },
  whyText1: {
    fontSize: 20,
    margin: "1px"
  },
  map: {
    width: '100%',
    height: '77%',
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
buttonText1: {
    color: 'black',
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
});

export default RideStatus;
