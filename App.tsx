import React, { useState } from 'react';
// import Acceuil from './src/components/acceuil';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Context  from './src/context/products';
// import Panier from './src/components/panier';
import CartDetail from './src/components/cartDetail';

const Stack = createNativeStackNavigator();
export default function App( ) {
//const [cartItems, setCartItems] =useState("")
  return(
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="cartDetail" component={CartDetail}/>
           {/* <Stack.Screen name="Acceuil" component={ Acceuil} />
           <Stack.Screen name="panier" component={ Panier} /> */}
        </Stack.Navigator>
      </NavigationContainer>

   

    
  )
}