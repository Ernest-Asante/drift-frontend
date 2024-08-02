import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';


const getstarted = require('../assets/getstarted.jpeg');
function GetStarted({ navigation }) {
  return (
   <>
    <StatusBar style="auto" />
    <View style={styles.container}>
     <Text  style={styles.name}>Drift</Text>
      <Image 
      source={getstarted}
      style={styles.image} />
      <Text style={styles.description}>A trip that goes anywhere,</Text>
      <Text style={styles.description}>Let's get you to your next destination safely</Text>
      
      <Text style={styles.text}>Continue as: </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.buttonText}>RIDER</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignupD')}>
          <Text style={styles.buttonText}>DRIVER</Text>
      </TouchableOpacity>
    </View>
   </>
  )
}

export default GetStarted

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: "center",
    
     
   
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75, 
        marginBottom: 20
       
     },
    name : {
        fontSize: 50,
        margin: 20
    },
     description : {
        fontSize: 20,
        margin: 10
    },
     
   button: {
        width: 290,
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
    text: {
      fontSize: 35,
      margin: 5,
      marginTop:20
    }
  });
