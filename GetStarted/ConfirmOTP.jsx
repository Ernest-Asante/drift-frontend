import { View, Text ,TextInput,TouchableOpacity, StyleSheet, Pressable} from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';




function ConfirmOTP({route, navigation}){ 
    const [otp, setOtp] = useState(["", "", "", ""]); 
    const [timeOut, setTimeOut] = useState(false);
    const { identity } = route.params;

    const [timeLeft, setTimeLeft] = useState(30); // 60 seconds countdown

  useEffect(() => { 
    // Countdown timer logic 
    if (timeLeft === 0) { 
      setTimeOut(true)
    };

    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [timeLeft,timeOut]); // Run effec

    const handleInput = (text, index) => {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp); 
  
      // Move to next input
      if (text && index < 3) { 
        // Focus the next input
        this[`input_${index + 1}`].focus();
      }
     
    };

    const handleOTPResend = async () => {
      // Validate emailInput if needed
     // const combinedOtp = otp.join('');
     // console.log('Combined OTP:', combinedOtp);
  
      // Send POST request to your backend
      try {
        const response = await fetch('http://localhost:3001/otpresend', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ identity: identity}),
        });
   
        if (!response.ok) {
          throw new Error('Failed to add otp'); 
        }
   
        const data = await response.json();
        console.log('Email added successfully:', data);
  
        // Navigate to next screen (ConfirmOTP or wherever needed)
        if (data.message === 'OTP sent successfully') {
          console.log('Email added successfully:', data.message);
          setTimeOut(false)
          setTimeLeft(30)
          // Navigate to next screen (ConfirmOTP or wherever needed)
         
        } else { 
          console.error('Failed to send OTP:', data.message);
          // Show an alert or other notification to the user
          Alert.alert('Failed to send OTP', 'Please try again.');
        }
  
      } catch (error) {
        console.error('Error adding email:', error.message);
        // Handle error (e.g., show error message)
        alert('Error adding email. Please try again.');
      }
    };
  

    const handleOTPSubmit = async () => {
      try {
        const combinedOtp = otp.join('');
        console.log('Combined OTP:', combinedOtp);
  
        const response = await fetch('http://localhost:3001/mmverifyotp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ identity: identity, otp: combinedOtp }),
        });  
  
     /*   if (!response.ok) {
          throw new Error('Failed to verify OTP');
        } */
  
        const data = await response.json();
       // console.log('OTP verification successful:', data);
       if(data.error === 'Error fetching data'){
        console.log('error fetching data')
       }

          // Navigate to next screen (ConfirmOTP or wherever needed)
      if (data.message === 'Invalid OTP') {
        console.log('invalid otp:', data.message);
        // Navigate to next screen (ConfirmOTP or wherever needed)
      //  AsyncStorage.setItem('token', "good")
       // navigation.navigate('CreateProfile', { identity });
      } else if(data.message === 'OTP has expired'){
        console.log('OTP has expired') 
      } else {  
        console.log('OTP verified:');
        // Show an alert or other notification to the user
        if(data.verify === 'User not verified'){
          console.log('user not verified') 
          navigation.navigate('CreateProfile', { identity });
        } else if(data.verify === 'User panic details not found'){
          console.log('user panic details not found')  
          navigation.navigate('PanicDetail', { identity });
        } else{
          console.log('user is fully inclusive') 
          AsyncStorage.setItem('key', "verified"); 
          AsyncStorage.setItem('id', identity);
          AsyncStorage.setItem('type', "rider")
          navigation.navigate('HomeScreen', { identity:identity });
        }
       
      }

     

  
        // Navigate to the next screen (e.g., CreateProfile) upon successful OTP verification
      
      } catch (error) {
        console.error('Error verifying OTP:', error.message);
      }
    };

  return (
    <View style={styles.container}>
    <View style={styles.titlebody}>
     <Text style={styles.title}>Drift</Text>
    </View>
    <View>
      <Text style={styles.textlabel}>Enter the 4-digit code sent to you at: {identity}</Text>
      <Text>Identity: {identity}</Text>
    </View>

    <View style={styles.inputstyle}> 
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={(text) => handleInput(text, index)}
          value={digit}
          ref={(input) => { this[`input_${index}`] = input; }}
          textAlign="center"
        />
      ))} 
    </View> 

    <Text style={styles.tip}>Tip: Be sure to check your inbox and spam folders</Text>
     
    {timeOut?(
         <Text style={styles.timer}>
          <View style={styles.row}>    
     
     <Text style={styles.resendotp}>Did Not Received OTP? </Text>
     <Pressable style={styles.resendotpbutton} >
       <Text style={styles.buttonText} onPress={handleOTPResend}>Resend</Text>
     </Pressable> 
     </View>
         </Text>    
      ):(
      
        <Pressable style={styles.otp} >
        <Text style={styles.otptext}>{`OTP expires in: ${timeLeft}s`}</Text>
       </Pressable> 
    )}  

    
      <Pressable style={styles.buttonContinue} onPress={handleOTPSubmit}>
          <Text style={styles.buttonTextContinue}>Continue</Text>
      </Pressable> 
     
    </View>
  )
}

export default ConfirmOTP

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
        margin: "3Spx"
    },
    input: {
        width: 40,
        height: 40,
        borderBottomWidth: 2,
        borderColor: 'gray',
        borderWidth: 1,  
        borderRadius: 5,
        fontSize: 18,
        backgroundColor: '#f2f2f2' ,
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'center',
      },
      inputstyle: {
        flexDirection: 'row', // This will lay out the children (input boxes) horizontally.
        justifyContent: 'space-around',
        padding: 20,
        
      },
    tip: {
        fontSize:"10px",
        margin: "3px"
    },
    row: {
      flexDirection: 'row', // Items will be laid out horizontally
      justifyContent: 'space-between', // Adjust as needed (e.g., space-between)
      marginTop:"20px"
    },
    resendotpbutton: {
      width: 100,
      height: 40,
      padding: 5,
      backgroundColor: '#1e90ff',
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: "center",
      margin: 5
     
     
      
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    resendotp: {
     
      fontSize: "20px",
      marginLeft: "1%"
      
    },
    buttonContinue: {
      width: '70%',
      padding: 15,
      backgroundColor: '#1e90ff',
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: "space-between",
      position: 'absolute',
      bottom: 20,
      marginLeft: "10%"
     
     
      
    },
    buttonTextContinue: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  timer: {
    fontSize: 12
  },
  
    otp:{
      left:50,
      width: 200,
      height: 40,
      padding: 5,
      backgroundColor: '#1e90ff',
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: "center",
      margin: 5
     
     
    },
    otptext:{
      fontSize: 20
    }
  
     
})