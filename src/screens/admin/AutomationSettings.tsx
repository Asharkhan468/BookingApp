import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Switch } from 'react-native';
import { Text, Card, List, Button, TextInput, Divider, Snackbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import { AutomationSettings as AutomationSettingsType } from '../types';

export default function AutomationSettings(): JSX.Element {
  const [settings, setSettings] = useState<AutomationSettingsType>({
    whatsappReminders: true,
    autoConfirmations: true,
    aiSuggestions: true,
    reminderHours: [24, 1],
    autoReschedule: true,
    whatsappNumber: '+1234567890',
    reminderMessage: "Your appointment is confirmed for {date} at {time} with {staff}",
    promotionalMessages: false,
  });

  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const showSnackbar = (message: string): void => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const toggleSetting = (key: keyof AutomationSettingsType): void => {
    setSettings({ ...settings, [key]: !settings[key] });
    showSnackbar(`${key} ${!settings[key] ? 'enabled' : 'disabled'}`);
  };

  const updateReminderHours = (index: number, value: number): void => {
    const newHours = [...settings.reminderHours];
    newHours[index] = value;
    setSettings({ ...settings, reminderHours: newHours });
  };

  const addReminderHour = (): void => {
    if (settings.reminderHours.length < 3) {
      setSettings({ ...settings, reminderHours: [...settings.reminderHours, 2] });
      showSnackbar('New reminder time added');
    }
  };

  const removeReminderHour = (index: number): void => {
    if (settings.reminderHours.length > 1) {
      const newHours = settings.reminderHours.filter((_, i) => i !== index);
      setSettings({ ...settings, reminderHours: newHours });
      showSnackbar('Reminder time removed');
    }
  };

  const AutomationCard = ({ 
    title, 
    icon, 
    description, 
    children 
  }: { 
    title: string; 
    icon: string; 
    description: string; 
    children: React.ReactNode;
  }): JSX.Element => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleContainer}>
            <Icon name={icon} size={24} color="#FF6B35" />
            <Text style={styles.cardTitle}>{title}</Text>
          </View>
        </View>
        <Text style={styles.cardDescription}>{description}</Text>
        {children}
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="robot-outline" size={50} color="#FF6B35" />
        <Text style={styles.headerTitle}>Automation Settings</Text>
        <Text style={styles.headerSubtitle}>Configure smart automation features</Text>
      </View>

      {/* WhatsApp Reminders */}
      <AutomationCard
        title="WhatsApp Automation"
        icon="whatsapp"
        description="Send automatic reminders and confirmations via WhatsApp"
      >
        <List.Item
          title="Enable WhatsApp Reminders"
          description="Send automatic reminders before appointments"
          right={() => <Switch value={settings.whatsappReminders} onValueChange={() => toggleSetting('whatsappReminders')} trackColor={{ false: '#ccc', true: '#FF6B35' }} />}
        />
        <List.Item
          title="Auto Confirmations"
          description="Automatically confirm bookings via WhatsApp"
          right={() => <Switch value={settings.autoConfirmations} onValueChange={() => toggleSetting('autoConfirmations')} trackColor={{ false: '#ccc', true: '#FF6B35' }} />}
        />
        <TextInput
          label="WhatsApp Business Number"
          value={settings.whatsappNumber}
          onChangeText={(text) => setSettings({ ...settings, whatsappNumber: text })}
          mode="outlined"
          style={styles.input}
          theme={{ colors: { primary: '#FF6B35' } }}
        />
      </AutomationCard>

      {/* Smart Reminders */}
      <AutomationCard
        title="Smart Reminders"
        icon="alarm"
        description="Configure when to send reminders before appointments"
      >
        {settings.reminderHours.map((hour, index) => (
          <View key={index} style={styles.reminderRow}>
            <Text style={styles.reminderText}>{hour} hour(s) before</Text>
            <Slider
              style={styles.slider}
              minimumValue={0.5}
              maximumValue={72}
              step={0.5}
              value={hour}
              onValueChange={(value) => updateReminderHours(index, value)}
              minimumTrackTintColor="#FF6B35"
              maximumTrackTintColor="#ddd"
            />
            <Button onPress={() => removeReminderHour(index)} textColor="#F44336" compact>
              Remove
            </Button>
          </View>
        ))}
        <Button mode="outlined" onPress={addReminderHour} style={styles.addButton} textColor="#FF6B35">
          + Add Reminder Time
        </Button>
      </AutomationCard>

      {/* AI Smart Suggestions */}
      <AutomationCard
        title="AI Smart Suggestions"
        icon="brain"
        description="AI-powered personalized recommendations"
      >
        <List.Item
          title="Enable AI Suggestions"
          description="Get personalized service recommendations based on your history"
          right={() => <Switch value={settings.aiSuggestions} onValueChange={() => toggleSetting('aiSuggestions')} trackColor={{ false: '#ccc', true: '#FF6B35' }} />}
        />
        <List.Item
          title="Auto Reschedule"
          description="Automatically suggest alternative slots when conflicts occur"
          right={() => <Switch value={settings.autoReschedule} onValueChange={() => toggleSetting('autoReschedule')} trackColor={{ false: '#ccc', true: '#FF6B35' }} />}
        />
        <Card style={styles.exampleCard}>
          <Card.Content>
            <Text style={styles.exampleTitle}>Example AI Suggestion:</Text>
            <Text style={styles.exampleText}>"You usually book a facial every month. Would you like to book your next session?"</Text>
          </Card.Content>
        </Card>
      </AutomationCard>

      {/* Custom Messages */}
      <AutomationCard
        title="Custom Messages"
        icon="message-text"
        description="Personalize your reminder messages"
      >
        <TextInput
          label="Reminder Message Template"
          value={settings.reminderMessage}
          onChangeText={(text) => setSettings({ ...settings, reminderMessage: text })}
          mode="outlined"
          multiline
          numberOfLines={3}
          style={styles.textArea}
          theme={{ colors: { primary: '#FF6B35' } }}
        />
        <Text style={styles.templateHint}>Available variables: {'{date}'}, {'{time}'}, {'{service}'}, {'{staff}'}</Text>
        <List.Item
          title="Promotional Messages"
          description="Send special offers and promotions"
          right={() => <Switch value={settings.promotionalMessages} onValueChange={() => toggleSetting('promotionalMessages')} trackColor={{ false: '#ccc', true: '#FF6B35' }} />}
        />
      </AutomationCard>

      {/* Save Button */}
      <Button
        mode="contained"
        onPress={() => showSnackbar('Settings saved successfully!')}
        style={styles.saveButton}
        buttonColor="#FF6B35"
      >
        Save All Settings
      </Button>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
        action={{ label: 'OK', onPress: () => setSnackbarVisible(false) }}
      >
        {snackbarMessage}
      </Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  card: {
    marginHorizontal: 15,
    marginBottom: 20,
    borderRadius: 15,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 15,
  },
  input: {
    marginTop: 10,
    backgroundColor: '#fff',
  },
  textArea: {
    marginTop: 10,
    backgroundColor: '#fff',
    minHeight: 80,
  },
  reminderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  reminderText: {
    width: 100,
    fontSize: 12,
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  addButton: {
    marginTop: 10,
    borderColor: '#FF6B35',
  },
  exampleCard: {
    marginTop: 10,
    backgroundColor: '#FFF9C4',
    borderRadius: 10,
  },
  exampleTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#F57F17',
  },
  exampleText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  templateHint: {
    fontSize: 10,
    color: '#999',
    marginTop: 5,
    fontStyle: 'italic',
  },
  saveButton: {
    marginHorizontal: 15,
    marginVertical: 20,
    marginBottom: 40,
    borderRadius: 25,
    paddingVertical: 8,
  },
});