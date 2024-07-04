import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable, SafeAreaView} from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';


const getstarted = require('../assets/getstarted.jpeg');
function GetStarted({ navigation }) {
  return (
    <SafeAreaProvider>
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
          <Text style={styles.buttonText}>Drift Rider</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.buttonText}>Drift Driver</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaProvider>
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
        width: 100,
        height: 100,
        borderRadius: 50, 
        marginBottom: 20
       
     },
    name : {
        fontSize: 30,
        margin: 20
    },
     description : {
        fontSize: 18,
        margin: 12
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
    text: {
      fontSize: 25,
      margin: 5
    }
  });