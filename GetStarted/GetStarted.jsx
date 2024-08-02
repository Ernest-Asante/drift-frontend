import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable, SafeAreaView} from 'react-native'
import React from 'react'

import { StatusBar } from 'expo-status-bar';


const getstarted = require('../assets/getstarted.jpeg');
const logo = require('../assets/drift.png');
function GetStarted({ navigation }) {
  return (
   <>
    <StatusBar style="auto" />
    <View style={styles.container}>
      <Image 
      source={logo}
      style={styles.image} />
      <Text style={styles.description}>A trip that goes anywhere</Text>
      <Text style={styles.description2}>Let's get you to your next destination safely</Text>
      
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
        height: 400,
        resizeMode: 'cover',
       
     },
    name : {
        fontSize: 50,
        margin: 20
    },
     description : {
        fontSize: 30,
        margin: 12,
        marginTop: -80,
    },
    description2 : {
      fontSize: 30,
      margin: 12,
     
  },
   
     
   button: {
        width: 290,
        padding: 5,
        backgroundColor: 'black',
        borderRadius: 6,
        height: 50,
        bottom: 1,
        margin: 5,
        justifyContent: "center",
    marginTop: 18,
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
      marginTop:30,
    }
  });
