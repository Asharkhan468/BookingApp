// src/components/Card.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, shadows } from '../theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated';
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = 'default',
  onPress,
}) => {
  const getShadow = () => {
    switch (variant) {
      case 'elevated':
        return shadows.md;
      default:
        return shadows.sm;
    }
  };

  return (
    <View
      style={[
        styles.card,
        getShadow(),
        { backgroundColor: colors.white },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: spacing.md,
    margin: spacing.md,
  },
});