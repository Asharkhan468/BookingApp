import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { OnboardingItem } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const onboardingData: OnboardingItem[] = [
  {
    id: '1',
    title: 'Easy Booking',
    description:
      'Book appointments with just a few taps. Choose from hundreds of services.',
    icon: 'calendar-check',
    color: '#FF6B35',
  },
  {
    id: '2',
    title: 'AI Assistant',
    description:
      'Get smart recommendations and instant answers from our AI assistant.',
    icon: 'robot',
    color: '#4A90E2',
  },
  {
    id: '3',
    title: 'Smart Reminders',
    description: 'Never miss an appointment with automated reminders.',
    icon: 'bell-ring',
    color: '#50C878',
  },
];

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Onboarding'>;
};

export default function OnboardingScreen({ navigation }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      setCurrentIndex(prev => prev + 1);
    } else {
      navigation.replace('Login');
    }
  };

  const handleSkip = () => {
    navigation.replace('Login');
  };

  const renderItem = ({ item }: { item: OnboardingItem }) => {
    return (
      <View style={styles.slide}>
        <LinearGradient
          colors={[item.color, item.color + 'CC']}
          style={styles.iconContainer}
        >
          <Icon name={item.icon} size={70} color="#fff" />
        </LinearGradient>

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  const renderDots = () => (
    <View style={styles.dotsWrapper}>
      <View style={styles.dotsContainer}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );

  return (
    // <View style={styles.container}>
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={event => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />

      {/* Dots */}
      {renderDots()}

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.leftArea}>
          {currentIndex < onboardingData.length - 1 && (
            <TouchableOpacity onPress={handleSkip}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleNext}
          style={styles.nextBtn}
        >
          <LinearGradient
            colors={['#FF6B35', '#FF8A5C']}
            style={styles.nextGradient}
          >
            <Text style={styles.nextText}>
              {currentIndex === onboardingData.length - 1
                ? 'Get Started'
                : 'Next'}
            </Text>
            <Icon name="arrow-right" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
}

/* ===================== STYLES ===================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  slide: {
    width,
    height: height - 160,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 8,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
    textAlign: 'center',
  },

  description: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 18,
  },

  /* DOTS */
  dotsWrapper: {
    alignItems: 'center',
    marginBottom: 18,
  },

  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 4,
  },

  activeDot: {
    width: 18,
    backgroundColor: '#FF6B35',
  },

  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,

    paddingBottom: Platform.OS === 'android' ? 35 : 25,
  },

  leftArea: {
    width: 70,
  },

  skipText: {
    fontSize: 15,
    color: '#9CA3AF',
    fontWeight: '600',
  },

  nextBtn: {
    borderRadius: 30,
    overflow: 'hidden',
  },

  nextGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 30,
  },

  nextText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
