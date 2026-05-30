import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { Text, Card, Button, RadioButton, ActivityIndicator, Snackbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { Service, Staff } from '../types';

type BookingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Booking'>;
type BookingScreenRouteProp = RouteProp<RootStackParamList, 'Booking'>;

interface Props {
  navigation: BookingScreenNavigationProp;
  route: BookingScreenRouteProp;
}

const timeSlots: string[] = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
  
const staffMembers: Staff[] = [
  { id: 1, name: 'John Doe', role: 'Senior Stylist', rating: 4.9, image: '👨‍🦰', availability: [] },
  { id: 2, name: 'Sarah Smith', role: 'Beauty Expert', rating: 4.8, image: '👩‍🦳', availability: [] },
  { id: 3, name: 'Dr. Emily Chen', role: 'Dentist', rating: 4.9, image: '👩‍⚕️', availability: [] },
];

const servicesList: Service[] = [
  { id: 1, name: 'Haircut', price: 30, duration: 45, category: 'Beauty', rating: 4.8, reviews: 234, icon: 'content-cut', color: '#FF6B35', description: 'Professional haircut' },
  { id: 2, name: 'Facial', price: 50, duration: 60, category: 'Beauty', rating: 4.9, reviews: 189, icon: 'face-woman', color: '#E91E63', description: 'Revitalizing facial' },
  { id: 3, name: 'Dental Checkup', price: 80, duration: 30, category: 'Medical', rating: 4.7, reviews: 156, icon: 'tooth', color: '#2196F3', description: 'Dental examination' },
  { id: 4, name: 'Consultation', price: 60, duration: 45, category: 'Medical', rating: 4.6, reviews: 312, icon: 'stethoscope', color: '#4CAF50', description: 'Health consultation' },
];

export default function AppointmentBooking({ navigation, route }: Props): JSX.Element {
  const { service: initialService } = route.params || {};
  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<Service | null>(initialService || null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedStaff, setSelectedStaff] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const handleDateChange = (event: any, selectedDate?: Date): void => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  const handleBooking = async (): Promise<void> => {
    if (!selectedService || !selectedDate || !selectedTime || !selectedStaff) {
      setSnackbarMessage('Please complete all fields');
      setSnackbarVisible(true);
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve:any) => setTimeout(resolve, 1500));
      await sendWhatsAppReminder();
      
      Alert.alert(
        'Booking Confirmed!',
        `Your appointment has been booked for ${format(selectedDate, 'MMM dd, yyyy')} at ${selectedTime} with ${selectedStaff}. A WhatsApp reminder has been sent.`,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ]
      );
    } catch (error) {
      setSnackbarMessage('Booking failed. Please try again.');
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const sendWhatsAppReminder = async (): Promise<void> => {
    console.log('Sending WhatsApp reminder...');
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const ServiceSelection = (): JSX.Element => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Select Service</Text>
      {servicesList.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[styles.serviceOption, selectedService?.id === item.id && styles.selectedOption]}
          onPress={() => setSelectedService(item)}
        >
          <Icon name={item.icon} size={24} color={selectedService?.id === item.id ? '#FF6B35' : '#666'} />
          <View style={styles.serviceOptionInfo}>
            <Text style={styles.serviceOptionName}>{item.name}</Text>
            <Text style={styles.serviceOptionPrice}>${item.price}</Text>
          </View>
          <RadioButton
            value={item.id.toString()}
            status={selectedService?.id === item.id ? 'checked' : 'unchecked'}
            onPress={() => setSelectedService(item)}
            color="#FF6B35"
          />
        </TouchableOpacity>
      ))}
      <Button mode="contained" onPress={() => setStep(2)} style={styles.nextButton} buttonColor="#FF6B35">
        Next
      </Button>
    </View>
  );

  const DateTimeSelection = (): JSX.Element => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Select Date & Time</Text>
      
      <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowDatePicker(true)}>
        <Icon name="calendar" size={24} color="#FF6B35" />
        <Text style={styles.datePickerText}>
          {format(selectedDate, 'MMMM dd, yyyy')}
        </Text>
        <Icon name="chevron-down" size={20} color="#666" />
      </TouchableOpacity>
      
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}
      
      <Text style={styles.timeSlotsTitle}>Available Time Slots</Text>
      <View style={styles.timeSlotsContainer}>
        {timeSlots.map((time) => (
          <TouchableOpacity
            key={time}
            style={[styles.timeSlot, selectedTime === time && styles.selectedTimeSlot]}
            onPress={() => setSelectedTime(time)}
          >
            <Text style={[styles.timeSlotText, selectedTime === time && styles.selectedTimeSlotText]}>
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Button mode="contained" onPress={() => setStep(3)} style={styles.nextButton} buttonColor="#FF6B35">
        Next
      </Button>
    </View>
  );

  const StaffSelection = (): JSX.Element => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Select Staff</Text>
      {staffMembers.map((staff) => (
        <TouchableOpacity
          key={staff.id}
          style={[styles.staffOption, selectedStaff === staff.name && styles.selectedOption]}
          onPress={() => setSelectedStaff(staff.name)}
        >
          <Text style={styles.staffEmoji}>{staff.image}</Text>
          <View style={styles.staffInfo}>
            <Text style={styles.staffName}>{staff.name}</Text>
            <Text style={styles.staffRole}>{staff.role}</Text>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={14} color="#FFD700" />
              <Text style={styles.ratingText}>{staff.rating}</Text>
            </View>
          </View>
          <RadioButton
            value={staff.name}
            status={selectedStaff === staff.name ? 'checked' : 'unchecked'}
            onPress={() => setSelectedStaff(staff.name)}
            color="#FF6B35"
          />
        </TouchableOpacity>
      ))}
      <View style={styles.buttonRow}>
        <Button mode="outlined" onPress={() => setStep(2)} style={styles.backButton} textColor="#FF6B35">
          Back
        </Button>
        <Button mode="contained" onPress={handleBooking} style={styles.confirmButton} buttonColor="#FF6B35">
          Confirm Booking
        </Button>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Appointment</Text>
        <View style={styles.stepIndicator}>
          <Text style={styles.stepText}>Step {step} of 3</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {step === 1 && <ServiceSelection />}
        {step === 2 && <DateTimeSelection />}
        {step === 3 && <StaffSelection />}
      </ScrollView>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Booking your appointment...</Text>
        </View>
      )}

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{ label: 'OK', onPress: () => setSnackbarVisible(false) }}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  stepIndicator: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  stepText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  serviceOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    marginBottom: 10,
  },
  serviceOptionInfo: {
    flex: 1,
    marginLeft: 15,
  },
  serviceOptionName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  serviceOptionPrice: {
    fontSize: 14,
    color: '#FF6B35',
    marginTop: 4,
  },
  selectedOption: {
    backgroundColor: '#FFF5F0',
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    marginBottom: 20,
  },
  datePickerText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  timeSlotsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  timeSlot: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedTimeSlot: {
    backgroundColor: '#FF6B35',
  },
  timeSlotText: {
    color: '#666',
  },
  selectedTimeSlotText: {
    color: '#fff',
  },
  staffOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    marginBottom: 10,
  },
  staffEmoji: {
    fontSize: 40,
    marginRight: 15,
  },
  staffInfo: {
    flex: 1,
  },
  staffName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  staffRole: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  nextButton: {
    marginTop: 20,
    borderRadius: 25,
    paddingVertical: 5,
  },
  backButton: {
    flex: 1,
    marginRight: 10,
    borderRadius: 25,
    borderColor: '#FF6B35',
  },
  confirmButton: {
    flex: 2,
    borderRadius: 25,
    paddingVertical: 5,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
});