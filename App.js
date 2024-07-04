import React, {useEffect, useState} from'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TouchableOpacity, ActivityIndicator} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GetStarted from './GetStarted/GetStarted';
import Signup from './GetStarted/Signup';
import ConfirmOTP from './GetStarted/ConfirmOTP';
import CreateProfile from './GetStarted/CreateProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Payment from './GetStarted/Payment';
import ConfirmOTP2 from './GetStarted/ConfirmOTP2';
import PanicDetail from './GetStarted/PanicDetails';
import ConfirmOTP3 from './GetStarted/ConfirmOTP3'; 
import ConfirmOTP4 from './GetStarted/ConfirmOTP4';
import ConfirmOTP5 from './GetStarted/ConfirmOTP5';
import PanicDetail2 from './GetStarted/PanicDetail2';
import HomeScreen from './GetStarted/HomeScreen';
import OrderRide from './GetStarted/OrderRide';
import SendParcel from './GetStarted/SendParcel';
import EnterLocation from './GetStarted/EnterLocation';
import DriverRequest from './GetStarted/DriverRequest';
import RideStatus from './GetStarted/RiderConnecting';

const Stack = createNativeStackNavigator();

window.AsyncStorage = AsyncStorage;
export default function App() { 
  const [isLoggedIn, setIsLoggedIn] = useState('');

  
  async function getData(){
    const data = await AsyncStorage.getItem('key');
    console.log(data)
    console.log(isLoggedIn)
    setIsLoggedIn(data)
    console.log(isLoggedIn)
  }

  useEffect(()=>{
    getData()
  }, [isLoggedIn]); 

  
  if (isLoggedIn === '') {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1e90ff" />
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <> 

  <View style = {styles.container}> 
   <NavigationContainer>
    {isLoggedIn === "verified"?(
    <> 
     <Stack.Navigator >  
      
     <Stack.Screen name="OrderRide"  options={{ headerShown: false }}  component={OrderRide} />
     <Stack.Screen name="Signup" component={Signup}/>
     <Stack.Screen name="ConfirmOTP" component={ConfirmOTP}/>
     <Stack.Screen name="HomeScreen"   component={HomeScreen}/>
     <Stack.Screen name="Payment" component={Payment}/>
     <Stack.Screen name="GetStarted" component={GetStarted}/>
     <Stack.Screen name="CreateProfile" component={CreateProfile}/>
     <Stack.Screen name="ConfirmOTP2" component={ConfirmOTP2}/>  
     <Stack.Screen name="ConfirmOTP3" component={ConfirmOTP3}/>  
     <Stack.Screen name="ConfirmOTP4" component={ConfirmOTP4}/> 
     <Stack.Screen name="ConfirmOTP5" component={ConfirmOTP5}/> 
     <Stack.Screen name="PanicDetail" component={PanicDetail}/>   
     <Stack.Screen name="PanicDetail2" component={PanicDetail2}/>   
     <Stack.Screen name="DriverRequest" component={DriverRequest}/>   
     <Stack.Screen name="RideStatus" component={RideStatus}/>  
     <Stack.Screen name="SendParcel" component={SendParcel}/>    
     
     
   </Stack.Navigator>  
   </>):(<>
    <Stack.Navigator >
      
    <Stack.Screen name="HomeScreen"  options={{ headerShown: false }}  component={HomeScreen}/>
    <Stack.Screen name="Signup" component={Signup}/>
    <Stack.Screen name="ConfirmOTP" component={ConfirmOTP}/>
    <Stack.Screen name="CreateProfile" component={CreateProfile}/>
    <Stack.Screen name="Payment" component={Payment}/>
    <Stack.Screen name="ConfirmOTP2" component={ConfirmOTP2}/>
    <Stack.Screen name="ConfirmOTP3" component={ConfirmOTP3}/>  
     <Stack.Screen name="ConfirmOTP4" component={ConfirmOTP4}/> 
     <Stack.Screen name="ConfirmOTP5" component={ConfirmOTP5}/>
    <Stack.Screen name="PanicDetail" component={PanicDetail}/>
    <Stack.Screen name="PanicDetail2" component={PanicDetail2}/> 
    <Stack.Screen name="DriverRequest" component={DriverRequest}/> 
    <Stack.Screen name="OrderRide"   component={OrderRide} /> 
    <Stack.Screen name="RideStatus" component={RideStatus}/>  
    <Stack.Screen name="SendParcel" component={SendParcel}/>    
    
  </Stack.Navigator>
  </>)
    }
     
    </NavigationContainer>
  </View>
 
    
    
   </>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,   
    backgroundColor: '#fff',
  
  },
  loadingContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  }, 
});
