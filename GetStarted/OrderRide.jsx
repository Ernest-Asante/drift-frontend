import { StyleSheet, Text, View, TextInput, TouchableOpacity ,FlatList, Pressable} from 'react-native'
import React, {useState, useEffect} from 'react'

export default function OrderRide({navigation}) {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropOff, setDropoff] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [highestRatedDriver, setHighestRatedDriver] = useState(null);


    const fetchDrivers = async () => {
      try {
        const response = await fetch('http://localhost:3001/my', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }, 
          body: JSON.stringify({
            userId:82, // Replace with actual user ID

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
        const response = await fetch('http://localhost:3001/orderride', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }, 
          body: JSON.stringify({
            userId:82,
            driverId: highestRatedDriver.driver_id,
            fare: 50,
            from: "knust",
            to: "kejetia",
            tripId:0// Replace with actual user ID
            
          }), 
        });

        if (!response.ok) { 
          throw new Error('Network response was not ok'); 
        }

        const data = await response.json(); 
 
        // Assuming the response contains the highest rated driver directly
        //setHighestRatedDriver(data.highest); 
        console.log(data)
        console.log('request sent')
        // If you want to get all nearest drivers and find the highest rated in the client side
         //const { nearest_drivers } = data;
        

      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };

   



  return (
<>
         <View>
           <Text style={styles.textlabel1}>Enter pick-up location: </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your pick-up location" 
            keyboardType="text" 
            value={pickupLocation}
            onChangeText={(value) => setPickupLocation(value)}  // Ensures the numeric keypad with phone number symbols
          />
          </View>

          <View>
           <Text style={styles.textlabel2}>Enter drop-off location: </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your drop-off location" 
            keyboardType="text" 
            value={dropOff}
            onChangeText={(value) => setDropoff(value)}  // Ensures the numeric keypad with phone number symbols
          />
          </View>
          <View>
          <TouchableOpacity style={styles.button}  onPress={fetchDrivers}>
          <Text style={styles.buttonText}>Continue</Text> 
         </TouchableOpacity>
          </View>

          <Pressable style={styles.button} onPress={() => navigation.navigate('DriverRequest')}>
          <Text style={styles.buttonText}>Driver side</Text>
         </Pressable> 

         <Pressable style={styles.button} onPress={() => navigation.navigate('RideStatus')}>
          <Text style={styles.buttonText}>Ride Status</Text>
         </Pressable> 

          <View style={styles.container}>
      {highestRatedDriver ? (
        <>
        <View style={styles.driverCard}>
          <Text style={styles.title}>Driver with Highest Rating</Text>
          <Text>Driver ID: {highestRatedDriver.driver_id}</Text>
          <Text>Driver Name: {highestRatedDriver.driver_name}</Text>
          <Text>Final Rating: {highestRatedDriver.final_rating}</Text>
          <TouchableOpacity style={styles.button} onPress={continueOrder}>
          <Text style={styles.buttonText}>ORDER</Text>
         </TouchableOpacity>
        </View>
      

     <FlatList
        data={drivers}
        keyExtractor={(item) => item.driver_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.driverCard}>
            <Text>Driver ID: {item.driver_id}</Text>
            <Text>Driver Name: {item.driver_name}</Text>
            <Text>Final Rating: {item.final_rating}</Text>
          </View>
        )}
      /> 
      </>
      ):(<Text>Loading...</Text>)
}
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