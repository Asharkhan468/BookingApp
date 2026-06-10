import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput as RNTextInput } from 'react-native';
import { Text, Card, Button, FAB, Avatar, Divider, ActivityIndicator, Snackbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Staff, Availability } from '../types';

interface StaffWithAvailability extends Staff {
  availability: Availability[];
}

export default function StaffManagement(): any {
  const [staff, setStaff] = useState<StaffWithAvailability[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingStaff, setEditingStaff] = useState<StaffWithAvailability | null>(null);
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  // Form states
  const [name, setName] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [rating, setRating] = useState<string>('');
  const [image, setImage] = useState<string>('');

  useEffect(() => {
    loadStaff();
  }, []);

  const loadStaff = async (): Promise<void> => {
    await new Promise((resolve:any) => setTimeout(resolve, 1000));
    const mockStaff: StaffWithAvailability[] = [
      {
        id: 1,
        name: 'John Doe',
        role: 'Senior Stylist',
        rating: 4.9,
        image: '👨‍🦰',
        availability: [
          { day: 'Monday', slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'] },
          { day: 'Tuesday', slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'] },
          { day: 'Wednesday', slots: ['9:00 AM', '10:00 AM', '11:00 AM'] },
        ],
      },
      {
        id: 2,
        name: 'Sarah Smith',
        role: 'Beauty Expert',
        rating: 4.8,
        image: '👩‍🦳',
        availability: [
          { day: 'Monday', slots: ['1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'] },
          { day: 'Thursday', slots: ['9:00 AM', '10:00 AM', '11:00 AM'] },
          { day: 'Friday', slots: ['9:00 AM', '10:00 AM', '11:00 AM'] },
        ],
      },
    ];
    setStaff(mockStaff);
    setLoading(false);
  };

  const handleAddStaff = (): void => {
    setEditingStaff(null);
    setName('');
    setRole('');
    setRating('');
    setImage('');
    setModalVisible(true);
  };

  const handleEditStaff = (staffMember: StaffWithAvailability): void => {
    setEditingStaff(staffMember);
    setName(staffMember.name);
    setRole(staffMember.role);
    setRating(staffMember.rating.toString());
    setImage(staffMember.image);
    setModalVisible(true);
  };

  const handleSaveStaff = (): void => {
    if (!name || !role) {
      setSnackbarMessage('Please fill in required fields');
      setSnackbarVisible(true);
      return;
    }

    if (editingStaff) {
      // Update existing staff
      setStaff(prev =>
        prev.map(s =>
          s.id === editingStaff.id
            ? { ...s, name, role, rating: parseFloat(rating) || s.rating, image }
            : s
        )
      );
      setSnackbarMessage('Staff updated successfully');
    } else {
      // Add new staff
      const newStaff: StaffWithAvailability = {
        id: staff.length + 1,
        name,
        role,
        rating: parseFloat(rating) || 4.5,
        image: image || '👤',
        availability: [],
      };
      setStaff([...staff, newStaff]);
      setSnackbarMessage('Staff added successfully');
    }
    
    setModalVisible(false);
    setSnackbarVisible(true);
  };

  const handleDeleteStaff = (id: number): void => {
    setStaff(prev => prev.filter(s => s.id !== id));
    setSnackbarMessage('Staff removed successfully');
    setSnackbarVisible(true);
  };

  const StaffCard = ({ item }: { item: StaffWithAvailability }): JSX.Element => (
    <Card style={styles.staffCard}>
      <Card.Content>
        <View style={styles.staffHeader}>
          <View style={styles.staffInfo}>
            <Text style={styles.staffEmoji}>{item.image}</Text>
            <View>
              <Text style={styles.staffName}>{item.name}</Text>
              <Text style={styles.staffRole}>{item.role}</Text>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>
            </View>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity onPress={() => handleEditStaff(item)} style={styles.editButton}>
              <Icon name="pencil" size={20} color="#FF6B35" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteStaff(item.id)} style={styles.deleteButton}>
              <Icon name="delete" size={20} color="#F44336" />
            </TouchableOpacity>
          </View>
        </View>
        
        <Divider style={styles.divider} />
        
        <View style={styles.availabilitySection}>
          <Text style={styles.availabilityTitle}>Weekly Schedule</Text>
          {item.availability.length > 0 ? (
            item.availability.map((avail, index) => (
              <View key={index} style={styles.availabilityRow}>
                <Text style={styles.dayText}>{avail.day}</Text>
                <Text style={styles.slotsText}>{avail.slots.join(', ')}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noAvailability}>No availability set</Text>
          )}
          <Button mode="text" onPress={() => {}} textColor="#FF6B35" style={styles.editScheduleButton}>
            Edit Schedule
          </Button>
        </View>
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
      <FlatList
        data={staff}
        renderItem={({ item }) => <StaffCard item={item} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={handleAddStaff}
        color="#fff"
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingStaff ? 'Edit Staff' : 'Add New Staff'}
            </Text>
            
            <View style={styles.modalForm}>
              <RNTextInput
                style={styles.input}
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
              />
              <RNTextInput
                style={styles.input}
                placeholder="Role (e.g., Senior Stylist)"
                value={role}
                onChangeText={setRole}
              />
              <RNTextInput
                style={styles.input}
                placeholder="Rating (0-5)"
                value={rating}
                onChangeText={setRating}
                keyboardType="numeric"
              />
              <RNTextInput
                style={styles.input}
                placeholder="Image Emoji"
                value={image}
                onChangeText={setImage}
              />
            </View>
            
            <View style={styles.modalButtons}>
              <Button mode="outlined" onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                Cancel
              </Button>
              <Button mode="contained" onPress={handleSaveStaff} style={styles.saveButton} buttonColor="#FF6B35">
                Save
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
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
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 15,
    paddingBottom: 80,
  },
  staffCard: {
    marginBottom: 15,
    borderRadius: 15,
    elevation: 2,
  },
  staffHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  staffInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  staffEmoji: {
    fontSize: 50,
    marginRight: 15,
  },
  staffName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  staffRole: {
    fontSize: 14,
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
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  editButton: {
    padding: 8,
  },
  deleteButton: {
    padding: 8,
  },
  divider: {
    marginVertical: 15,
  },
  availabilitySection: {
    marginTop: 5,
  },
  availabilityTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  availabilityRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dayText: {
    width: 80,
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
  },
  slotsText: {
    flex: 1,
    fontSize: 12,
    color: '#999',
  },
  noAvailability: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  editScheduleButton: {
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#FF6B35',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalForm: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    borderRadius: 25,
  },
  saveButton: {
    flex: 1,
    marginLeft: 10,
    borderRadius: 25,
  },
});