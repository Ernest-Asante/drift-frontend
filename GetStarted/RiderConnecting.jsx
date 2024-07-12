import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const RideStatus = ({route}) => {
  const [rideAvailable, setRideAvailable] = useState(false);
  const [pollingTimer, setPollingTimer] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [loading, setLoading] = useState(true); // Initially set to true to show loading indicator
  const [timeInterval, setTimeInterval] = useState(null);
  const { riderId } = route.params; // Initially set to true to show loading indicator

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/riderconnect', {
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
          
        console.log(data.ongoing_ride)
    
      //  console.log(rideAvailable)

        // If ride is not available, start polling every 5 seconds
        setRideAvailable(data.ongoing_ride);

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
  }, [timeElapsed]);
     
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" /> // Show loading indicator
      ) : (
        <Text>{rideAvailable ? 'Driver is available' : 'No driver available'}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RideStatus;
