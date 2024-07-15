
import React, { useRef, useEffect, useState } from 'react';
import  { Paystack , paystackProps}  from 'react-native-paystack-webview';
import { View, TouchableOpacity,Text, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function Payment({route,navigation}){
  let identity  = route.params;
  const [datas, setDatas] = useState(null);
  const [key, setKey] = useState('');
  const [getfirstName, setGetfirstName] = useState('');
  const [loading, setLoading] = useState(true); 

  useEffect(() => { 
    const getAsync = async () => {
      try {
        const data = await AsyncStorage.getItem('id');
        setKey(data || '');
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };
    getAsync();
  }, []);
 

  /* if (key === '') {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1e90ff" />
        <Text>Loading...</Text>
      </View>
    );   
  } */
   
  console.log(key)

  const signOut = async () => {
    try {
      // Remove the 'token' key from AsyncStorage
      await AsyncStorage.removeItem('key');
      await AsyncStorage.removeItem('id');
      await AsyncStorage.removeItem('type');

      console.log('Success', 'You have been signed out.');
      navigation.navigate('GetStarted')
    } catch (error) { 
      console.error('Error signing out:', error); 
    
    }
  };

  const getData = async () => {
  

    // Send POST request to your backend
    try {
      const response = await fetch('http://10.20.32.58:3001/getprofile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key:key}),
      });
 
      if (!response.ok) { 
        throw new Error('Failed to get profile'); 
      }
 
      const data = await response.json();     
      console.log('data successful:', data);
      setDatas(data.firstName); 
      console.log(datas)

      // Navigate to next screen (ConfirmOTP or wherever needed)
      if (data.message === 'Data available successfully') {
        console.log('data available:', data.firstName);
        console.log(data)
        setLoading(false);
        // Navigate to next screen (ConfirmOTP or wherever needed)
        //navigation.navigate('ConfirmOTP', { identity });
      } else { 
        console.error('Failed to get data:', data.message);  
        // Show an alert or other notification to the user  
       
      }

    } catch (error) {
      console.error('Error adding email:', error.message);
      // Handle error (e.g., show error message)
     
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };
  

    getData() 
  

  
   
  

  const paystackWebViewRef = useRef(paystackProps.PayStackRef); 

  
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
    <View style={{marginHorizontal: 15}}>
      <Paystack
        paystackKey="pk_test_a6b02861ff230834be674fb8d1e1aa556e1b9ef0"
        paystackSecretKey="sk_test_872c980f091abeaa51d904b062b19ceabf76064c"
        billingEmail="asanteernestopoku@gmail.com"
        billingMobile="233553266543"
        billingName="Ernest"
        currency="GHS"
        amount={25000}
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

        <TouchableOpacity 
        onPress={()=> paystackWebViewRef.current.startTransaction()}
        style={styles.paystack}
        >
          <Text style={styles.pay}>Pay Now</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={signOut}>
          <Text style={styles.buttonText}>Signout</Text>
        </TouchableOpacity> 

        
        <TouchableOpacity style={styles.button} onPress={getData}>
          <Text style={styles.buttonText}>Get data</Text>
        </TouchableOpacity>  

        {datas !== null?(
          <View>
            <Text>{datas}</Text>
          </View>
        ):(
          <View>
          <Text>Data Unavailable</Text>
        </View>
        )}
        

      </View>
  );
}

export default Payment

const styles = StyleSheet.create({
    paystack: {
        minwidth: "60%",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    pay: {
        color: "blue" 
    },
    button:{
      height:50, 
      width:200,
      color:"blue"
    },
    buttonText: {
      fontSize: 12
    },
    loadingContainer: { 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
    }, 
})