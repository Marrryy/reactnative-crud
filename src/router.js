import React from 'react';
import 'react-native-gesture-handler';

import { View, Platform, Text, StyleSheet, ScrollView, Image, NetInfo, ToastAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import ListContact from './pages/listContact';
import ViewContact from './pages/viewContact';
import PostContact from './pages/postContact';
import EditContact from './pages/editContact';
import configureStore from './redux/configureStore'

const store = configureStore();


const Router = () => {
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <View  style={{ position: 'absolute',
    top: 35,
    left:0,
    right:0,
    bottom:0 }} removeClippedSubviews={false}>
        {/* <ListContact/> */}
        <NavigationContainer>
          <Stack.Navigator>
             <Stack.Screen
              name="List"
              component={ListContact} 
              
              />

            <Stack.Screen
              name="View"
              component={ViewContact}
              initialParams={{ contact: {} }}
            />

            <Stack.Screen
              name="Edit"
              component={EditContact}
              initialParams={{ contact: {} }}
            />
            <Stack.Screen
              name="Post"
              component={PostContact}
            />
          </Stack.Navigator>

        </NavigationContainer>
        </View>
    </Provider>
  );
}


export default Router;