// src/screens/GenerateTokenScreen.tsx
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { colors, spacing, typography, shadows } from '../theme';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { QueueContext } from '../contexts/QueueContext';

const departments = [
  { id: 'general', name: 'General', icon: '🏥', color: colors.primary },
  { id: 'emergency', name: 'Emergency', icon: '🚨', color: colors.danger },
  { id: 'billing', name: 'Billing', icon: '💰', color: colors.success },
  { id: 'pharmacy', name: 'Pharmacy', icon: '💊', color: colors.secondary },
];

export const GenerateTokenScreen = ({ navigation }: any) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { generateToken } = useContext(QueueContext);

  const handleGenerateToken = async () => {
    if (!selectedDepartment) {
      Alert.alert('Error', 'Please select a department');
      return;
    }

    setLoading(true);
    try {
      await generateToken(selectedDepartment);
      Alert.alert('Success', 'Token generated successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('Home') }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to generate token');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Generate Token</Text>
        <Text style={styles.subtitle}>Select a department to get your token</Text>
      </View>

      <View style={styles.departmentsContainer}>
        {departments.map((dept) => (
          <TouchableOpacity
            key={dept.id}
            onPress={() => setSelectedDepartment(dept.id)}
            activeOpacity={0.8}
          >
            <Card
              variant={selectedDepartment === dept.id ? 'elevated' : 'default'}
              style={[
                styles.departmentCard,
                selectedDepartment === dept.id && {
                  borderColor: dept.color,
                  borderWidth: 2,
                },
              ]}
            >
              <View style={[styles.departmentIcon, { backgroundColor: `${dept.color}15` }]}>
                <Text style={styles.iconText}>{dept.icon}</Text>
              </View>
              <Text style={styles.departmentName}>{dept.name}</Text>
              {selectedDepartment === dept.id && (
                <View style={[styles.selectedBadge, { backgroundColor: dept.color }]}>
                  <Text style={styles.selectedText}>✓ Selected</Text>
                </View>
              )}
            </Card>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>📋 How it works</Text>
        <Text style={styles.infoText}>1. Select your department</Text>
        <Text style={styles.infoText}>2. Generate your token</Text>
        <Text style={styles.infoText}>3. Track real-time queue status</Text>
        <Text style={styles.infoText}>4. Get notified when your turn arrives</Text>
      </View>

      <Button
        title={loading ? 'Generating...' : 'Generate Token'}
        onPress={handleGenerateToken}
        loading={loading}
        disabled={!selectedDepartment}
        size="large"
        style={styles.generateButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
  header: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    ...shadows.sm,
  },
  title: {
    ...typography.h2,
    color: colors.dark,
  },
  subtitle: {
    ...typography.body,
    color: colors.gray[500],
    marginTop: spacing.xs,
  },
  departmentsContainer: {
    padding: spacing.md,
  },
  departmentCard: {
    marginBottom: spacing.md,
    position: 'relative',
  },
  departmentIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconText: {
    fontSize: 30,
  },
  departmentName: {
    ...typography.h3,
    color: colors.dark,
    marginBottom: spacing.xs,
  },
  selectedBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
  },
  selectedText: {
    ...typography.small,
    color: colors.white,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: colors.primary + '10',
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: 16,
  },
  infoTitle: {
    ...typography.h3,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  infoText: {
    ...typography.body,
    color: colors.gray[700],
    marginBottom: spacing.sm,
  },
  generateButton: {
    margin: spacing.md,
    marginTop: 0,
  },
});