import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, FlatList, Text} from 'react-native';

const EnterLocation = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [name, setName] = useState('');
    const [nearestDrivers, setNearestDrivers] = useState([]);


  const handleSubmit = async () => {
    if (latitude && longitude) { 
      try {
        const response = await fetch('http://localhost:3001/coordinates', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ latitude, longitude, name }),
        });

        if (response.ok) {
          Alert.alert('Success', 'Coordinates submitted successfully');
        } else {
          Alert.alert('Error', 'Failed to submit coordinates');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'An error occurred while submitting coordinates');
      }
    } else {
      Alert.alert('Error', 'Please enter both latitude and longitude');
    }
  };

  
 /*  const fetchNearestDistances = async () => {  
      try {
        const response =await fetch('http://localhost:3001/my');
        if (response.ok) {
            const data = await response.json(); // Parse JSON response
            console.log('Response:', data);
            setNearestDrivers(data.nearestLocation);
          //  return data.nearestLocation // Log or process the data as needed
          } else {
            throw new Error('Failed to fetch'); // Handle non-200 status
          }
        } catch (error) {
          console.error('Error fetching nearest distances:', error.message);
          Alert.alert('Error', 'Failed to fetch nearest distances');
        }  
    }; 
    */
    

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Latitude"
        value={latitude}
        onChangeText={setLatitude}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Longitude"
        value={longitude}
        onChangeText={setLongitude}
        keyboardType="numeric"
      />
       <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        keyboardType="text"
      />
      <Button title="Submit" onPress={handleSubmit} />
      <Button title="Get"  />

     
    </View>
  ); 
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default EnterLocation;

