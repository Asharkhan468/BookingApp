import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, Platform, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Import screens
import { SplashScreen } from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import { HomeDashboard } from './src/screens/HomeDashboard';
import ServicesScreen from './src/screens/ServicesScreen';
import AppointmentBooking from './src/screens/AppointmentBooking';
import AIChatScreen from './src/screens/AIChatScreen';
import { NotificationsScreen } from './src/screens/NotificationScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { AuthContext } from './src/contexts/AuthContext';

// Admin Screens
import AdminDashboard from './src/screens/admin/AdminDashboard';
import ManageAppointments from './src/screens/admin/ManageAppointments';
import StaffManagement from './src/screens/admin/StaffManagement';
import AutomationSettings from './src/screens/admin/AutomationSettings';
import AddService from './src/screens/admin/AddServices';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  User: undefined;
  Admin: undefined;
  Booking: { service?: any };
  Notifications: undefined;
  AdminDashboard: undefined;
  ManageAppointments: undefined;
  StaffManagement: undefined;
  AutomationSettings: undefined;
  AddServices:undefined;
  BookingHistory: undefined;
};

export type UserTabParamList = {
  Home: undefined;
  Services: undefined;
  AI: undefined;
  Calendar: undefined;
  Profile: undefined;
};

export type AdminStackParamList = {
  AdminDashboard: undefined;
  ManageAppointments: undefined;
  StaffManagement: undefined;
  AutomationSettings: undefined;
  AddServices: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<UserTabParamList>();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF6B35',
    accent: '#FF8C42',
  },
};

// Custom Tab Bar Icon Component
const TabBarIcon = ({ focused, color, size, routeName }: any) => {
  let iconName: string;
  switch (routeName) {
    case 'Home':
      iconName = focused ? 'home' : 'home-outline';
      break;
    case 'Services':
      iconName = focused ? 'tools' : 'tools';
      break;
    case 'AI':
      iconName = focused ? 'robot' : 'robot-outline';
      break;
    case 'Calendar':
      iconName = focused ? 'calendar' : 'calendar-outline';
      break;
    case 'Profile':
      iconName = focused ? 'account' : 'account-outline';
      break;
    default:
      iconName = 'circle';
  }
  return <Icon name={iconName} size={size} color={color} />;
};

// User Bottom Tab Navigator with proper safe area
function UserTabs(): any {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarButton: (props: any) => (
            <Pressable
              {...props}
              android_ripple={null}
              style={({ pressed }) => [
                props.style,
                {
                  opacity: 1,
                  elevation: 0,
                },
              ]}
            />
          ),

          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              focused={focused}
              color={color}
              size={size}
              routeName={route.name}
            />
          ),

          tabBarActiveTintColor: '#FF6B35',
          tabBarInactiveTintColor: '#999',

          tabBarStyle: {
            height: 65 + insets.bottom,
            paddingBottom: Math.max(insets.bottom, 8),
            paddingTop: 8,
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#f0f0f0',
            elevation: 0,
            shadowOpacity: 0,
          },

          headerShown: false,
          tabBarHideOnKeyboard: true,
        })}
      >
        <Tab.Screen name="Home" component={HomeDashboard} />
        <Tab.Screen name="Services" component={ServicesScreen} />
        <Tab.Screen name="AI" component={AIChatScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </View>
  );
}

// Admin Stack Navigator
function AdminStack(): any {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#FF6B35" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#FF6B35' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboard}
          options={{ title: 'Admin Dashboard' }}
        />
        <Stack.Screen
          name="ManageAppointments"
          component={ManageAppointments}
          options={{ title: 'Manage Appointments' }}
        />
        <Stack.Screen
          name="StaffManagement"
          component={StaffManagement}
          options={{ title: 'Staff Management' }}
        />
        <Stack.Screen
          name="AutomationSettings"
          component={AutomationSettings}
          options={{ title: 'Automation Settings' }}
        />
        <Stack.Screen
          name="AddServices"
          component={AddService}
          options={{ title: 'Add Service' }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </View>
  );
}

export default function App(): any {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async (): Promise<void> => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const userRole = await AsyncStorage.getItem('userRole');
      if (userToken) {
        setIsLoggedIn(true);
        setIsAdmin(userRole === 'admin');
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (role: string) => {
    setIsLoggedIn(true);
    setIsAdmin(role === 'admin');
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userRole');

      // setIsLoggedIn(false);
      setIsAdmin(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <StatusBar barStyle="light-content" backgroundColor="#FF6B35" />
          {/* <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {!isLoggedIn ? (
                <>
                  <Stack.Screen name="Splash" component={SplashScreen} />
                  <Stack.Screen
                    name="Onboarding"
                    component={OnboardingScreen}
                  />
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="Register" component={RegisterScreen} />
                </>
              ) : isAdmin ? (
                <Stack.Screen name="Admin" component={AdminStack} />
              ) : (
                <>
                  <Stack.Screen name="User" component={UserTabs} />
                  <Stack.Screen name="Booking" component={AppointmentBooking} />
                  <Stack.Screen
                    name="Notifications"
                    component={NotificationsScreen}
                  />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer> */}
          <AuthContext.Provider
            value={{
              login,
              logout,
            }}
          >
            <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!isLoggedIn ? (
                  <>
                    <Stack.Screen name="Splash" component={SplashScreen} />
                    <Stack.Screen
                      name="Onboarding"
                      component={OnboardingScreen}
                    />
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                  </>
                ) : isAdmin ? (
                  <Stack.Screen name="Admin" component={AdminStack} />
                ) : (
                  <>
                    <Stack.Screen name="User" component={UserTabs} />
                    <Stack.Screen
                      name="Booking"
                      component={AppointmentBooking}
                    />
                    <Stack.Screen
                      name="Notifications"
                      component={NotificationsScreen}
                    />
                  </>
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </AuthContext.Provider>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
