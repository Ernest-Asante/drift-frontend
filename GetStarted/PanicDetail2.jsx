import { View, Text,TextInput,TouchableOpacity,ActivityIndicator, StyleSheet, Pressable} from 'react-native'
import React, {useState,useEffect} from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import Checkbox from 'expo-checkbox';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PanicDetail2 = ({route,navigation}) => {
   
    const [firstName, setFirstName] = useState('');
    const [getfirstName, setGetfirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [relation, setRelation] = useState('');
    const [contact, setContact] = useState(''); 
    const [loading, setLoading] = useState(true); 
    const { contacts} = route.params;
    

    useEffect(() => {
        const fetchFirstName = async () => {
          try {
            const response = await fetch('http://10.20.32.44:3001/getfirstname', {
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
        const response = await fetch('http://10.20.32.44:3001/addpanic', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({identity:contacts,  contact: contact, firstName: firstName,lastName: lastName, relation: relation}),
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
          AsyncStorage.setItem('type', "rider")
          navigation.navigate('HomeScreen', { identity:contacts});
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
            <Text style={styles.textone}>{getfirstName}, give use someone we can reach out to when you are in danger</Text>
        </View>
     
        <Text style={styles.textlabel}>First name: </Text>
     <View>
      <TextInput
        style={styles.input}
        placeholder="Enter your first name"
        keyboardType="text" 
        value={firstName}
        onChangeText={(value) => setFirstName(value)}  // Ensures the numeric keypad with phone number symbols
      />
      </View>

      
      <Text style={styles.textlabel}>Last name: </Text>
     <View>
      <TextInput
        style={styles.input}
        placeholder="Enter your last name"
        keyboardType="text" 
        value={lastName}
        onChangeText={(value) => setLastName(value)}  // Ensures the numeric keypad with phone number symbols
      />
      </View>

       
      <Text style={styles.textlabel}>How do you relate: </Text>
     <View>
      <TextInput
        style={styles.input}
        placeholder="Eg. brother/father/company/friend"
        keyboardType="text" 
        value={relation}
        onChangeText={(value) => setRelation(value)}  // Ensures the numeric keypad with phone number symbols
      />
      </View>

     
         
      <Text style={styles.textlabel}>Phone numberr: </Text>
      <View>
       <TextInput
         style={styles.input}
         placeholder="Enter your phone number"
         keyboardType="number" 
         value={contact}
         onChangeText={(value) => setContact(value)} // Ensures the numeric keypad with phone number symbols
       />
       </View>
      

      
    
        
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

export default PanicDetail2

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