import { View, Text,TextInput,TouchableOpacity, StyleSheet, Pressable} from 'react-native'
import React,{useState} from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';


const Signup = ({navigation}) => {
 
  const [identity, setIdentity] = useState('');
   
  // Local state to manage input

  const handleOTPSubmit = async () => {
    // Validate emailInput if needed
   // const combinedOtp = otp.join('');
   // console.log('Combined OTP:', combinedOtp);

    // Send POST request to your backend
    try {
      const response = await fetch('http://localhost:3001/mmotpsend', {
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
        // Navigate to next screen (ConfirmOTP or wherever needed)
        navigation.navigate('ConfirmOTP', { identity });
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
         <Text style={styles.title}>Drift</Text>
        </View>

        <View>
      <Text style={styles.textlabel}
      >What's your phone number or email </Text>

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
      <Text style={styles.privacytext}>By proceeding, you consent to get calls, WhatsApp  or SMS messages, including by automated means, from Drift and its affiliates to the number or email provided</Text>
      
      </View>
      <Pressable style={styles.button} onPress={handleOTPSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
      </Pressable> 

      <Pressable style={styles.buttonGoogle} onPress={() => navigation.navigate('ConfirmOTP')}>
          <Text style={styles.buttonTextGoogle}>Continue With Google</Text>
      </Pressable> 
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
      fontSize: 25,
      marginLeft: "8px"  
    },
    textlabel: {
      fontSize: "25px",
      margin: "5px"
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
     marginLeft: "5px",
     marginTop: 5
   },
   privacytext: {
   fontSize: "10px"
   },
   button: {
    width: '60%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: "center",
    marginTop: 10,
    marginLeft: "20%",
    border:  '1px solid #1e90ff'
   
    
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
    position: 'absolute',
    bottom: 20,
    marginLeft: "10%"
   
   
    
  },
  buttonTextGoogle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
   
  })