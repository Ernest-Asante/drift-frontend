import { View, Text, StyleSheet, Image, Pressable} from 'react-native'
import React from 'react'

const getstarted = require('../assets/getstarted.jpeg');
const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
     
      <View style={styles.main}>
         <Text style={styles.main1}>KELVIN, how may we help you today?</Text>
         <View style={styles.main2}>
       
           
           <Pressable style={styles.main3} onPress={() => navigation.navigate('OrderRide')}>
           <Image 
              source={getstarted}
              style={styles.image} />
            <View>
                <Text  style={styles.rideText}>DRIFT RIDE</Text>
                <Text >Order a ride</Text>
            </View>
            </Pressable>
          
        
           <Pressable style={styles.main4} onPress={() => navigation.navigate('SendParcel')}>
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

    main: {
        height: '20vh',                  // Height is 50 pixels
        width: '100%',               // Width is 100% of the parent
       backgroundColor: '#1e90ff',     // Background color is blue
       // justifyContent: 'center',    // Vertically center the text inside the container
        alignItems: 'left',
        marginTop: '80vh'
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
        backgroundColor: 'yellow',
        margin: 5,
        borderRadius: 5,
        flexDirection: 'row', // Arrange buttons in a row
        justifyContent: 'space-around',
       // justify: 'center'

      
        
    },
    main4: {
        height: '8vh',                  // Height is 50 pixels
        width: '45%',               // Width is 100% of the parent
        backgroundColor: 'yellow',
        margin: 5,
        borderRadius: 5,
        flexDirection: 'row', // Arrange buttons in a row
        justifyContent: 'space-around',
        
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
     }
  });