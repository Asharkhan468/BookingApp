import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Text, Card, Button, ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { format } from 'date-fns';
import { Appointment } from '../types';

const { width } = Dimensions.get('window');

LocaleConfig.locales['en'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};
LocaleConfig.defaultLocale = 'en';

interface MarkedDate {
  selected: boolean;
  marked: boolean;
  selectedColor: string;
}

export default function CalendarScreen(): JSX.Element {
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [loading, setLoading] = useState<boolean>(false);
  
  const appointments: Appointment[] = [
    {
      id: '1',
      userId: 'user1',
      serviceId: 1,
      serviceName: 'Haircut',
      date: new Date(),
      time: '3:00 PM',
      staff: 'John Doe',
      status: 'confirmed',
      price: 30,
      createdAt: new Date(),
      reminderSent: false,
    },
    {
      id: '2',
      userId: 'user1',
      serviceId: 2,
      serviceName: 'Facial',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      time: '11:00 AM',
      staff: 'Sarah Smith',
      status: 'pending',
      price: 50,
      createdAt: new Date(),
      reminderSent: false,
    },
  ];

  const getMarkedDates = (): Record<string, MarkedDate> => {
    const marked: Record<string, MarkedDate> = {};
    marked[selectedDate] = { selected: true, marked: true, selectedColor: '#FF6B35' };
    return marked;
  };

  const getAppointmentsForDate = (date: string): Appointment[] => {
    return appointments.filter(apt => format(apt.date, 'yyyy-MM-dd') === date);
  };

  const handleReschedule = (appointment: Appointment): void => {
    console.log('Reschedule appointment:', appointment.id);
  };

  const selectedAppointments = getAppointmentsForDate(selectedDate);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Calendar</Text>
        <Text style={styles.headerSubtitle}>Manage your appointments</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Calendar
          current={selectedDate}
          onDayPress={(day: { dateString: string }) => setSelectedDate(day.dateString)}
          markedDates={getMarkedDates()}
          theme={{
            selectedDayBackgroundColor: '#FF6B35',
            todayTextColor: '#FF6B35',
            arrowColor: '#FF6B35',
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
          style={styles.calendar}
        />

        <View style={styles.appointmentsSection}>
          <Text style={styles.sectionTitle}>
            Appointments for {format(new Date(selectedDate), 'MMMM dd, yyyy')}
          </Text>
          
          {loading ? (
            <ActivityIndicator size="large" color="#FF6B35" />
          ) : selectedAppointments.length === 0 ? (
            <Card style={styles.emptyCard}>
              <Card.Content style={styles.emptyContent}>
                <Icon name="calendar-blank" size={60} color="#ccc" />
                <Text style={styles.emptyText}>No appointments for this date</Text>
                <Button mode="contained" onPress={() => {}} style={styles.bookButton} buttonColor="#FF6B35">
                  Book an Appointment
                </Button>
              </Card.Content>
            </Card>
          ) : (
            selectedAppointments.map((appointment) => (
              <Card key={appointment.id} style={styles.appointmentCard}>
                <Card.Content>
                  <View style={styles.appointmentHeader}>
                    <Icon name="calendar-check" size={24} color="#FF6B35" />
                    <Text style={styles.appointmentService}>{appointment.serviceName}</Text>
                    <View style={[styles.statusBadge, appointment.status === 'confirmed' ? styles.confirmedBadge : styles.pendingBadge]}>
                      <Text style={styles.statusText}>{appointment.status}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.appointmentDetails}>
                    <View style={styles.detailRow}>
                      <Icon name="clock-outline" size={18} color="#666" />
                      <Text style={styles.detailText}>{appointment.time}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Icon name="account" size={18} color="#666" />
                      <Text style={styles.detailText}>{appointment.staff}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Icon name="currency-usd" size={18} color="#666" />
                      <Text style={styles.detailText}>${appointment.price}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.actionButtons}>
                    <Button mode="outlined" onPress={() => handleReschedule(appointment)} style={styles.rescheduleButton} textColor="#FF6B35">
                      Reschedule
                    </Button>
                    <Button mode="contained" onPress={() => {}} style={styles.detailsButton} buttonColor="#FF6B35">
                      View Details
                    </Button>
                  </View>
                </Card.Content>
              </Card>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  calendar: {
    borderRadius: 15,
    margin: 15,
    elevation: 3,
    backgroundColor: '#fff',
  },
  appointmentsSection: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  emptyCard: {
    borderRadius: 15,
    elevation: 2,
  },
  emptyContent: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 15,
    marginBottom: 20,
  },
  bookButton: {
    borderRadius: 25,
    paddingHorizontal: 20,
  },
  appointmentCard: {
    marginBottom: 10,
    borderRadius: 15,
    elevation: 2,
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  appointmentService: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confirmedBadge: {
    backgroundColor: '#4CAF50',
  },
  pendingBadge: {
    backgroundColor: '#FF9800',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  appointmentDetails: {
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
  },
  rescheduleButton: {
    flex: 1,
    marginRight: 10,
    borderRadius: 25,
    borderColor: '#FF6B35',
  },
  detailsButton: {
    flex: 1,
    borderRadius: 25,
  },
});