
import React, { useRef, useEffect, useState } from 'react';
import  { Paystack , paystackProps}  from 'react-native-paystack-webview';
import { View, TouchableOpacity,Text, StyleSheet, ActivityIndicator } from 'react-native';


function Payment(){
   

 
 

  
  
   
  

  const paystackWebViewRef = useRef(paystackProps.PayStackRef); 

  
  
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
        backgroundColor: "blue" 
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