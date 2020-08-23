import * as React from 'react';
import { Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Taxman from './TaxmanComponent';
import Instructions from './InstructionsComponent';

const window = Dimensions.get("window");
const Tab = createBottomTabNavigator();

export default function Nav() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions= {{
          activeTintColor: 'plum',
          labelStyle: {
            fontSize: 20,
            borderWidth: 1,
            borderRadius: 5,
            padding: 10
          },
          style: {
          //backgroundColor: 'mauve'
          height: .1 * (window.height)
          }
        }}>
        <Tab.Screen name="Game" component={Taxman} />
        <Tab.Screen name="Instructions" component={Instructions} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}