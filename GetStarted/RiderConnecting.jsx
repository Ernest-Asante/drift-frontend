import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import MapViewDirections from 'react-native-maps-directions';
import RadioGroup from 'react-native-radio-buttons-group';
import Modal from "react-native-modal";

import { createClient } from '@supabase/supabase-js';


const supabase = createClient('https://ykvtwisrbzpkzejkposo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrdnR3aXNyYnpwa3plamtwb3NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgxNTk1NzcsImV4cCI6MjAzMzczNTU3N30.b1fqoxTiOYOVRTlnWwcSJTB-AWxCpfJudXnGRx_v_Lk')

const RideStatus = ({route}) => {
  const [rideAvailable, setRideAvailable] = useState(false);
  const [pollingTimer, setPollingTimer] = useState(null);
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [plate, setPlate] = useState('');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [loading, setLoading] = useState(true); // Initially set to true to show loading indicator
  const [timeInterval, setTimeInterval] = useState(null);
  const { riderId } = route.params; // Initially set to true to show loading indicator

  const [isModalVisible, setModalVisible] = useState(false);

  
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
  
 const origin1 = {latitude: 6.6695, longitude:-1.5607};
 const destination1 = {latitude: 6.5263, longitude: -1.3043};
 const GOOGLE_MAPS_APIKEY = 'AIzaSyCW7L8qQi78TOlySI6lc5ThzDKvqWmY0b8';


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
        console.log(payload)
        const newRideAvailable = payload.new.ongoing_ride;
       /* setModel(payload.new.car_model)
        setColor(payload.new.car_colour)
        setPlate(payload.new.car_plate)
        setDriverId(payload.new.ride_request.driverId)
        setUserId(payload.new.ride_request.riderId)
        setFare(payload.new.ride_request.fare) */
      //  console.log(payload)
        if(newRideAvailable !== false) {
          setRideAvailable(newRideAvailable);
          setLoading(false)
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

  /*useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.20.32.44:3001/riderconnect', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({
              userId:riderId,
             
              
            })
        })

        if (!response.ok) {
          throw new Error('Failed to fetch ride availability');
        }
 
        const data = await response.json();
        console.log('Ride availability:', data); 
        setRideAvailable(data.ongoing_ride);
          setModel(data.ride_payload.model)
          setColor(data.ride_payload.color)
          setPlate(data.ride_payload.plate)
        console.log(data.ongoing_ride)
    
      //  console.log(rideAvailable)

        // If ride is not available, start polling every 5 seconds
        setRideAvailable(data.message);

            console.log(rideAvailable)

        // If ride is available, stop polling and clear timers
        if (data.ongoing_ride === true) {
          setLoading(false); // Hide loading indicator
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
      setLoading(false); // Hide loading indicator
      console.log('No ride available after 60 seconds');
      // Update UI or show alert to user
    }
  }, [timeElapsed]); */

  if(loading){
    return(
      <>
      <ActivityIndicator size="large" color="#0000ff" /> 
      <View><Text>Loading</Text></View>
      </>
    )
  }
     
  return (
  <>
      {rideAvailable !== false ? (
        
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
              <Text style={styles.title}>DRIVER COMING</Text>
              
              <Text style={styles.text}>Time of Arrival: 5 Miniutes</Text>
              <Text style={styles.text}>TripId: 2047832741</Text>
              <TouchableOpacity style={styles.button1} onPress={toggleModal}>
              <Text style={styles.buttonText}>CANCEL</Text>
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
          
      ):(<Text>NO AVAILABLE DRIVER. TRY AGAIN</Text>)}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
   
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
    borderColor:  '#FF0000',
    borderWidth: 1,
  },
  buttonText: {
      color: '#FF0000',
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
});

export default RideStatus;
