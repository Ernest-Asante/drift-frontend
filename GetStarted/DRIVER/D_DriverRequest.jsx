import { StyleSheet, Text, View, TextInput, TouchableOpacity ,Pressable} from 'react-native'
import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function D_DriverRequest() {
  const [data, setData] = useState('');
  const [acceptData, setAcceptData] = useState('');
  const [rejectData, setRejectData] = useState('');

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

    const fetchDrivers = async () => {
      try {
        const response = await fetch('http://172.20.10.7:3001/riderequest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }, 
         
        });

        if (!response.ok) { 
          throw new Error('Network response was not ok'); 
        } 
 
        const data = await response.json(); 
        console.log(data[0].ride_request)
        // Assuming the response contains the highest rated driver directly
        setData(data[0].ride_request); 
       // console.log(data) 
       

        // If you want to get all nearest drivers and find the highest rated in the client side
         //const { nearest_drivers } = data;
        

      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };


    const acceptRide = async () => {
        try {
          const response = await fetch('http://172.20.10.7:3001/acceptride', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({
              userId:data.riderId,
              driverId:data.driverId,
                driverId: data.driverId,
                time:" 4 minutes",
                model: `${data.colour, data.name} `,
                Plate: data.license,
                tripId:0,
                
              // Replace with actual user ID
              
            })
          })
  
          if (!response.ok) { 
            throw new Error('Network response was not ok'); 
          }
  
          const data = await response.json(); 
   
          // Assuming the response contains the highest rated driver directly
          setAcceptData(data); 
  
          // If you want to get all nearest drivers and find the highest rated in the client side
           //const { nearest_drivers } = data;
          
  
        } catch (error) {
          console.error('Error fetching drivers:', error);
        }
      };
 

      const rejectRide = async () => {
        try {
          const response = await fetch('http://172.20.10.7:3001/rejectride', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({
              userId:82,
              driverId: 14 // Replace with actual user ID
              
            }), 
          }); 
  
          if (!response.ok) { 
            throw new Error('Network response was not ok'); 
          }
  
          const data = await response.json(); 
   
          // Assuming the response contains the highest rated driver directly
          setRejectData(data); 

          console.log(rejectData)
  
          // If you want to get all nearest drivers and find the highest rated in the client side
           //const { nearest_drivers } = data;
          
  
        } catch (error) {
          console.error('Error fetching drivers:', error);
        }
      };

    useEffect(()=>{
      fetchDrivers()
    },[])

    if(!data){
        return <Text>Loading</Text>
    }

   



  return (
<>
<View>

       <TouchableOpacity style={styles.button} onPress={signOut}>
          <Text style={styles.buttonText}>Signout</Text>
        </TouchableOpacity> 
          <TouchableOpacity style={styles.button} onPress={fetchDrivers}>
          <Text style={styles.buttonText}>Continue</Text>
         </TouchableOpacity>
          </View>

          {data && (
        <>
        <View style={styles.driverCard}>
          <Text style={styles.title}>Available Ride</Text>
          <Text>Trip ID: {data.tripId}</Text>
          <Text>Rider ID: {data.userId}</Text>
          <Text>From: {data.from}</Text>
          <Text>Destination: {data.to}</Text>
          <Text>Fare: {data.fare}</Text>
        </View>
        </>)}
      


          <View>
          <TouchableOpacity style={styles.button} onPress={acceptRide}>
          <Text style={styles.buttonText}>ACCEPT</Text>
         </TouchableOpacity>
          </View>

          <View>
          <TouchableOpacity style={styles.button} onPress={rejectRide}>
          <Text style={styles.buttonText}>REJECT</Text>
         </TouchableOpacity> 
          </View>

     
</>
    
  )
}

const styles = StyleSheet.create({
  textlabel1: {
    fontSize: "15px",
    margin: "1px"
  },
  textlabel2: {
    fontSize: "15px",
    margin: "1px", 
    marginTop:10
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
    width: 200,
    padding: 5,
    backgroundColor: '#1e90ff',
    borderRadius: 6,
    height: 50,
    bottom: 1,
    margin: 5
},
buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: "center"
},
container: {
  flex: 1,
  padding: 16,
  backgroundColor: '#fff',
},
driverCard: {
  padding: 16,
  marginVertical: 8,
  backgroundColor: '#f9f9f9',
  borderRadius: 8,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },
},
title: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 8,
},
})