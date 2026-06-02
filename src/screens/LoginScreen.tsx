import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, TextInput, Button, ActivityIndicator, Snackbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { SafeAreaView } from 'react-native-safe-area-context';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

export  function LoginScreen({ navigation }: Props): any {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve:any) => setTimeout(resolve, 1500));
      
      // Demo credentials
      if (email === 'admin@bookease.com' && password === 'admin123') {
        await AsyncStorage.setItem('userToken', 'admin-token');
        await AsyncStorage.setItem('userRole', 'admin');
        navigation.replace('Admin');
      } else if (email === 'user@bookease.com' && password === 'user123') {
        await AsyncStorage.setItem('userToken', 'user-token');
        await AsyncStorage.setItem('userRole', 'user');
        navigation.replace('User');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = (): void => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace('User');
    }, 1500);
  };

  return (
     <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <LinearGradient colors={['#FF6B35', '#FF8C42']} style={styles.header}>
          <Icon name="calendar-heart" size={60} color="#fff" />
          <Text style={styles.appName}>BookEase</Text>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
        </LinearGradient>

        <View style={styles.formContainer}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="email" />}
            theme={{ colors: { primary: '#FF6B35' } }}
            autoCapitalize="none"
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            style={styles.input}
            secureTextEntry={!showPassword}
            left={<TextInput.Icon icon="lock" />}
            right={<TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} onPress={() => setShowPassword(!showPassword)} />}
            theme={{ colors: { primary: '#FF6B35' } }}
          />

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.loginButton}
            buttonColor="#FF6B35"
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#fff" /> : 'Login'}
          </Button>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

        
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Snackbar
        visible={!!error}
        onDismiss={() => setError('')}
        duration={3000}
        action={{ label: 'OK', onPress: () => setError('') }}
      >
        {error}
      </Snackbar>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  welcomeText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 5,
  },
  formContainer: {
    padding: 20,
    paddingTop: 30,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  forgotPassword: {
    textAlign: 'right',
    color: '#FF6B35',
    marginBottom: 20,
  },
  loginButton: {
    paddingVertical: 8,
    borderRadius: 25,
    marginBottom: 20,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#999',
  },
  googleButton: {
    borderColor: '#ddd',
    borderRadius: 25,
    paddingVertical: 5,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  signupText: {
    color: '#666',
  },
  signupLink: {
    color: '#FF6B35',
    fontWeight: 'bold',
  },
});