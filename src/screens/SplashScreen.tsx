import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

const { width, height } = Dimensions.get('window');

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

export  function SplashScreen({ navigation }: Props):any {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      navigation.replace('Onboarding');
    }, 3000);
  }, [fadeAnim, scaleAnim, rotateAnim, navigation]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient colors={['#FF6B35', '#FF8C42', '#FFA559']} style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Icon name="calendar-heart" size={100} color="#fff" />
        </Animated.View>
        <Text style={styles.appName}>BookEase</Text>
        <Text style={styles.tagline}>Smart Booking Assistant</Text>
      </Animated.View>
      
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
    opacity: 0.9,
    letterSpacing: 1,
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 12,
  },
});