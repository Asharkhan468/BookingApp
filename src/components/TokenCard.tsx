// src/components/TokenCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from './Card';
import { colors, typography, spacing } from '../theme';

interface TokenCardProps {
  tokenNumber: string;
  estimatedTime?: number;
  status: 'waiting' | 'now-serving' | 'completed' | 'cancelled';
  department?: string;
}

export const TokenCard: React.FC<TokenCardProps> = ({
  tokenNumber,
  estimatedTime,
  status,
  department,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'now-serving':
        return colors.success;
      case 'waiting':
        return colors.warning;
      case 'completed':
        return colors.info;
      case 'cancelled':
        return colors.danger;
      default:
        return colors.gray[500];
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'now-serving':
        return 'Now Serving';
      case 'waiting':
        return 'Waiting';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  return (
    <Card variant="elevated">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.tokenLabel}>Token Number</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
            <Text style={styles.statusText}>{getStatusText()}</Text>
          </View>
        </View>
        
        <Text style={styles.tokenNumber}>{tokenNumber}</Text>
        
        {department && (
          <Text style={styles.department}>{department}</Text>
        )}
        
        {estimatedTime && status === 'waiting' && (
          <View style={styles.timeContainer}>
            <Text style={styles.timeLabel}>Estimated Wait Time</Text>
            <Text style={styles.timeValue}>{estimatedTime} mins</Text>
          </View>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tokenLabel: {
    ...typography.caption,
    color: colors.gray[600],
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
  },
  statusText: {
    ...typography.small,
    color: colors.white,
    fontWeight: '600',
  },
  tokenNumber: {
    ...typography.h1,
    color: colors.dark,
    letterSpacing: 2,
  },
  department: {
    ...typography.body,
    color: colors.gray[600],
  },
  timeContainer: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
  timeLabel: {
    ...typography.small,
    color: colors.gray[500],
  },
  timeValue: {
    ...typography.h3,
    color: colors.primary,
    marginTop: spacing.xs,
  },
});