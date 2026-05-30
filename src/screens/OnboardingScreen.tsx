import React, { useState, useRef } from 'react';
import { View, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { OnboardingItem } from '../types';

const { width, height } = Dimensions.get('window');

const onboardingData: OnboardingItem[] = [
  {
    id: '1',
    title: 'Easy Booking',
    description: 'Book appointments with just a few taps. Choose from hundreds of services.',
    icon: 'calendar-check',
    color: '#FF6B35',
  },
  {
    id: '2',
    title: 'AI Assistant',
    description: 'Get smart recommendations and instant answers from our AI assistant.',
    icon: 'robot',
    color: '#4A90E2',
  },
  {
    id: '3',
    title: 'Smart Reminders',
    description: 'Never miss an appointment with automated WhatsApp reminders.',
    icon: 'bell-ring',
    color: '#50C878',
  },
];

type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

interface Props {
  navigation: OnboardingScreenNavigationProp;
}

export default function OnboardingScreen({ navigation }: Props): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList<OnboardingItem>>(null);

  const renderItem = ({ item }: { item: OnboardingItem }): JSX.Element => (
    <View style={styles.slide}>
      <LinearGradient
        colors={[item.color, item.color + 'CC']}
        style={styles.iconContainer}
      >
        <Icon name={item.icon} size={80} color="#fff" />
      </LinearGradient>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  const handleNext = (): void => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.replace('Login');
    }
  };

  const handleSkip = (): void => {
    navigation.replace('Login');
  };

  const renderDots = (): JSX.Element => {
    return (
      <View style={styles.dotsContainer}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: currentIndex === index ? '#FF6B35' : '#ccc', width: currentIndex === index ? 30 : 10 },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />
      
      {renderDots()}
      
      <View style={styles.buttonContainer}>
        {currentIndex < onboardingData.length - 1 && (
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
        <Button
          mode="contained"
          onPress={handleNext}
          style={styles.nextButton}
          labelStyle={styles.buttonLabel}
          buttonColor="#FF6B35"
        >
          {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    width: width,
    height: height - 150,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 50,
  },
  skipText: {
    fontSize: 16,
    color: '#999',
  },
  nextButton: {
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonLabel: {
    fontSize: 16,
    paddingVertical: 5,
  },
});

