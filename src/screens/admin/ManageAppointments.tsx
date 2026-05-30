import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Text, Card, Button, Chip, ActivityIndicator, Searchbar, Menu, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format } from 'date-fns';
import { Appointment } from '../types';

type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export default function ManageAppointments(): JSX.Element {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<AppointmentStatus | 'all'>('all');
  const [menuVisible, setMenuVisible] = useState<string | null>(null);

  useEffect(() => {
    loadAppointments();
  }, []);

  useEffect(() => {
    filterAppointments();
  }, [searchQuery, filterStatus, appointments]);

  const loadAppointments = async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockAppointments: Appointment[] = [
      {
        id: '1',
        userId: 'user1',
        serviceId: 1,
        serviceName: 'Haircut',
        date: new Date(),
        time: '3:00 PM',
        staff: 'John Doe',
        status: 'pending',
        price: 30,
        createdAt: new Date(),
        reminderSent: false,
      },
      {
        id: '2',
        userId: 'user2',
        serviceId: 2,
        serviceName: 'Facial',
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        time: '11:00 AM',
        staff: 'Sarah Smith',
        status: 'confirmed',
        price: 50,
        createdAt: new Date(),
        reminderSent: false,
      },
      {
        id: '3',
        userId: 'user3',
        serviceId: 3,
        serviceName: 'Dental Checkup',
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        time: '2:00 PM',
        staff: 'Dr. Emily Chen',
        status: 'completed',
        price: 80,
        createdAt: new Date(),
        reminderSent: true,
      },
    ];
    setAppointments(mockAppointments);
    setFilteredAppointments(mockAppointments);
    setLoading(false);
  };

  const filterAppointments = (): void => {
    let filtered = [...appointments];
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(apt => apt.status === filterStatus);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(apt =>
        apt.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.staff.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredAppointments(filtered);
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus): void => {
    setAppointments(prev =>
      prev.map(apt =>
        apt.id === id ? { ...apt, status } : apt
      )
    );
    setMenuVisible(null);
    Alert.alert('Success', `Appointment ${status} successfully`);
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'pending': return '#FF9800';
      case 'confirmed': return '#4CAF50';
      case 'cancelled': return '#F44336';
      case 'completed': return '#2196F3';
      default: return '#999';
    }
  };

  const AppointmentCard = ({ appointment }: { appointment: Appointment }): JSX.Element => (
    <Card style={styles.appointmentCard}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.serviceName}>{appointment.serviceName}</Text>
            <Text style={styles.bookingId}>Booking #{appointment.id}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(appointment.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(appointment.status) }]}>
              {appointment.status.toUpperCase()}
            </Text>
          </View>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Icon name="account" size={18} color="#666" />
            <Text style={styles.detailText}>User ID: {appointment.userId}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="calendar" size={18} color="#666" />
            <Text style={styles.detailText}>{format(appointment.date, 'MMMM dd, yyyy')}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="clock-outline" size={18} color="#666" />
            <Text style={styles.detailText}>{appointment.time}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="account" size={18} color="#666" />
            <Text style={styles.detailText}>Staff: {appointment.staff}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="currency-usd" size={18} color="#666" />
            <Text style={styles.detailText}>${appointment.price}</Text>
          </View>
        </View>

        {appointment.status === 'pending' && (
          <View style={styles.actionButtons}>
            <Button mode="contained" onPress={() => updateAppointmentStatus(appointment.id, 'confirmed')} style={styles.acceptButton} buttonColor="#4CAF50">
              Accept
            </Button>
            <Button mode="outlined" onPress={() => updateAppointmentStatus(appointment.id, 'cancelled')} style={styles.rejectButton} textColor="#F44336">
              Reject
            </Button>
          </View>
        )}

        {appointment.status === 'confirmed' && (
          <View style={styles.actionButtons}>
            <Button mode="contained" onPress={() => updateAppointmentStatus(appointment.id, 'completed')} style={styles.completeButton} buttonColor="#2196F3">
              Mark Complete
            </Button>
            <Menu
              visible={menuVisible === appointment.id}
              onDismiss={() => setMenuVisible(null)}
              anchor={
                <Button mode="outlined" onPress={() => setMenuVisible(appointment.id)} style={styles.moreButton}>
                  More Options
                </Button>
              }
            >
              <Menu.Item onPress={() => updateAppointmentStatus(appointment.id, 'cancelled')} title="Cancel" />
              <Menu.Item onPress={() => {}} title="Reschedule" />
              <Menu.Item onPress={() => {}} title="Send Reminder" />
            </Menu>
          </View>
        )}
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search by service, staff, or ID"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        iconColor="#FF6B35"
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        <Chip
          selected={filterStatus === 'all'}
          onPress={() => setFilterStatus('all')}
          style={styles.filterChip}
          selectedColor="#FF6B35"
        >
          All
        </Chip>
        <Chip
          selected={filterStatus === 'pending'}
          onPress={() => setFilterStatus('pending')}
          style={styles.filterChip}
          selectedColor="#FF9800"
        >
          Pending
        </Chip>
        <Chip
          selected={filterStatus === 'confirmed'}
          onPress={() => setFilterStatus('confirmed')}
          style={styles.filterChip}
          selectedColor="#4CAF50"
        >
          Confirmed
        </Chip>
        <Chip
          selected={filterStatus === 'completed'}
          onPress={() => setFilterStatus('completed')}
          style={styles.filterChip}
          selectedColor="#2196F3"
        >
          Completed
        </Chip>
        <Chip
          selected={filterStatus === 'cancelled'}
          onPress={() => setFilterStatus('cancelled')}
          style={styles.filterChip}
          selectedColor="#F44336"
        >
          Cancelled
        </Chip>
      </ScrollView>

      <FlatList
        data={filteredAppointments}
        renderItem={({ item }) => <AppointmentCard appointment={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
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
  searchBar: {
    margin: 15,
    borderRadius: 15,
    elevation: 2,
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  filterChip: {
    marginRight: 10,
    backgroundColor: '#fff',
  },
  listContainer: {
    padding: 15,
  },
  appointmentCard: {
    marginBottom: 15,
    borderRadius: 15,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  bookingId: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 10,
  },
  detailsContainer: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 10,
    color: '#666',
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  acceptButton: {
    flex: 1,
    marginRight: 10,
    borderRadius: 25,
  },
  rejectButton: {
    flex: 1,
    borderRadius: 25,
    borderColor: '#F44336',
  },
  completeButton: {
    flex: 1,
    marginRight: 10,
    borderRadius: 25,
  },
  moreButton: {
    flex: 1,
    borderRadius: 25,
  },
});