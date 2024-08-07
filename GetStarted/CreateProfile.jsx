import { View, Text,TextInput,TouchableOpacity, StyleSheet,ScrollView, Pressable,  Dimensions} from 'react-native'
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import Checkbox from 'expo-checkbox';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const CreateProfile = ({route,navigation}) => {
    const [isChecked, setIsChecked] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [lastName, setLastName] = useState('');
    const [contact, setContact] = useState('');
    const [dataVerify, setDataVerify] = useState('');
    const [dataId, setDataId] = useState('');
    const [block, setBlock] = useState(null);
    const { identity} = route.params;
    console.log(identity)

    const handleCheckboxChange = (newValue) => {
        setIsChecked(newValue);
    };

    const handleProfileSubmit = async () => { 
      // Validate emailInput if needed  
     // const combinedOtp = otp.join(''); 
     // console.log('Combined OTP:', combinedOtp);     
  
      // Send POST request to your backend     
      setBlock(null)
      console.log('Submitting Profile:', { identity, contact, firstName, lastName });
      try {
        const response = await fetch('http://10.20.32.44:3001/mmotpsend2', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({   identity:identity,contact:contact, firstName: firstName, lastName:lastName}),
        });
    
        if (!response.ok) {
          throw new Error('Failed to add email'); 
        }
   
        const data = await response.json();
        console.log('Email added successfully:', data);
  
        // Navigate to next screen (ConfirmOTP or wherever needed)
         if(data.error === 'error fetching data'){
          console.error('Error fetching data:', data.error);
          // Navigate to next screen (ConfirmOTP or wherever needed)
         // navigation.navigate('ConfirmOTP2', { identity, contact, firstName, lastName});
        } else if(data.error === 'Failed to update OTP') { 
          console.error('Failed to update OTP:', data.error);
      
        } else if(data.message === 'OTP sent successfully'){
          console.log('OTP sent successfully')
          navigation.navigate('ConfirmOTP2', { identity, contact, firstName, lastName }) 
        }
        else if(data.error === 'Failed to send OTP email'){
          console.error('Error fetching data:', data.error);
        } else if( data.verify === 'user left hanging'){
            console.log('left hanging') 
            setDataVerify('left hanging')
            setDataId(data.data)
            console.log(data.data) 
          } else if(data.verify === 'user verified'){
            console.log('user verified')  
             setDataVerify('user verified')
             setFname(data.fname)   
             setLname(data.lname)  
             setDataId(data.data)
            console.log(data.data)  
          } else if(data.verify === 'user is fully inclusive'){
            console.log('user is fully inclusive')   
            setDataVerify('all verified') 
            setDataId(data.data)
            setFname(data.fname) 
            setLname(data.lname) 
          }
        
  
      } catch (error) {
        console.error('Error adding email:', error.message);  
        // Handle error (e.g., show error message)
        
      }
    };

    const handleReclaim0 = async () => {
      // Validate emailInput if needed  
     // const combinedOtp = otp.join('');
     // console.log('Combined OTP:', combinedOtp);   
  
      // Send POST request to your backend   
      console.log('Submitting Profile:', { identity, contact, firstName, lastName , dataId});
      try {
        const response = await fetch('http://10.20.32.44:3001/mmotpsend3', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({   identity,contact, firstName, lastName, dataId}),
        });
    
        if (!response.ok) {
          throw new Error('Failed to send otp'); 
        }
   
        const data = await response.json();
        console.log('otp sent successfully:', data);
  
        // Navigate to next screen (ConfirmOTP or wherever needed)
         if(data.error === 'Error fetching data'){
          console.error('Error fetching data:', data.error);
          // Navigate to next screen (ConfirmOTP or wherever needed)
         // navigation.navigate('ConfirmOTP2', { identity, contact, firstName, lastName});
        } else if(data.error === 'Failed to update OTP') { 
          console.error('Failed to update OTP:', data.error);
      
        } else if(data.message === 'OTP sent successfully'){
          console.log('OTP sent successfully')
          navigation.navigate('ConfirmOTP3', { identity, contact, firstName, lastName, dataId }) 
        
        } else{
          console.log('never')
        }
  
      } catch (error) {
        console.error('Error adding otp:', error.message);  
        // Handle error (e.g., show error message)
        
      }
    };


    const handleReclaim1 = async () => {  
      // Validate emailInput if needed  
     // const combinedOtp = otp.join(''); 
     // console.log('Combined OTP:', combinedOtp);     
  
      // Send POST request to your backend   
      console.log('Submitting Profile:', { identity, contact, firstName, lastName, dataId });
      try {
        const response = await fetch('http://10.20.32.44:3001/mmotpsend3', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({   identity,contact, firstName, lastName}),
        });
    
        if (!response.ok) {
          throw new Error('Failed to send otp'); 
        }
   
        const data = await response.json();
        console.log('otp sent successfully:', data);
  
        // Navigate to next screen (ConfirmOTP or wherever needed)
         if(data.error === 'Error fetching data'){
          console.error('Error fetching data:', data.error);
          // Navigate to next screen (ConfirmOTP or wherever needed)
         // navigation.navigate('ConfirmOTP2', { identity, contact, firstName, lastName});
        } else if(data.error === 'Failed to update OTP') { 
          console.error('Failed to update OTP:', data.error);
      
        } else if(data.message === 'OTP sent successfully'){
          console.log('OTP sent successfully')
          navigation.navigate('ConfirmOTP4', { identity, contact, firstName, lastName, dataId}) 
        
        } else{
          console.log('never')
        }
  
      } catch (error) {
        console.error('Error adding otp:', error.message);  
        // Handle error (e.g., show error message)
        
      }
    };

    const handleReclaim2 = async () => {
      // Validate emailInput if needed  
     // const combinedOtp = otp.join('');
     // console.log('Combined OTP:', combinedOtp);   
  
      // Send POST request to your backend   
      console.log('Submitting Profile:', { identity, contact, firstName, lastName });
      try {
        const response = await fetch('http://10.20.32.44:3001/mmotpsend3', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({   identity,contact, firstName, lastName}),
        });
    
        if (!response.ok) {
          throw new Error('Failed to send otp'); 
        }
   
        const data = await response.json();
        console.log('otp sent successfully:', data);
  
        // Navigate to next screen (ConfirmOTP or wherever needed)
         if(data.error === 'Error fetching data'){
          console.error('Error fetching data:', data.error);
          // Navigate to next screen (ConfirmOTP or wherever needed)
         // navigation.navigate('ConfirmOTP2', { identity, contact, firstName, lastName});
        } else if(data.error === 'Failed to update OTP') { 
          console.error('Failed to update OTP:', data.error);
      
        } else if(data.message === 'OTP sent successfully'){
          console.log('OTP sent successfully')
          navigation.navigate('ConfirmOTP5', { identity, contact, firstName, lastName, dataId}) 
        
        } else{
          console.log('never')
        }
  
      } catch (error) {
        console.error('Error adding otp:', error.message);  
        // Handle error (e.g., show error message)
        
      }
    };

    const handleBlockContact = () =>{
      setBlock('Sorry, since this identity is already verifies and in use, you cannot continue with it, use a different identity')
    }


   
  return (
    <>
    <SafeAreaProvider>
    <StatusBar style="auto" />  
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
    <View style={styles.container}>
        <View style={styles.titlebody}> 
         <Text style={styles.title}>Drift</Text>
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

      {identity.includes('@')?(
         <>
      <Text style={styles.textlabel}>Phone number: </Text>
      <View>
       <TextInput
         style={styles.input}
         placeholder="Enter your phone number"
         keyboardType="number" 
         value={contact}
         onChangeText={(value) => setContact(value)} // Ensures the numeric keypad with phone number symbols
       />
       </View>
       </>
      ):(
        <>
          
      <Text style={styles.textlabel}>Email: </Text>
     <View>
      <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        keyboardType="email"  
        value={contact}
        onChangeText={(value) => setContact(value)} // Ensures the numeric keypad with phone number symbols
      />
      </View>
        </> 

      )}

      
    
        
        <Text style={styles.privacytext}>By proceeding, you consent to get calls, WhatsApp  or SMS messages, including by automated means, from Drift and its affiliates to the number or email provided</Text>
      
        <View style={styles.row}>
          
         
         <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setIsChecked}
          color={isChecked ? '#4630EB' : undefined}
         />
         <Text >Accept Terms and Conditions</Text>
         
      </View>
      {dataVerify ==='left hanging' && block === null?(
         <View style={styles.container}> 
        
         <View style={styles.innerContainer}>
         <Text style={styles.infoText}>There is an account associated with this identity:</Text>
         <Text style={styles.accountText}>({contact})</Text>
         <Text style={styles.infoText}>Have you tried creating an account with that identity before:</Text>
           <View style={styles.buttonContainer}>
             <Pressable style={styles.button2} onPress={handleReclaim0}>
               <Text style={styles.buttonText2}>Yes, i have</Text>
             </Pressable>
             <Pressable style={styles.button2} onPress={handleReclaim0}>
               <Text style={styles.buttonText2}>No, i haven't</Text>
             </Pressable>
           </View>
         </View>
       </View>
      ):dataVerify ==='user verified' && block === null?(
        <View style={styles.container}>
       
        <View style={styles.innerContainer}>
        <Text style={styles.infoText}>There is an account associated with this identity:</Text>
        {fname !== null?(
          <>
            <Text style={styles.accountText}>{fname} {lname} </Text>
            <Text style={styles.accountText}> ({contact})</Text>
            </>

         ):(
          <Text style={styles.accountText}> ({contact})</Text>
         )}
          <Text style={styles.infoText}>Have you tried creating an account with that identity before:</Text>
        
          
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button2} onPress={handleReclaim1}>
              <Text style={styles.buttonText2}>Yes, i have</Text>
            </Pressable>
            <Pressable style={styles.button2} onPress={handleBlockContact}>
              <Text style={styles.buttonText2}>No, i haven't</Text>
            </Pressable>
          </View>
        </View>
      </View>
      ):dataVerify === 'all verified' && block === null?(
        <View style={styles.container}>
       
        <View style={styles.innerContainer}>
        <Text style={styles.infoText}>There is an account associated with this identity:</Text>
        {fname != null?(
          <>
            <Text style={styles.accountText}>{fname} {lname}</Text>
            <Text style={styles.accountText}> ({contact})</Text>
          </>
         ):(
          <Text style={styles.accountText}> ({contact})</Text> 
         )}
          <Text style={styles.infoText}>Have you tried creating an account with that identity before:</Text>
         
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button2} onPress={handleReclaim2}>
              <Text style={styles.buttonText2}>Yes, i have</Text>
            </Pressable>
            <Pressable style={styles.button2} onPress={handleBlockContact}>
              <Text style={styles.buttonText2}>No, i haven't</Text>
            </Pressable>
          </View>
        </View>
      </View>
      ):(
        <>
        {block?(
          <Text style={styles.infoText}>{block}</Text> 
       ):(<></>)}
        <Pressable style={styles.button} onPress={handleProfileSubmit}>
        <Text style={styles.buttonText}>CONTINUE</Text>
        </Pressable>
        </>
      )}
      
    </View> 
    </ScrollView>  
    </SafeAreaProvider>
   
    </>
    
  )
}

