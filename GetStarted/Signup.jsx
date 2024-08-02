import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'react-native';

const Signup = ({ navigation }) => {

  const [identity, setIdentity] = useState('');
  const logo = require('../assets/drift.png');

  const handleOTPSubmit = async () => {
    // Validate emailInput if needed 
    // const combinedOtp = otp.join('');
    // console.log('Combined OTP:', combinedOtp);

    // Send POST request to your backend
    try {
      const response = await fetch('http://172.20.10.7:3001/mmotpsend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identity: identity }),
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
          <View style={styles.logoContainer}>
            <Image
              source={logo}
              style={styles.logo}
            />
          </View>
          <Text style={styles.textLabel}>What's your phone number or email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number or email"
            placeholderTextColor='gray'
            keyboardType="email"
            value={identity}
            onChangeText={text => setIdentity(text)} // Ensures the numeric keypad with phone number symbols
          />
          <Pressable style={styles.button} onPress={handleOTPSubmit}>
            <Text style={styles.buttonText}>SUBMIT</Text>
          </Pressable>
          <View style={styles.privacy}>
            <Text style={styles.privacyText}>By proceeding, you consent to get emails or SMS messages, including by automated means, from Drift and its affiliates to the number or email provided</Text>
          </View>
        </View>
      </SafeAreaProvider>
    </>
  )
}

export default Signup

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white", //#1C05B3
    alignItems: "center",
    // justifyContent: 'center',
    // paddingHorizontal: 20,
  },
  logoContainer: {
    marginTop: 50,
    marginBottom: 30,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 400,
    resizeMode: 'cover',
    marginTop: -90,
  },
  textLabel: {
    fontSize: 25,
    marginBottom: 30,
    color: '#1C05B3',
    textAlign: 'center',
    marginTop: -130,
  },
  input: {
    height: 50,
    width: '96%',
    marginVertical: 10,
    borderWidth: 1,
    paddingLeft: 10,
     borderRadius: 8,
    color: "black",
    borderColor: "black",
    fontSize: 16,
    backgroundColor: 'white',
  },
  privacy: {
    marginTop: 15,
    paddingHorizontal: 5,
  },
  privacyText: {
    fontSize: 16,
    fontWeight: "600",
    color: 'gray',
    marginTop: 10,
    textAlign: 'center'
  },
  button: {
    width: '50%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: "center",
    marginTop: 18,
    borderWidth: 1,
    backgroundColor: 'black',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    
  },
});
