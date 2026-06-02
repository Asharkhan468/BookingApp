import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Text,
  Card,
  ActivityIndicator,
  ProgressBar,
  IconButton,
  Menu,
  Avatar,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { StackNavigationProp } from '@react-navigation/stack';
import { AdminStackParamList } from '../../../App';
import { DashboardStats } from '../../types';
import { navigationRef } from '../../navigation/navigationRef';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

type AdminDashboardNavigationProp = StackNavigationProp<
  AdminStackParamList,
  'AdminDashboard'
>;

interface Props {
  navigation: AdminDashboardNavigationProp;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  trend?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color,
  trend,
}) => (
  <Card style={styles.statCard}>
    <LinearGradient
      colors={[color, color + 'CC']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.statGradient}
    >
      <Card.Content>
        <View style={styles.statHeader}>
          <Icon name={icon} size={30} color="#fff" />
          {trend !== undefined && (
            <View style={styles.trendContainer}>
              <Icon
                name={trend >= 0 ? 'arrow-up' : 'arrow-down'}
                size={16}
                color="#fff"
              />
              <Text style={styles.trendText}>{Math.abs(trend)}%</Text>
            </View>
          )}
        </View>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
      </Card.Content>
    </LinearGradient>
  </Card>
);

export default function AdminDashboard({ navigation }: Props): any {
  const [loading, setLoading] = useState<boolean>(true);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    revenue: 0,
    activeCustomers: 0,
    pendingAppointments: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async (): Promise<void> => {
    await new Promise((resolve: any) => setTimeout(resolve, 1500));
    setStats({
      totalBookings: 245,
      revenue: 12580,
      activeCustomers: 189,
      pendingAppointments: 12,
    });
    setLoading(false);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userRole');
            navigation.navigate('Login');
          },
        },
      ],
      { cancelable: true },
    );
  };

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [3200, 4500, 5800, 6200, 7800, 8900],
        color: (opacity = 1) => `rgba(255, 107, 53, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const pieData = [
    {
      name: 'Haircut',
      population: 85,
      color: '#FF6B35',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
    {
      name: 'Facial',
      population: 65,
      color: '#E91E63',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
    {
      name: 'Dental',
      population: 45,
      color: '#2196F3',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
    {
      name: 'Consultation',
      population: 50,
      color: '#4CAF50',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
  ];

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(255, 107, 53, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  return (
    <>
      <LinearGradient
        colors={['#FF6B35', '#FF8C42']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContainer}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Dashboard</Text>
            <Text style={styles.headerSubtitle}>Welcome back, Admin</Text>
          </View>

          {/* Professional Logout Button with Menu */}
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                  style={styles.logoutGradient}
                >
                  <Icon name="logout" size={22} color="#fff" />
                  <Text style={styles.logoutText}>Logout</Text>
                </LinearGradient>
              </TouchableOpacity>
            }
            contentStyle={styles.menuContent}
          ></Menu>
        </View>
      </LinearGradient>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard
            title="Total Bookings"
            value={stats.totalBookings}
            icon="calendar-check"
            color="#FF6B35"
            trend={12}
          />
          <StatCard
            title="Revenue"
            value={`$${stats.revenue}`}
            icon="currency-usd"
            color="#4CAF50"
            trend={8}
          />
          <StatCard
            title="Active Customers"
            value={stats.activeCustomers}
            icon="account-group"
            color="#2196F3"
            trend={5}
          />
          <StatCard
            title="Pending"
            value={stats.pendingAppointments}
            icon="clock-outline"
            color="#FF9800"
            trend={-3}
          />
        </View>

        {/* Revenue Chart */}
        <Card style={styles.chartCard}>
          <Card.Content>
            <Text style={styles.chartTitle}>Revenue Overview</Text>
            <Text style={styles.chartSubtitle}>Last 6 months</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <LineChart
                data={revenueData}
                width={Math.max(width, 600)}
                height={220}
                chartConfig={chartConfig}
                bezier
                withInnerLines={false}
                withOuterLines={false}
                withShadow={false}
                style={styles.chart}
              />
            </ScrollView>
          </Card.Content>
        </Card>

        {/* Service Distribution */}
        <Card style={styles.chartCard}>
          <Card.Content>
            <Text style={styles.chartTitle}>Service Distribution</Text>
            <PieChart
              data={pieData}
              width={width - 60}
              height={200}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </Card.Content>
        </Card>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('ManageAppointments')}
            >
              <Icon name="calendar-edit" size={40} color="#FF6B35" />
              <Text style={styles.actionText}>Manage Bookings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('StaffManagement')}
            >
              <Icon name="account-multiple" size={40} color="#4CAF50" />
              <Text style={styles.actionText}>Staff Management</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('AutomationSettings')}
            >
              <Icon name="robot" size={40} color="#2196F3" />
              <Text style={styles.actionText}>Automation</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
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
  headerGradient: {
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'column',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
    opacity: 0.9,
  },
  logoutButton: {
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  logoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  menuContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  statCard: {
    width: (width - 40) / 2,
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
  },
  statGradient: {
    padding: 15,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  trendText: {
    color: '#fff',
    fontSize: 10,
    marginLeft: 2,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  statTitle: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
  },
  chartCard: {
    margin: 15,
    borderRadius: 15,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  chartSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 15,
  },
  chart: {
    borderRadius: 16,
    alignSelf: 'center',
  },
  quickActions: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 2,
  },
  actionText: {
    fontSize: 12,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
});