export default CreateProfile

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollViewContainer: {
      flexGrow: 1,
     // justifyContent: 'space-between',
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
      marginLeft: 10
    },
    textlabel: {
      fontSize: 20,
      margin: "1px",
      top:8,
      left:10,
      bottom:10
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
   
   privacytext: {
   fontSize: 12,
   marginLeft: "5px",
   left:5,
   marginTop: 10
   },
   button: {
    width: '80%',
    padding: 15,
    marginLeft:'12%',
    backgroundColor: '#1e90ff',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: "center",
    position: 'fixed',
    bottom:0,
    top:50,
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
   button2: {
    width: '45%', // Each button takes 45% of the width
    height: 50, // Set a fixed height for the buttons
    backgroundColor: '#1e90ff', // Background color for the buttons
    borderRadius: 6, // Rounded corners
    alignItems: 'center',
    margin:10, // Center the text horizontally
    justifyContent: 'center', // Center the text vertically
    marginBottom: 10, // Add margin below the buttons
  },
  buttonText2: {
    color: '#fff', // Text color
    fontSize: 16, // Font size
    fontWeight: 'bold', // Font weight
  },
  container: {
    flex: 1,
    padding: 0, // Add padding around the entire container
    minHeight: Dimensions.get('window').height * 0.25, // Set minHeight to 25% of screen height
  },
  infoText: {
    marginBottom: 10, // Add margin below the first text
    fontSize: 17, 
    margin:10// Adjust the font size as needed
  },
  innerContainer: {
    marginTop: 20, // Add margin at the top of the inner container
  },
  accountText: {
    marginBottom: 20, // Add margin below the account text
    fontSize: 16,
    left:10 // Adjust the font size as needed
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons in a row
    justifyContent: 'space-between', // Add space between the buttons
  },
 
});
  