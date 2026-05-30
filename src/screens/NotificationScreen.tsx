import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Card, Badge, ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { formatDistanceToNow } from 'date-fns';
import { Notification } from '../types';

export function NotificationsScreen(): any {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async (): Promise<void> => {
    await new Promise((resolve:any) => setTimeout(resolve, 1000));
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'Booking Confirmed',
        message: 'Your haircut appointment has been confirmed for tomorrow at 3:00 PM',
        type: 'booking',
        read: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        appointmentId: 'apt1',
      },
      {
        id: '2',
        title: 'Reminder',
        message: "Don't forget your facial appointment tomorrow at 11:00 AM",
        type: 'reminder',
        read: false,
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
        appointmentId: 'apt2',
      },
      {
        id: '3',
        title: 'Special Offer',
        message: 'Get 20% off on your next dental checkup!',
        type: 'promotion',
        read: true,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
    ];
    setNotifications(mockNotifications);
    setLoading(false);
  };

  const markAsRead = (id: string): void => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const getIcon = (type: string): string => {
    switch (type) {
      case 'booking': return 'calendar-check';
      case 'reminder': return 'bell-ring';
      case 'promotion': return 'gift';
      default: return 'bell';
    }
  };

  const getColor = (type: string): string => {
    switch (type) {
      case 'booking': return '#4CAF50';
      case 'reminder': return '#FF9800';
      case 'promotion': return '#E91E63';
      default: return '#999';
    }
  };

  const NotificationItem = ({ item }: { item: Notification }): any => (
    <TouchableOpacity onPress={() => markAsRead(item.id)}>
      <Card style={[styles.notificationCard, !item.read && styles.unreadCard]}>
        <Card.Content>
          <View style={styles.notificationHeader}>
            <View style={[styles.iconContainer, { backgroundColor: getColor(item.type) + '20' }]}>
              <Icon name={getIcon(item.type)} size={24} color={getColor(item.type)} />
            </View>
            <View style={styles.notificationContent}>
              <Text style={[styles.notificationTitle, !item.read && styles.unreadText]}>
                {item.title}
              </Text>
              <Text style={styles.notificationMessage}>{item.message}</Text>
              <Text style={styles.notificationTime}>
                {formatDistanceToNow(item.createdAt, { addSuffix: true })}
              </Text>
            </View>
            {!item.read && <Badge style={styles.unreadBadge} />}
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
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
      <LinearGradient colors={['#FF6B35', '#FF8C42']} style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <Text style={styles.headerSubtitle}>
          You have {notifications.filter(n => !n.read).length} unread notifications
        </Text>
      </LinearGradient>

      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationItem item={item} />}
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
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  listContainer: {
    padding: 15,
  },
  notificationCard: {
    marginBottom: 10,
    borderRadius: 12,
    elevation: 2,
  },
  unreadCard: {
    backgroundColor: '#FFF5F0',
    borderLeftWidth: 3,
    borderLeftColor: '#FF6B35',
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  unreadText: {
    color: '#FF6B35',
  },
  unreadBadge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#FF6B35',
  },
});