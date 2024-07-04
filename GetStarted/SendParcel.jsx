import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'

export default function SendParcel() {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropOff, setDropoff] = useState('');
  return (
<>
         <View>
           <Text style={styles.textlabel1}>Enter pick-up location: </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your pick-up location" 
            keyboardType="text" 
            value={pickupLocation}
            onChangeText={(value) => setPickupLocation(value)}  // Ensures the numeric keypad with phone number symbols
          />
          </View>

          <View>
           <Text style={styles.textlabel2}>Enter drop-off location: </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your drop-off location"
            keyboardType="text" 
            value={dropOff}
            onChangeText={(value) => setDropoff(value)}  // Ensures the numeric keypad with phone number symbols
          />
          </View>

         <View>
           <Text style={styles.textlabel2}>Extimated size or weight: </Text>
          <TextInput
            style={styles.input}
            placeholder="Large/Medium/Small"
            keyboardType="text" 
            value={dropOff}
            onChangeText={(value) => setDropoff(value)}  // Ensures the numeric keypad with phone number symbols
          />
          </View>
          <View>
          <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
         </TouchableOpacity>
          </View>
</>
    
  )
}

const styles = StyleSheet.create({
  textlabel1: {
    fontSize: "15px",
    margin: "1px"
  },
  textlabel2: {
    fontSize: "15px",
    margin: "1px",
    marginTop:10
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
  button: {
    width: '96%',
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
})