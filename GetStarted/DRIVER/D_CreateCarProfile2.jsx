import { View, Text,TextInput,TouchableOpacity,ActivityIndicator, StyleSheet, Pressable} from 'react-native'
import React, {useState,useEffect} from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import Checkbox from 'expo-checkbox';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const D_CarDetail2 = ({route,navigation}) => {
   
    const [carName, setCarName] = useState('');
    const [getfirstName, setGetfirstName] = useState('');
    const [carModel, setCarModel] = useState('');
    const [registrationId, setRegistrationId] = useState('');
    const [colour, setColour] = useState(''); 
    const [license, setLicense] = useState(''); 
    const [roadworthy, setRoadworthy] = useState(''); 
    const [loading, setLoading] = useState(true); 
    const {contacts} = route.params;
    

    useEffect(() => {
        const fetchFirstName = async () => {
          try {
            const response = await fetch('http://10.20.32.44:3001/d_getfirstname', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json', 
              },
              body: JSON.stringify({ identity: contacts }), 
            });
    
            if (!response.ok) { 
              throw new Error('Failed to fetch first name'); 
            }
    
            const data = await response.json();
            setGetfirstName(data.firstName);
          } catch (error) {
            console.error('Error fetching first name:', error.message);
          }  finally {
            setLoading(false); // Set loading to false once data is fetched
          }
        };
    
        fetchFirstName();
      }, [contacts]);

 
    const handlePanicSubmit = async () => {
      // Validate emailInput if needed
     // const combinedOtp = otp.join('');
     // console.log('Combined OTP:', combinedOtp);
  
      // Send POST request to your backend
      try {
        const response = await fetch('http://10.20.32.44:3001/d_addcardetails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ identity: contacts, carName: carName, carModel: carModel, registrationId: registrationId, colour: colour, license: license, roadworthy: roadworthy}),
        });
   
        if (!response.ok) {
          throw new Error('Failed to add data'); 
        }
   
        const data = await response.json();
        console.log('Data available:', data);
  
        // Navigate to next screen (ConfirmOTP or wherever needed)
        if (data.message === 'Data inserted successfully') {
          console.log('Panic added successfully:', data.message);
          // Navigate to next screen (ConfirmOTP or wherever needed)
          AsyncStorage.setItem('key', "verified");
          AsyncStorage.setItem('id', contacts)
          AsyncStorage.setItem('type', "driver")
          navigation.navigate('DriverRequestD', { identity:contacts});
        } else { 
          console.error('Failed to add data:', data.message);
          // Show an alert or other notification to the user
         
        }
  
      } catch (error) {
        console.error('Error occured:', error.message);
        // Handle error (e.g., show error message)
        
      }
    };


  if (loading) {
    return (
      <SafeAreaProvider>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1e90ff" />
          <Text>Loading...</Text>
        </View>
      </SafeAreaProvider>
    );
  }
  
  return (
    <>
    <SafeAreaProvider>
    <StatusBar style="auto" />
    <View style={styles.container}>
        <View style={styles.titlebody}>
         <Text style={styles.title}>Drift</Text>
        </View>

        <View>
            <Text style={styles.textone}>{getfirstName}, you are almost there. Fill in your car details</Text>
        </View>
     
        <Text style={styles.textlabel}>Car name: </Text>
     <View>
      <TextInput
        style={styles.input}
        placeholder="Enter car name"
        keyboardType="text" 
        value={carName}
        onChangeText={(value) => setCarName(value)}  // Ensures the numeric keypad with phone number symbols
      />
      </View>

      
      <Text style={styles.textlabel}>Car Model: </Text>
     <View>
      <TextInput
        style={styles.input}
        placeholder="Enter the car model"
        keyboardType="text" 
        value={carModel}
        onChangeText={(value) => setCarModel(value)}  // Ensures the numeric keypad with phone number symbols
      />
      </View>

       
      <Text style={styles.textlabel}>Registration number: </Text>
     <View>
      <TextInput
        style={styles.input}
        placeholder="Enter car registration number"
        keyboardType="text" 
        value={registrationId}
        onChangeText={(value) => setRegistrationId(value)}  // Ensures the numeric keypad with phone number symbols
      />
      </View>

     
         
      <Text style={styles.textlabel}>Color of car: </Text>
      <View>
       <TextInput
         style={styles.input}
         placeholder="Enter the color(s) of the car"
         keyboardType="text" 
         value={colour}
         onChangeText={(value) => setColour(value)} // Ensures the numeric keypad with phone number symbols
       />
       </View>

       <Text style={styles.textlabel}>SPACE FOR DRIVER LICENSE DOCUMENT: </Text>
       <Text style={styles.textlabel}>SPACE FOR ROAD WORTHY DOCUMENT: </Text>
      

      
    
        
        <Text style={styles.privacytext}>Privacy: Don't worry this information is secured with us and we will never share it with a third party</Text>
      
        <View style={styles.row}>
          
         
        
         
      </View>
      <Pressable style={styles.button} onPress={handlePanicSubmit}>
          <Text style={styles.buttonText}>Continue</Text>
      </Pressable> 
    </View>
    </SafeAreaProvider>
   
    </>
    
  )
}

export default D_CarDetail2

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
      fontSize: "15px",
      margin: "1px"
    },
    input: {
    height: 30,
    marginLeft: "2%",  // Sets a fixed height for the input
    width: '96%',  // Makes the input take the full width of its container
    marginVertical: 10,  // Adds vertical margin for spacing
    borderWidth: 1,  // Adds a border to the input field  // Sets the border color
    paddingLeft: 10,  // Padding inside the input for text
    borderRadius: 5,  // Rounds the corners of the input field
     // Sets the background color to grey
    },
   
   privacytext: {
   fontSize: "10px",
   marginLeft: "5px",
   marginTop: 25
   },
   button: {
    width: '70%',
    padding: 15,
    backgroundColor: '#1e90ff',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: "center",
    position: 'absolute',
    bottom: 20,
    marginLeft: "10%"
   
   
    
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: "center", // Items will be laid out horizontally
     // Adjust as needed (e.g., space-between)
    marginTop:5
  },
   checkbox: {
    margin: 10,
   
   } ,
   loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textone: {
    margin: 2,
    fontSize:20
   
   } ,
  })