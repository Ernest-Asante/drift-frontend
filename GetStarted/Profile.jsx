import { StyleSheet, Text, View, Image, TouchableOpacity , TextInput, Button, ScrollView} from 'react-native'
import Payment from './Payment'
import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useEffect, useState } from 'react';
import  { Paystack , paystackProps}  from 'react-native-paystack-webview';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Modal from "react-native-modal";


const getstarted = require('../assets/getstarted.jpeg');
const Profile = ({navigation}) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [amount, setAmount] = useState('');
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

    const paystackWebViewRef = useRef(paystackProps.PayStackRef); 

  return (
    <>
  <Modal
   isVisible={isModalVisible}
   animationType="slide"
   transparent={true}>
        <View style={{ flex: 1 }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Ionicons name="close-circle-outline" size={24} color="brown" />
            </TouchableOpacity>

            <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="phone-pad"
        value={amount}
        onChangeText={(text) => setAmount(text)}
      />
          <TouchableOpacity style={styles.button2} onPress={()=> paystackWebViewRef.current.startTransaction()}>
          <Text style={styles.buttonText}>TOPUP</Text>
        </TouchableOpacity>
          
          </View>
        </View>
         
          
        </View>
 </Modal>

<View style={{marginHorizontal: 15}}>
      <Paystack
        paystackKey="pk_live_92832030081002b6ad95e86603ffed2a9b787e87"
        paystackSecretKey="sk_live_c84418c74efb8d9713d213540b51f1ad5add73d6"
        billingEmail="asanteernestopoku@gmail.com"
        billingMobile="233553266543"
        billingName="Ernest"
        currency="GHS"
        amount={amount}
        channels={["card","bank","mobile_money"]}
        onCancel={(e) => {
          // handle response here
          console.log(e)
        }}
        onSuccess={(res) => {
          // handle response here
           console.log(res) 
        }}
        ref={paystackWebViewRef}
       />

        
      </View>
    <ScrollView>
    <View style={styles.rowContainer}>
        <Image
          source={getstarted}
          style={styles.image}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.text1}>John Doe Kwekeu</Text>
          <Text style={styles.text1}>233553266543</Text>
          <Text style={styles.text1}>john.doe@example.com</Text>
        </View>
      </View>
      <View style={styles.walletContainer}>
           <Text style={styles.text2}>PAYMENTS - WALLET </Text>
     
          <Text style={styles.text3}>BALANCE: GHS 320</Text>

          <View  style={styles.buttonContainer}>
             <TouchableOpacity style={styles.button} onPress={toggleModal}>
             <Text style={styles.buttonText}>TOPUP</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Transactions')}>
             <Text style={styles.buttonText}>TRANSACTIONS</Text>
             </TouchableOpacity>

          </View>
        
      </View>

      <View style={styles.emergencyContainer}>
           <Text style={styles.text2}>EMERGENCY CONTACT </Text>
     
          <Text style={styles.text1}>Name: Nelson Mayor</Text>
          <Text style={styles.text1}>Contact: 233553266543</Text>
         <Text style={styles.text1}>Relationship: Brother</Text>

        
      </View>

      <View style={styles.mytripContainer}>
          
     
          <Text style={styles.text2}>MY TRIPS:.............</Text>
        
        
      </View>

      <View style={styles.tripContainer}>
          
     
          <Text style={styles.text1}>Pickup: Nelson Mayor</Text>
          <Text style={styles.text1}>Dropoff: 233553266543</Text>
         <Text style={styles.text1}>TripId: 13276746426</Text>

        
      </View>

      <View style={styles.tripContainer}>
          
     
          <Text style={styles.text1}>Pickup: Nelson Mayor</Text>
          <Text style={styles.text1}>Dropoff: 233553266543</Text>
         <Text style={styles.text1}>TripId: 13276746426</Text>

        
      </View>

      <View style={styles.tripContainer}>
          
     
          <Text style={styles.text1}>Pickup: Nelson Mayor</Text>
          <Text style={styles.text1}>Dropoff: 233553266543</Text>
         <Text style={styles.text1}>TripId: 13276746426</Text>

        
      </View>

      <View style={styles.tripContainer}>
          
     
          <Text style={styles.text1}>Pickup: Nelson Mayor</Text>
          <Text style={styles.text1}>Dropoff: 233553266543</Text>
         <Text style={styles.text1}>TripId: 13276746426</Text>

        
      </View>

    
    </ScrollView>
   {/* <Payment/>*/}
    </>
  )
}

export default Profile

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 1,
        width: '100%',
        
      },
      infoContainer: {
        flex: 1,
        flexDirection: 'column',
        left: 10
      },
      
    image: {
        width: 100,
        height: 100,
        borderRadius: 75, 
        marginBottom: 2
       
     },
      text1: {
        fontSize: 18
    },

    text2: {
        fontSize: 23
    },
 
    text3: {
        fontSize: 29,
        marginTop:5
    },
    walletContainer: {
       // flexDirection: 'row',
      //  alignItems: 'center',
      top:18,
        padding: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 1,
        width: '100%',
        height:150
        
      },
      emergencyContainer: {
        // flexDirection: 'row',
       //  alignItems: 'center',
       top:28,
         padding: 5,
         borderWidth: 1,
         borderColor: '#ccc',
         borderRadius: 1,
         width: '100%',
         height:140
         
       },

       tripContainer: {
        // flexDirection: 'row',
       //  alignItems: 'center',
       top:38,
         padding: 5,
         borderWidth: 1,
         borderColor: '#ccc',
         borderRadius: 10,
         width: '97%',
         left:"1%",
         height:90,
         marginTop:10,
         bottom: 5
         
       },
       mytripContainer: {
        // flexDirection: 'row',
       //  alignItems: 'center',
       top:38,
         padding: 5,
         borderWidth: 1,
         borderColor: '#ccc',
         borderRadius: 10,
         width: '97%',
         left:"1%",
         height:50,
      
       },
      buttonContainer: {
         flexDirection: 'row',
     //    alignItems: 'center',
        margin: 2,
        top:6
       },
       
   button: {
    width:"47%",
    padding: 5,
    backgroundColor: '#1e90ff',
    borderRadius: 6,
    height: 45,
   // bottom: 1,
    margin: 5
},
input: {
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 16,
    width:"90%"
  },
button2: {
    width:"90%",
    padding: 5,
    backgroundColor: '#1e90ff',
    borderRadius: 6,
    height: 45,
   // bottom: 1,
    margin: 5,
    top:10
},
buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: "center"
},
      divider: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginVertical: 10,
      },

      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        height: 180,
        width: "90%",
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
})