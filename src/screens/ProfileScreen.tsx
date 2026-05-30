import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import {
  Text,
  Card,
  Avatar,
  Button,
  Divider,
  ActivityIndicator,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { UserTabParamList, RootStackParamList } from '../../App';
import { User, Appointment } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { navigate } from '../navigation/navigationRef';

type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<UserTabParamList, 'Profile'>,
  StackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

export default function ProfileScreen({ navigation }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [notificationsEnabled, setNotificationsEnabled] =
    useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const user: User = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    role: 'user',
    createdAt: new Date(),
  };

  const handleLogout = (): void => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          setLoading(true);
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('userRole');
          navigation.replace('Login');
          setLoading(false);
        },
      },
    ]);
  };



  const MenuItem = ({
    icon,
    title,
    onPress,
    rightIcon = 'chevron-right',
  }: {
    icon: string;
    title: string;
    onPress?: () => void;
    rightIcon?: string;
  }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <Icon name={icon} size={24} color="#FF6B35" />
        <Text style={styles.menuItemTitle}>{title}</Text>
      </View>
      <Icon name={rightIcon} size={20} color="#999" />
    </TouchableOpacity>
  );

  const ToggleMenuItem = ({
    icon,
    title,
    value,
    onToggle,
  }: {
    icon: string;
    title: string;
    value: boolean;
    onToggle: (value: boolean) => void;
  }) => (
    <View style={styles.menuItem}>
      <View style={styles.menuItemLeft}>
        <Icon name={icon} size={24} color="#FF6B35" />
        <Text style={styles.menuItemTitle}>{title}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#767577', true: '#FF6B35' }}
        thumbColor={value ? '#fff' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  return (
    // <View style={styles.container}>
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Fixed Header Section - No Scroll */}
      <View style={styles.fixedHeader}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Avatar.Text
              size={80}
              label={user.name.charAt(0)}
              backgroundColor="#FF6B35"
            />
            <TouchableOpacity style={styles.editAvatarButton}>
              <Icon name="camera" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <Text style={styles.userPhone}>{user.phone}</Text>
          <Button
            mode="outlined"
            onPress={() => {}}
            style={styles.editProfileButton}
            textColor="#FF6B35"
          >
            Edit Profile
          </Button>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Card.Content style={styles.statContent}>
              <Icon name="calendar-check" size={30} color="#FF6B35" />
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Total Bookings</Text>
            </Card.Content>
          </Card>
          <Card style={styles.statCard}>
            <Card.Content style={styles.statContent}>
              <Icon name="star" size={30} color="#FFD700" />
              <Text style={styles.statNumber}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </Card.Content>
          </Card>
        </View>
      </View>

      {/* Scrollable Section */}
      <ScrollView
        style={styles.scrollableContent}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.menuCard}>
          <Card.Content>
            
            <Divider style={styles.divider} />

            <ToggleMenuItem
              icon="bell-outline"
              title="Notifications"
              value={notificationsEnabled}
              onToggle={setNotificationsEnabled}
            />
            <Divider style={styles.divider} />

            <ToggleMenuItem
              icon="theme-light-dark"
              title="Dark Mode"
              value={darkMode}
              onToggle={setDarkMode}
            />
            <Divider style={styles.divider} />

            <MenuItem icon="help-circle" title="Help & Support" />
            <Divider style={styles.divider} />

            <MenuItem icon="information" title="About Us" />
            <Divider style={styles.divider} />

            <MenuItem
              icon="logout"
              title="Logout"
              onPress={handleLogout}
              rightIcon="logout"
            />
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  fixedHeader: {
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF6B35',
    borderRadius: 20,
    padding: 8,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  userPhone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  editProfileButton: {
    borderColor: '#FF6B35',
    borderRadius: 25,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: '#fff',
  },
  statCard: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 15,
    elevation: 2,
  },
  statContent: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  scrollableContent: {
    flex: 1,
  },
  menuCard: {
    margin: 15,
    marginBottom: 5,
    borderRadius: 15,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemTitle: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  divider: {
    marginVertical: 5,
  },
});
