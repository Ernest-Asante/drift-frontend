import React, { useState, createContext } from 'react'
import {View} from 'react-native'

//import { ChooseContext } from './SignupContext1'
export const ChooseContext = createContext();

function ChooseContextProvider({children}) {
   


    const [email, setEmail] = useState('');
    

 return (
        <View>
            <ChooseContext.Provider 
            value={{ email, setEmail}}>
              {children}
            </ChooseContext.Provider>

        </View>
 )
       

}

export default ChooseContextProvider
