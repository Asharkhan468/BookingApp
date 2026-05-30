import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Text, Card, Searchbar, Chip, ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { UserTabParamList, RootStackParamList } from '../../App';
import { Service } from '../types';

type ServicesScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<UserTabParamList, 'Services'>,
  StackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: ServicesScreenNavigationProp;
}

const servicesData: Service[] = [
  {
    id: 1,
    name: 'Haircut',
    category: 'Beauty',
    price: 30,
    duration: 45,
    rating: 4.8,
    reviews: 234,
    icon: 'content-cut',
    color: '#FF6B35',
    description: 'Professional haircut by expert stylists',
  },
  {
    id: 2,
    name: 'Facial',
    category: 'Beauty',
    price: 50,
    duration: 60,
    rating: 4.9,
    reviews: 189,
    icon: 'face-woman',
    color: '#E91E63',
    description: 'Revitalizing facial treatment',
  },
  {
    id: 3,
    name: 'Dental Checkup',
    category: 'Medical',
    price: 80,
    duration: 30,
    rating: 4.7,
    reviews: 156,
    icon: 'tooth',
    color: '#2196F3',
    description: 'Complete dental examination',
  },
  {
    id: 4,
    name: 'Consultation',
    category: 'Medical',
    price: 60,
    duration: 45,
    rating: 4.6,
    reviews: 312,
    icon: 'stethoscope',
    color: '#4CAF50',
    description: 'General health consultation',
  },
  {
    id: 5,
    name: 'Manicure',
    category: 'Beauty',
    price: 25,
    duration: 30,
    rating: 4.8,
    reviews: 178,
    icon: 'nail',
    color: '#FF9800',
    description: 'Professional nail care',
  },
  {
    id: 6,
    name: 'Pedicure',
    category: 'Beauty',
    price: 35,
    duration: 45,
    rating: 4.7,
    reviews: 145,
    icon: 'foot-print',
    color: '#9C27B0',
    description: 'Complete foot care treatment',
  },
];

const categories: string[] = ['All', 'Beauty', 'Medical', 'Wellness'];

export default function ServicesScreen({ navigation }: Props): any {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filteredServices, setFilteredServices] = useState<Service[]>(servicesData);
  const [loading, setLoading] = useState<boolean>(false);

  const filterServices = (query: string, category: string): void => {
    let filtered: Service[] = servicesData;
    
    if (category !== 'All') {
      filtered = filtered.filter(service => service.category === category);
    }
    
    if (query) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    setFilteredServices(filtered);
  };

  const handleSearch = (query: string): void => {
    setSearchQuery(query);
    filterServices(query, selectedCategory);
  };

  const handleCategorySelect = (category: string): void => {
    setSelectedCategory(category);
    filterServices(searchQuery, category);
  };

  const ServiceCard = ({ service }: { service: Service }):any => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Booking', { service })}
      activeOpacity={0.9}
    >
      <Card style={styles.serviceCard}>
        <LinearGradient
          colors={[service.color, service.color + 'CC']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.cardGradient}
        >
          <Card.Content>
            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <Icon name={service.icon} size={40} color="#fff" />
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
                <View style={styles.detailsRow}>
                  <View style={styles.detailItem}>
                    <Icon name="clock-outline" size={14} color="#fff" />
                    <Text style={styles.detailText}>{service.duration} min</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Icon name="star" size={14} color="#FFD700" />
                    <Text style={styles.detailText}>{service.rating} ({service.reviews})</Text>
                  </View>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>${service.price}</Text>
                  <TouchableOpacity style={styles.bookButton}>
                    <Text style={styles.bookButtonText}>Book Now</Text>
                    <Icon name="arrow-right" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Card.Content>
        </LinearGradient>
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
        <Text style={styles.headerTitle}>Our Services</Text>
        <Text style={styles.headerSubtitle}>Choose from our premium services</Text>
        <Searchbar
          placeholder="Search services..."
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchBar}
          iconColor="#FF6B35"
          inputStyle={styles.searchInput}
        />
      </LinearGradient>

      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <Chip
              key={category}
              selected={selectedCategory === category}
              onPress={() => handleCategorySelect(category)}
              style={styles.categoryChip}
              selectedColor="#FF6B35"
              showSelectedOverlay
            >
              {category}
            </Chip>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredServices}
        renderItem={({ item }) => <ServiceCard service={item} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.servicesList}
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
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
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
    marginBottom: 15,
  },
  searchBar: {
    borderRadius: 15,
    elevation: 3,
    backgroundColor: '#fff',
  },
  searchInput: {
    fontSize: 14,
  },
  categoriesContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoryChip: {
    marginRight: 10,
    backgroundColor: '#f5f5f5',
  },
  servicesList: {
    padding: 15,
  },
  serviceCard: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
  },
  cardGradient: {
    padding: 5,
  },
  cardContent: {
    flexDirection: 'row',
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  detailText: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  bookButtonText: {
    color: '#fff',
    marginRight: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
});