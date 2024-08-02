import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';



const Signup = ({navigation}) => {
 
  const [identity, setIdentity] = useState('');
   
  // Local state to manage input

  const handleOTPSubmit = async () => { 
    // Validate emailInput if needed 
   // const combinedOtp = otp.join('');
   // console.log('Combined OTP:', combinedOtp);

    // Send POST request to your backend
    try {
      const response = await fetch('http://172.20.10.3:3001/mmotpsend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identity: identity}),
      });
 
      if (!response.ok) { 
        throw new Error('Failed to add email'); 
      }
 
      const data = await response.json();
      console.log('Email added successfully:', data);

      // Navigate to next screen (ConfirmOTP or wherever needed)
      if (data.message === 'OTP sent successfully') {
        console.log('Email added successfully:', data.message);
        console.log(identity)
        console.log(navigation)
        navigation.navigate('ConfirmOtp', { identity });
      } else { 
        console.error('Failed to send OTP:', data.message);
        // Show an alert or other notification to the user
       
      }

    } catch (error) {
      console.error('Error adding email:', error.message);
      // Handle error (e.g., show error message)
      alert('Error adding email. Please try again.');
    }
  };

  return (
    <>
    <SafeAreaProvider>
    <StatusBar style="auto" />
    <View style={styles.container}>
        <View style={styles.titlebody}>
         <Text style={styles.title}>Drift  </Text>
        </View>

        <View>
      <Text style={styles.textlabel} >What's your phone number or email </Text>

    </View>
    <View>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number or email"
        keyboardType="email" 
        value={identity}
        onChangeText={text => setIdentity(text)} // Ensures the numeric keypad with phone number symbols
      />
      </View>
      <View style={styles.privacy}>
      <Text style={styles.privacytext}>By proceeding, you consent to get emails  or SMS messages, including by automated means, from Drift and its affiliates to the number or email provided</Text>
      
      </View>
      <TouchableOpacity style={styles.button} onPress={handleOTPSubmit}>
          <Text style={styles.buttonText}>SUBMIT</Text>
      </TouchableOpacity> 

    
    </View>
    </SafeAreaProvider>
   
    </>
    
  )
}

export default Signup

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    titlebody: {
      height: 50,                  // Height is 50 pixels
      width: '100%',               // Width is 100% of the parent
      backgroundColor: '#1e90ff',     // Background color is blue
      justifyContent: 'center',    // Vertically center the text inside the container
      alignItems: 'left' 
    },
    title: {
      color: 'white',              // Text color is white
      fontSize: 30,
      marginLeft: 5 
    },
    textlabel: {
      fontSize: 25,
      margin: 8
    },
    input: {
    height: 40,
    marginLeft: "2%",  // Sets a fixed height for the input
    width: '96%',  // Makes the input take the full width of its container
    marginVertical: 10,  // Adds vertical margin for spacing
    borderWidth: 1,  // Adds a border to the input field  // Sets the border color
    paddingLeft: 10,  // Padding inside the input for text
    borderRadius: 5,  // Rounds the corners of the input field
     // Sets the background color to grey
    },
    privacy: {
     marginLeft: 5,
     marginTop: 5
   },
   privacytext: {
   fontSize: 12
   },
   button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: "center",
    marginTop: 15,
    marginLeft: 30,
    borderColor:  '#1e90ff',
    borderWidth: 1,
   
    
  },
  buttonText: {
    color:  '#1e90ff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonGoogle: {
    width: '80%',
    padding: 15,
    backgroundColor: '#1e90ff',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: "center",
    position: 'fixed',
    top: '25%',
    marginLeft: "10%"
   
   
    
  },
  buttonTextGoogle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
   
  buttonApple: {
    width: '80%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: "center",
    position: 'fixed',
    top: '27%',
    marginLeft: "10%"
   
   
    
  },
  buttonTextApple: {
    color: '#1e90ff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  })