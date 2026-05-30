import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SplashScreen } from '../screens/SplashScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { HomeDashboard } from '../screens/HomeDashboard';
import { GenerateTokenScreen } from '../screens/GenerateTokenScreen';
import AdminDashboard from '../screens/admin/AdminDashboard';
import { theme } from '../theme';
import { NotificationsScreen } from '../screens/NotificationScreen';
import { navigationRef } from './navigationRef';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const UserTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
      headerTintColor: '#fff',
      tabBarActiveTintColor: theme.colors.primary,
    }}
  >
    <Tab.Screen name="Home" component={HomeDashboard} />
    <Tab.Screen name="Generate Token" component={GenerateTokenScreen} />
    <Tab.Screen name="Notifications" component={NotificationsScreen} />
  </Tab.Navigator>
);

export const AppNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="UserDashboard" component={UserTabs} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
