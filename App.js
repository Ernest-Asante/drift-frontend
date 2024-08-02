import React, {useEffect, useState} from'react'
// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TouchableOpacity, ActivityIndicator} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GetStarted from './GetStarted/GetStarted';
import Signup from './GetStarted/Signup';
import ConfirmOtp from './GetStarted/ConfirmOTP';
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
import D_HomeScreen from './GetStarted/DRIVER/D_HomeScreen';
import D_Signup from './GetStarted/DRIVER/D_Signup';
import D_ConfirmOTP from './GetStarted/DRIVER/D_ConfirmOTP';
import D_ConfirmOTP2 from './GetStarted/DRIVER/D_ConfirmOTP2';
import D_ConfirmOTP3 from './GetStarted/DRIVER/D_ConfirmOTP3';
import D_ConfirmOTP4 from './GetStarted/DRIVER/D_ConfirmOTP4';
import D_ConfirmOTP5 from './GetStarted/DRIVER/D_ConfirmOTP5';
import D_DriverRequest from './GetStarted/DRIVER/D_DriverRequest';
import D_CreateProfile from './GetStarted/DRIVER/D_CreateProfile';
import D_CarDetail from './GetStarted/DRIVER/D_CreateCarProfile1';
import D_CarDetail2 from './GetStarted/DRIVER/D_CreateCarProfile2';
import LoadHome from './GetStarted/LoadHome';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyDrawer from './Drawer';
import Profile from './GetStarted/Profile';
import Drift from './GetStarted/Drift';
import Transactions from './GetStarted/Transactions';

const Stack = createNativeStackNavigator();


const Drawer = createDrawerNavigator();

window.AsyncStorage = AsyncStorage;



export default function App() { 
  const [isLoggedIn, setIsLoggedIn] = useState('');
  const [type, setType] = useState('');
  
  async function getData(){
   
    const data = await AsyncStorage.getItem('key');
    const data2 = await AsyncStorage.getItem('type');
    console.log(data)
    console.log(data2)
    console.log(isLoggedIn)
    setIsLoggedIn(data)
    setType(data2)
    console.log(data2)
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
    
    
      <Stack.Screen name="LoadHome"  options={{ headerShown: false }}  component={LoadHome} />
 
       
     <Stack.Screen name="GetStarted" options={{ headerShown: false }} component={GetStarted}/>
     <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false}}/>
     <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false}}/>
     <Stack.Screen name="Transactions" component={Transactions} options={{ headerShown: false}}/>
     <Stack.Screen name="ConfirmOtp" component={ConfirmOtp} options={{ headerShown: false}}/>
     <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false}}/>
     < Stack.Screen name="Drift" component={Drift} options={{ headerShown: false}}/>
     <Stack.Screen name="CreateProfile" component={CreateProfile} options={{ headerShown: false}}/>
     <Stack.Screen name="ConfirmOTP2" component={ConfirmOTP2} options={{ headerShown: false}}/>  
     <Stack.Screen name="ConfirmOTP3" component={ConfirmOTP3} options={{ headerShown: false}}/>  
     <Stack.Screen name="ConfirmOTP4" component={ConfirmOTP4} options={{ headerShown: false}}/> 
     <Stack.Screen name="ConfirmOTP5" component={ConfirmOTP5} options={{ headerShown: false}}/> 
     <Stack.Screen name="PanicDetail" component={PanicDetail} options={{ headerShown: false}}/>   
     <Stack.Screen name="PanicDetail2" component={PanicDetail2} options={{ headerShown: false}}/>   
     <Stack.Screen name="DriverRequest" component={DriverRequest} options={{ headerShown: false}}/>   
     <Stack.Screen name="RideStatus" options={{ headerShown: false }} component={RideStatus} />  
     <Stack.Screen name="SendParcel" component={SendParcel} options={{ headerShown: false}}/>   
     <Stack.Screen name="OrderRide"   component={OrderRide} options={{ headerShown: false}}/> 
     <Stack.Screen name="EnterLocation"   component={EnterLocation} options={{ headerShown: false}}/>
     <Stack.Screen name="HomeScreen" options={{ headerShown: false }} component={HomeScreen}/>  

  
    <Stack.Screen name="SignupD" component={D_Signup} options={{ headerShown: false}}/>
    <Stack.Screen name="ConfirmOTPD" component={D_ConfirmOTP} options={{ headerShown: false}}/>
    <Stack.Screen name="ConfirmOTP2D" component={D_ConfirmOTP2} options={{ headerShown: false}}/>
    <Stack.Screen name="ConfirmOTP3D" component={D_ConfirmOTP3} options={{ headerShown: false}}/>
    <Stack.Screen name="ConfirmOTP4D" component={D_ConfirmOTP4} options={{ headerShown: false}}/>
    <Stack.Screen name="ConfirmOTP5D" component={D_ConfirmOTP5} options={{ headerShown: false}}/>
    <Stack.Screen name="HomeScreenD" options={{ headerShown: false }} component={D_HomeScreen}/> 
    <Stack.Screen name="DriverRequestD" component={D_DriverRequest} options={{ headerShown: false}}/>
    <Stack.Screen name="DriverProfile" component={D_CreateProfile} options={{ headerShown: false}}/>
    <Stack.Screen name="CarDetail" component={D_CarDetail} options={{ headerShown: false}}/>
    <Stack.Screen name="CarDetail2" component={D_CarDetail2} options={{ headerShown: false}}/>
     
   </Stack.Navigator>  

   </>):(<>
    <Stack.Navigator > 
  
      
    <Stack.Screen name="GetStarted"  options={{ headerShown: false }}  component={GetStarted}/>
    <Stack.Screen name="Signup" component={Signup}/>
    <Stack.Screen name="Profile" component={Profile}/>
    <Stack.Screen name="Transactions" component={Transactions}/>
   < Stack.Screen name="Drift" component={Drift}/>
    <Stack.Screen name="ConfirmOtp" component={ConfirmOtp}/>
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
     <Stack.Screen name="SendParcel" component={SendParcel}/>  
     <Stack.Screen name="RideStatus" options={{ headerShown: false }} component={RideStatus}/> 
    <Stack.Screen name="HomeScreen" options={{ headerShown: false }} component={HomeScreen}/>   
    <Stack.Screen name="EnterLocation"   component={EnterLocation} />

    <Stack.Screen name="SignupD" component={D_Signup}/>
    <Stack.Screen name="ConfirmOTPD" component={D_ConfirmOTP}/>
    <Stack.Screen name="ConfirmOTP2D" component={D_ConfirmOTP2}/>
    <Stack.Screen name="ConfirmOTP3D" component={D_ConfirmOTP3}/>
    <Stack.Screen name="ConfirmOTP4D" component={D_ConfirmOTP4}/>
    <Stack.Screen name="ConfirmOTP5D" component={D_ConfirmOTP5}/>
    <Stack.Screen name="HomeScreenD" options={{ headerShown: false }} component={D_HomeScreen}/>
    <Stack.Screen name="DriverRequestD" component={D_DriverRequest}/>
    <Stack.Screen name="DriverProfile" component={D_CreateProfile}/>
    <Stack.Screen name="CarDetail" component={D_CarDetail}/>
    <Stack.Screen name="CarDetail2" component={D_CarDetail2}/>
    
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
