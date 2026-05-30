// // import React, { useState, useEffect } from 'react';
// // import { View, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
// // import { Text, Card, Avatar, Badge, FAB, ActivityIndicator } from 'react-native-paper';
// // import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// // import LinearGradient from 'react-native-linear-gradient';
// // import { format } from 'date-fns';
// // import { StackNavigationProp } from '@react-navigation/stack';
// // import { CompositeNavigationProp } from '@react-navigation/native';
// // import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
// // import { UserTabParamList, RootStackParamList } from '../../App';
// // import { Appointment, Service } from '../types';

// // type HomeScreenNavigationProp = CompositeNavigationProp<
// //   BottomTabNavigationProp<UserTabParamList, 'Home'>,
// //   StackNavigationProp<RootStackParamList>
// // >;

// // interface Props {
// //   navigation: HomeScreenNavigationProp;
// // }

// // interface QuickActionProps {
// //   icon: string;
// //   title: string;
// //   color: string;
// //   onPress: () => void;
// // }

// // const QuickActionCard: React.FC<QuickActionProps> = ({ icon, title, color, onPress }) => (
// //   <TouchableOpacity style={styles.quickActionCard} onPress={onPress}>
// //     <LinearGradient colors={[color, color + 'CC']} style={styles.quickActionGradient}>
// //       <Icon name={icon} size={32} color="#fff" />
// //       <Text style={styles.quickActionText}>{title}</Text>
// //     </LinearGradient>
// //   </TouchableOpacity>
// // );

// // export function HomeDashboard({ navigation }: any): any {
// //   const [refreshing, setRefreshing] = useState<boolean>(false);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([
// //     {
// //       id: '1',
// //       userId: 'user1',
// //       serviceId: 1,
// //       serviceName: 'Haircut',
// //       date: new Date('2024-01-20'),
// //       time: '3:00 PM',
// //       staff: 'John Doe',
// //       status: 'confirmed',
// //       price: 30,
// //       createdAt: new Date(),
// //       reminderSent: false,
// //     },
// //     {
// //       id: '2',
// //       userId: 'user1',
// //       serviceId: 2,
// //       serviceName: 'Facial',
// //       date: new Date('2024-01-22'),
// //       time: '11:00 AM',
// //       staff: 'Sarah Smith',
// //       status: 'pending',
// //       price: 50,
// //       createdAt: new Date(),
// //       reminderSent: false,
// //     },
// //   ]);

// //   const [featuredDoctors] = useState([
// //     { id: 1, name: 'Dr. Emily Chen', specialty: 'Dentist', rating: 4.9, image: '👩‍⚕️' },
// //     { id: 2, name: 'Dr. Michael Lee', specialty: 'Dermatologist', rating: 4.8, image: '👨‍⚕️' },
// //     { id: 3, name: 'Sarah Johnson', specialty: 'Hair Stylist', rating: 4.9, image: '💇‍♀️' },
// //   ]);

// //   const [notifications] = useState<number>(3);

// //   useEffect(() => {
// //     setTimeout(() => setLoading(false), 1000);
// //   }, []);

// //   const onRefresh = async (): Promise<void> => {
// //     setRefreshing(true);
// //     await new Promise((resolve:any) => setTimeout(resolve, 2000));
// //     setRefreshing(false);
// //   };

// //   if (loading) {
// //     return (
// //       <View style={styles.loadingContainer}>
// //         <ActivityIndicator size="large" color="#FF6B35" />
// //       </View>
// //     );
// //   }

// //   return (
// //     <View style={styles.container}>
// //       <LinearGradient colors={['#FF6B35', '#FF8C42']} style={styles.header}>
// //         <View style={styles.headerTop}>
// //           <View>
// //             <Text style={styles.welcomeText}>Welcome back,</Text>
// //             <Text style={styles.userName}>John Doe!</Text>
// //           </View>
// //           <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
// //             {notifications > 0 && (
// //               <Badge style={styles.notificationBadge}>{notifications}</Badge>
// //             )}
// //             <Icon name="bell" size={28} color="#fff" />
// //           </TouchableOpacity>
// //         </View>
// //         {/* <SearchBar
// //           placeholder="Search services or doctors..."
// //           style={styles.searchBar}
// //           iconColor="#FF6B35"
// //           onPress={() => navigation.navigate('Services')}
// //         /> */}
// //       </LinearGradient>

// //       <ScrollView
// //         showsVerticalScrollIndicator={false}
// //         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
// //       >
// //         {/* Quick Actions */}
// //         <View style={styles.quickActions}>
// //           <QuickActionCard
// //             icon="calendar-plus"
// //             title="Quick Book"
// //             color="#FF6B35"
// //             onPress={() => navigation.navigate('Booking')}
// //           />
// //           <QuickActionCard
// //             icon="robot"
// //             title="AI Assistant"
// //             color="#4A90E2"
// //             onPress={() => navigation.navigate('AI')}
// //           />
// //           <QuickActionCard
// //             icon="clock-outline"
// //             title="Reminders"
// //             color="#50C878"
// //             onPress={() => navigation.navigate('Calendar')}
// //           />
// //         </View>

// //         {/* Upcoming Appointments */}
// //         <View style={styles.section}>
// //           <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
// //           {upcomingAppointments.map((item) => (
// //             <Card key={item.id} style={styles.appointmentCard}>
// //               <Card.Content>
// //                 <View style={styles.appointmentHeader}>
// //                   <Icon name="calendar-check" size={24} color="#FF6B35" />
// //                   <Text style={styles.appointmentService}>{item.serviceName}</Text>
// //                   <Badge style={[styles.statusBadge, item.status === 'confirmed' ? styles.confirmedBadge : styles.pendingBadge]}>
// //                     {item.status}
// //                   </Badge>
// //                 </View>
// //                 <View style={styles.appointmentDetails}>
// //                   <View style={styles.detailRow}>
// //                     <Icon name="calendar" size={16} color="#666" />
// //                     <Text style={styles.detailText}>{format(item.date, 'MMM dd, yyyy')}</Text>
// //                   </View>
// //                   <View style={styles.detailRow}>
// //                     <Icon name="clock-outline" size={16} color="#666" />
// //                     <Text style={styles.detailText}>{item.time}</Text>
// //                   </View>
// //                   <View style={styles.detailRow}>
// //                     <Icon name="account" size={16} color="#666" />
// //                     <Text style={styles.detailText}>{item.staff}</Text>
// //                   </View>
// //                 </View>
// //               </Card.Content>
// //             </Card>
// //           ))}
// //         </View>

// //         {/* Featured Professionals */}
// //         <View style={styles.section}>
// //           <Text style={styles.sectionTitle}>Featured Professionals</Text>
// //           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
// //             {featuredDoctors.map((doctor) => (
// //               <Card key={doctor.id} style={styles.doctorCard}>
// //                 <Card.Content>
// //                   <Text style={styles.doctorEmoji}>{doctor.image}</Text>
// //                   <Text style={styles.doctorName}>{doctor.name}</Text>
// //                   <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
// //                   <View style={styles.ratingContainer}>
// //                     <Icon name="star" size={16} color="#FFD700" />
// //                     <Text style={styles.ratingText}>{doctor.rating}</Text>
// //                   </View>
// //                 </Card.Content>
// //               </Card>
// //             ))}
// //           </ScrollView>
// //         </View>
// //       </ScrollView>

// //       <FAB
// //         style={styles.fab}
// //         icon="robot-assistant"
// //         color="#fff"
// //         onPress={() => navigation.navigate('AI')}
// //       />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: '#f5f5f5' },
// //   loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
// //   header: { paddingTop: 50, paddingHorizontal: 20, paddingBottom: 20, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
// //   headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
// //   welcomeText: { fontSize: 14, color: '#fff', opacity: 0.9 },
// //   userName: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
// //   notificationBadge: { position: 'absolute', right: -8, top: -5, backgroundColor: '#FF4444', zIndex: 1 },
// //   searchBar: { marginTop: 10, elevation: 3, borderRadius: 15 },
// //   quickActions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: -30, marginHorizontal: 20 },
// //   quickActionCard: { width: 100, height: 100, borderRadius: 20, overflow: 'hidden', elevation: 5 },
// //   quickActionGradient: { flex: 1, justifyContent: 'center', alignItems: 'center' },
// //   quickActionText: { color: '#fff', marginTop: 8, fontWeight: 'bold', fontSize: 12 },
// //   section: { marginTop: 20, paddingHorizontal: 20 },
// //   sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' },
// //   appointmentCard: { marginBottom: 10, borderRadius: 15, elevation: 2 },
// //   appointmentHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
// //   appointmentService: { flex: 1, fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
// //   statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 },
// //   confirmedBadge: { backgroundColor: '#4CAF50' },
// //   pendingBadge: { backgroundColor: '#FF9800' },
// //   appointmentDetails: { marginLeft: 30 },
// //   detailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
// //   detailText: { marginLeft: 10, color: '#666', fontSize: 14 },
// //   doctorCard: { width: 150, marginRight: 15, alignItems: 'center', borderRadius: 15 },
// //   doctorEmoji: { fontSize: 48, textAlign: 'center' },
// //   doctorName: { fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginTop: 5 },
// //   doctorSpecialty: { fontSize: 12, color: '#666', textAlign: 'center' },
// //   ratingContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5 },
// //   ratingText: { marginLeft: 5, fontSize: 12, color: '#666' },
// //   fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#FF6B35' },
// // });

// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Dimensions, Animated, Platform } from 'react-native';
// import { Text, Card, Avatar, Badge, FAB, ActivityIndicator, Divider, Chip, Button } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import LinearGradient from 'react-native-linear-gradient';
// import { format, formatDistanceToNow } from 'date-fns';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { CompositeNavigationProp } from '@react-navigation/native';
// import { BottomTabNavigationProp, useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
// import { UserTabParamList, RootStackParamList } from '../../App';
// import { Appointment, Service } from '../types';

// const { width, height } = Dimensions.get('window');

// type HomeScreenNavigationProp = CompositeNavigationProp<
//   BottomTabNavigationProp<UserTabParamList, 'Home'>,
//   StackNavigationProp<RootStackParamList>
// >;

// interface Props {
//   navigation: HomeScreenNavigationProp;
// }

// interface QuickActionProps {
//   icon: string;
//   title: string;
//   color: string;
//   onPress: () => void;
//   gradientColors: string[];
// }

// const QuickActionCard: React.FC<QuickActionProps> = ({ icon, title, onPress, gradientColors }) => (
//   <TouchableOpacity style={styles.quickActionCard} onPress={onPress} activeOpacity={0.9}>
//     <LinearGradient colors={gradientColors} style={styles.quickActionGradient}>
//       <View style={styles.quickActionIconContainer}>
//         <Icon name={icon} size={36} color="#fff" />
//       </View>
//       <Text style={styles.quickActionText}>{title}</Text>
//     </LinearGradient>
//   </TouchableOpacity>
// );

// interface StatCardProps {
//   value: string;
//   label: string;
//   icon: string;
//   color: string;
//   trend?: number;
// }

// const StatCard: React.FC<StatCardProps> = ({ value, label, icon, color, trend }) => (
//   <Card style={styles.statCard}>
//     <LinearGradient
//       colors={[color + '15', color + '05']}
//       style={styles.statCardGradient}
//     >
//       <Card.Content style={styles.statCardContent}>
//         <View style={[styles.statIconContainer, { backgroundColor: color + '20' }]}>
//           <Icon name={icon} size={24} color={color} />
//         </View>
//         <Text style={[styles.statValue, { color }]}>{value}</Text>
//         <Text style={styles.statLabel}>{label}</Text>
//         {trend && (
//           <View style={styles.statTrend}>
//             <Icon name={trend > 0 ? 'arrow-up' : 'arrow-down'} size={12} color={trend > 0 ? '#4CAF50' : '#F44336'} />
//             <Text style={[styles.statTrendText, { color: trend > 0 ? '#4CAF50' : '#F44336' }]}>
//               {Math.abs(trend)}% from last month
//             </Text>
//           </View>
//         )}
//       </Card.Content>
//     </LinearGradient>
//   </Card>
// );

// export function HomeDashboard({ navigation }: Props):any {
//   // Move hook inside component
//   const tabBarHeight = useBottomTabBarHeight();

//   const [refreshing, setRefreshing] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [greeting, setGreeting] = useState<string>('');
//   const [animatedValue] = useState(new Animated.Value(0));

//   const [upcomingAppointments, setUpcomingAppointments] = useState<any[]>([
//     {
//       id: '1',
//       serviceName: 'Premium Haircut',
//       date: new Date(Date.now() + 2 * 60 * 60 * 1000),
//       time: '3:00 PM',
//       staff: 'John Doe',
//       status: 'confirmed',
//       price: 30,
//       image: '✂️',
//     },
//     {
//       id: '2',
//       serviceName: 'Gold Facial Treatment',
//       date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
//       time: '11:00 AM',
//       staff: 'Sarah Smith',
//       status: 'pending',
//       price: 50,
//       image: '💆‍♀️',
//     },
//   ]);

//   const [stats] = useState({
//     totalAppointments: 24,
//     totalSpent: 580,
//     loyaltyPoints: 1250,
//   });

//   const [featuredDoctors] = useState([
//     { id: 1, name: 'Dr. Emily Chen', specialty: 'Dentist', rating: 4.9, reviews: 234, image: '👩‍⚕️', available: true },
//     { id: 2, name: 'Dr. Michael Lee', specialty: 'Dermatologist', rating: 4.8, reviews: 189, image: '👨‍⚕️', available: false },
//     { id: 3, name: 'Sarah Johnson', specialty: 'Hair Stylist', rating: 4.9, reviews: 456, image: '💇‍♀️', available: true },
//     { id: 4, name: 'Dr. James', specialty: 'Orthodontist', rating: 4.7, reviews: 167, image: '👨‍⚕️', available: true },
//   ]);

//   const [recommendations] = useState([
//     { id: 1, title: 'Summer Special', subtitle: '20% off on all facials', color: '#FF6B35', icon: 'sun-thermometer' },
//     { id: 2, title: 'Family Package', subtitle: 'Book 3+ services get 15% off', color: '#4CAF50', icon: 'account-group' },
//     { id: 3, title: 'Loyalty Reward', subtitle: 'You have 1250 points', color: '#FFC107', icon: 'star-circle' },
//   ]);

//   useEffect(() => {
//     setGreeting(getGreeting());
//     animateContent();
//     setTimeout(() => setLoading(false), 1000);
//   }, []);

//   const getGreeting = (): string => {
//     const hour = new Date().getHours();
//     if (hour < 12) return 'Good Morning';
//     if (hour < 17) return 'Good Afternoon';
//     return 'Good Evening';
//   };

//   const animateContent = () => {
//     Animated.spring(animatedValue, {
//       toValue: 1,
//       friction: 3,
//       useNativeDriver: true,
//     }).start();
//   };

//   const onRefresh = async (): Promise<void> => {
//     setRefreshing(true);
//     await new Promise((resolve:any) => setTimeout(resolve, 2000));
//     setRefreshing(false);
//   };

//   const getTimeRemaining = (appointmentDate: Date): string => {
//     return formatDistanceToNow(appointmentDate, { addSuffix: true });
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#FF6B35" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <ScrollView
//         contentContainerStyle={{
//           paddingBottom: tabBarHeight + 20, // Add this
//         }}
//       >
//         <Animated.View style={{ transform: [{ translateY: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [-50, 0] }) }] }}>
//           <LinearGradient colors={['#FF6B35', '#FF8C42', '#FFA559']} style={styles.header}>
//             <View style={styles.headerTop}>
//               <View>
//                 <Text style={styles.greetingText}>{greeting}!</Text>
//                 <Text style={styles.userName}>John Doe</Text>
//                 <View style={styles.loyaltyBadge}>
//                   <Icon name="star" size={14} color="#FFD700" />
//                   <Text style={styles.loyaltyText}>{stats.loyaltyPoints} Loyalty Points</Text>
//                 </View>
//               </View>
//               <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={styles.notificationButton}>
//                 <Badge style={styles.notificationBadge}>3</Badge>
//                 <Icon name="bell" size={28} color="#fff" />
//               </TouchableOpacity>
//             </View>

//             {/* Search Bar */}
//             <TouchableOpacity style={styles.searchBarContainer} onPress={() => navigation.navigate('Services')}>
//               <Icon name="magnify" size={20} color="#999" />
//               <Text style={styles.searchPlaceholder}>Search services or doctors...</Text>
//               <Icon name="microphone" size={20} color="#FF6B35" />
//             </TouchableOpacity>
//           </LinearGradient>
//         </Animated.View>

//         {/* Stats Section */}
//         <Animated.View style={[styles.statsContainer, { opacity: animatedValue }]}>
//           <StatCard value={`${stats.totalAppointments}`} label="Bookings" icon="calendar-check" color="#FF6B35" trend={12} />
//           <StatCard value={`$${stats.totalSpent}`} label="Total Spent" icon="currency-usd" color="#4CAF50" trend={8} />
//           <StatCard value={`${stats.loyaltyPoints}`} label="Points" icon="star" color="#FFC107" trend={5} />
//         </Animated.View>

//         {/* Quick Actions */}
//         <View style={styles.quickActionsSection}>
//           <Text style={styles.sectionTitle}>Quick Actions</Text>
//           <View style={styles.quickActions}>
//             <QuickActionCard
//               icon="calendar-plus"
//               title="Quick Book"
//               color="#FF6B35"
//               gradientColors={['#FF6B35', '#FF8C42']}
//               onPress={() => navigation.navigate('Booking')}
//             />
//             <QuickActionCard
//               icon="robot"
//               title="AI Assistant"
//               color="#4A90E2"
//               gradientColors={['#4A90E2', '#5BA3F5']}
//               onPress={() => navigation.navigate('AI')}
//             />
//             <QuickActionCard
//               icon="clock-outline"
//               title="Reminders"
//               color="#50C878"
//               gradientColors={['#50C878', '#6DDB8C']}
//               onPress={() => navigation.navigate('Calendar')}
//             />
//           </View>
//         </View>

//         {/* Upcoming Appointments */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
//             <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
//               <Text style={styles.seeAllText}>See All</Text>
//             </TouchableOpacity>
//           </View>

//           {upcomingAppointments.length === 0 ? (
//             <Card style={styles.emptyCard}>
//               <Card.Content style={styles.emptyContent}>
//                 <Icon name="calendar-blank" size={60} color="#ccc" />
//                 <Text style={styles.emptyText}>No upcoming appointments</Text>
//                 <Button mode="contained" onPress={() => navigation.navigate('Booking')} buttonColor="#FF6B35" style={styles.emptyButton}>
//                   Book Now
//                 </Button>
//               </Card.Content>
//             </Card>
//           ) : (
//             upcomingAppointments.map((item) => (
//               <Animated.View key={item.id} style={{ opacity: animatedValue, transform: [{ translateX: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) }] }}>
//                 <Card style={styles.appointmentCard}>
//                   <LinearGradient
//                     colors={item.status === 'confirmed' ? ['#fff', '#fff'] : ['#FFF5F0', '#FFF']}
//                     style={styles.appointmentCardGradient}
//                   >
//                     <Card.Content>
//                       <View style={styles.appointmentHeader}>
//                         <View style={styles.serviceIconContainer}>
//                           <Icon name={item.serviceName === 'Premium Haircut' ? 'content-cut' : 'face-woman'} size={24} color="#FF6B35" />
//                         </View>
//                         <View style={styles.appointmentInfo}>
//                           <Text style={styles.appointmentService}>{item.serviceName}</Text>
//                           <Text style={styles.appointmentTime}>
//                             {format(item.date, 'EEE, MMM dd')} • {item.time}
//                           </Text>
//                         </View>
//                         <View style={[styles.statusBadge, item.status === 'confirmed' ? styles.confirmedBadge : styles.pendingBadge]}>
//                           <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
//                         </View>
//                       </View>

//                       <Divider style={styles.divider} />

//                       <View style={styles.appointmentFooter}>
//                         <View style={styles.staffInfo}>
//                           <Icon name="account-circle" size={20} color="#999" />
//                           <Text style={styles.staffName}>{item.staff}</Text>
//                         </View>
//                         <View style={styles.priceInfo}>
//                           <Text style={styles.priceLabel}>Total:</Text>
//                           <Text style={styles.priceValue}>${item.price}</Text>
//                         </View>
//                       </View>

//                       {item.status === 'confirmed' && (
//                         <View style={styles.reminderBadge}>
//                           <Icon name="bell-ring" size={12} color="#FF6B35" />
//                           <Text style={styles.reminderText}>Starts {getTimeRemaining(item.date)}</Text>
//                         </View>
//                       )}
//                     </Card.Content>
//                   </LinearGradient>
//                 </Card>
//               </Animated.View>
//             ))
//           )}
//         </View>

//         {/* Special Offers */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Special Offers</Text>
//             <TouchableOpacity>
//               <Text style={styles.seeAllText}>View All</Text>
//             </TouchableOpacity>
//           </View>
//           <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.offersScroll}>
//             {recommendations.map((offer) => (
//               <TouchableOpacity key={offer.id} activeOpacity={0.9}>
//                 <Card style={styles.offerCard}>
//                   <LinearGradient colors={[offer.color, offer.color + 'DD']} style={styles.offerGradient}>
//                     <Card.Content>
//                       <Icon name={offer.icon} size={32} color="#fff" />
//                       <Text style={styles.offerTitle}>{offer.title}</Text>
//                       <Text style={styles.offerSubtitle}>{offer.subtitle}</Text>
//                       <Chip style={styles.offerChip} textStyle={{ color: offer.color, fontSize: 10 }}>
//                         Claim Now →
//                       </Chip>
//                     </Card.Content>
//                   </LinearGradient>
//                 </Card>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>

//         {/* Featured Professionals */}
//         <View style={[styles.section, styles.lastSection]}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Featured Professionals</Text>
//             <TouchableOpacity>
//               <Text style={styles.seeAllText}>View All</Text>
//             </TouchableOpacity>
//           </View>
//           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//             {featuredDoctors.map((doctor) => (
//               <TouchableOpacity key={doctor.id} activeOpacity={0.9}>
//                 <Card style={styles.doctorCard}>
//                   <Card.Content style={styles.doctorCardContent}>
//                     <View style={styles.doctorImageContainer}>
//                       <Text style={styles.doctorEmoji}>{doctor.image}</Text>
//                       {doctor.available && <View style={styles.availableBadge} />}
//                     </View>
//                     <Text style={styles.doctorName}>{doctor.name}</Text>
//                     <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
//                     <View style={styles.ratingContainer}>
//                       <Icon name="star" size={14} color="#FFD700" />
//                       <Text style={styles.ratingText}>{doctor.rating}</Text>
//                       <Text style={styles.reviewsText}>({doctor.reviews})</Text>
//                     </View>
//                     <Button mode="outlined" onPress={() => navigation.navigate('Booking')} style={styles.bookDoctorButton} textColor="#FF6B35" compact>
//                       Book
//                     </Button>
//                   </Card.Content>
//                 </Card>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>
//       </ScrollView>

//       <FAB
//         style={styles.fab}
//         icon="robot"
//         color="#fff"
//         onPress={() => navigation.navigate('AI')}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8F9FA'
//   },
//   scrollContent: {
//     flexGrow: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F8F9FA'
//   },
//   header: {
//     paddingTop: Platform.OS === 'ios' ? 60 : 50,
//     paddingHorizontal: 20,
//     paddingBottom: 30,
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//   },
//   headerTop: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 20
//   },
//   greetingText: {
//     fontSize: 14,
//     color: '#fff',
//     opacity: 0.9,
//     marginBottom: 4,
//   },
//   userName: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 8,
//   },
//   loyaltyBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 20,
//     alignSelf: 'flex-start',
//   },
//   loyaltyText: {
//     fontSize: 11,
//     color: '#fff',
//     marginLeft: 5,
//   },
//   notificationButton: {
//     position: 'relative',
//   },
//   notificationBadge: {
//     position: 'absolute',
//     right: -8,
//     top: -5,
//     backgroundColor: '#FF4444',
//     zIndex: 1,
//     fontSize: 10,
//   },
//   searchBarContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 25,
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     marginTop: 10,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   searchPlaceholder: {
//     flex: 1,
//     color: '#999',
//     fontSize: 14,
//     marginLeft: 10,
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 15,
//     marginTop: -25,
//     marginBottom: 20,
//   },
//   statCard: {
//     flex: 1,
//     marginHorizontal: 5,
//     borderRadius: 15,
//     elevation: 3,
//     overflow: 'hidden',
//   },
//   statCardGradient: {
//     borderRadius: 15,
//   },
//   statCardContent: {
//     alignItems: 'center',
//     paddingVertical: 12,
//   },
//   statIconContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   statValue: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 2,
//   },
//   statLabel: {
//     fontSize: 11,
//     color: '#666',
//     marginBottom: 4,
//   },
//   statTrend: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   statTrendText: {
//     fontSize: 9,
//     marginLeft: 2,
//   },
//   quickActionsSection: {
//     paddingHorizontal: 20,
//     marginBottom: 20,
//   },
//   quickActions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   quickActionCard: {
//     width: (width - 60) / 3,
//     height: 110,
//     borderRadius: 20,
//     overflow: 'hidden',
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//   },
//   quickActionGradient: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   quickActionIconContainer: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   quickActionText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 12
//   },
//   section: {
//     marginTop: 20,
//     paddingHorizontal: 20
//   },
//   lastSection: {
//     marginBottom: 20,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333'
//   },
//   seeAllText: {
//     fontSize: 12,
//     color: '#FF6B35',
//     fontWeight: '500',
//   },
//   emptyCard: {
//     borderRadius: 15,
//     elevation: 2,
//   },
//   emptyContent: {
//     alignItems: 'center',
//     paddingVertical: 30,
//   },
//   emptyText: {
//     fontSize: 14,
//     color: '#999',
//     marginTop: 10,
//     marginBottom: 15,
//   },
//   emptyButton: {
//     borderRadius: 20,
//     paddingHorizontal: 20,
//   },
//   appointmentCard: {
//     marginBottom: 12,
//     borderRadius: 15,
//     elevation: 2,
//     overflow: 'hidden',
//   },
//   appointmentCardGradient: {
//     borderRadius: 15,
//   },
//   appointmentHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10
//   },
//   serviceIconContainer: {
//     width: 45,
//     height: 45,
//     borderRadius: 25,
//     backgroundColor: '#FFF5F0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   appointmentInfo: {
//     flex: 1,
//   },
//   appointmentService: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 2,
//   },
//   appointmentTime: {
//     fontSize: 12,
//     color: '#666',
//   },
//   statusBadge: {
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   confirmedBadge: {
//     backgroundColor: '#E8F5E9',
//   },
//   pendingBadge: {
//     backgroundColor: '#FFF3E0',
//   },
//   statusText: {
//     fontSize: 10,
//     fontWeight: 'bold',
//     color: '#4CAF50',
//   },
//   divider: {
//     marginVertical: 12,
//   },
//   appointmentFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   staffInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   staffName: {
//     fontSize: 12,
//     color: '#666',
//     marginLeft: 5,
//   },
//   priceInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   priceLabel: {
//     fontSize: 11,
//     color: '#999',
//     marginRight: 4,
//   },
//   priceValue: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#FF6B35',
//   },
//   reminderBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFF5F0',
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 12,
//     marginTop: 10,
//     alignSelf: 'flex-start',
//   },
//   reminderText: {
//     fontSize: 10,
//     color: '#FF6B35',
//     marginLeft: 4,
//   },
//   offersScroll: {
//     marginTop: 5,
//   },
//   offerCard: {
//     width: 180,
//     marginRight: 15,
//     borderRadius: 15,
//     overflow: 'hidden',
//     elevation: 3,
//   },
//   offerGradient: {
//     padding: 15,
//   },
//   offerTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginTop: 10,
//     marginBottom: 5,
//   },
//   offerSubtitle: {
//     fontSize: 11,
//     color: '#fff',
//     opacity: 0.9,
//     marginBottom: 10,
//   },
//   offerChip: {
//     backgroundColor: '#fff',
//     alignSelf: 'flex-start',
//     height: 28,
//   },
//   doctorCard: {
//     width: 140,
//     marginRight: 15,
//     alignItems: 'center',
//     borderRadius: 15,
//     elevation: 2,
//   },
//   doctorCardContent: {
//     alignItems: 'center',
//     paddingVertical: 15,
//   },
//   doctorImageContainer: {
//     position: 'relative',
//     marginBottom: 10,
//   },
//   doctorEmoji: {
//     fontSize: 60,
//     textAlign: 'center'
//   },
//   availableBadge: {
//     position: 'absolute',
//     bottom: 0,
//     right: 0,
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     backgroundColor: '#4CAF50',
//     borderWidth: 2,
//     borderColor: '#fff',
//   },
//   doctorName: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginTop: 5,
//     color: '#333',
//   },
//   doctorSpecialty: {
//     fontSize: 11,
//     color: '#666',
//     textAlign: 'center',
//     marginTop: 2,
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 6,
//     marginBottom: 10,
//   },
//   ratingText: {
//     marginLeft: 4,
//     fontSize: 12,
//     color: '#666',
//     fontWeight: '500',
//   },
//   reviewsText: {
//     fontSize: 10,
//     color: '#999',
//     marginLeft: 2,
//   },
//   bookDoctorButton: {
//     marginTop: 5,
//     borderRadius: 20,
//     borderColor: '#FF6B35',
//   },
//   fab: {
//     position: 'absolute',
//     right: 20,
//     bottom: 20,
//     backgroundColor: '#FF6B35',
//     elevation: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//   },
// });
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import {
  Text,
  Card,
  Avatar,
  Badge,
  FAB,
  ActivityIndicator,
  Divider,
  Chip,
  Button,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { format, formatDistanceToNow } from 'date-fns';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import {
  BottomTabNavigationProp,
  useBottomTabBarHeight,
} from '@react-navigation/bottom-tabs';
import { UserTabParamList, RootStackParamList } from '../../App';

const { width } = Dimensions.get('window');

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<UserTabParamList, 'Home'>,
  StackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export function HomeDashboard({ navigation }: any) {
  const tabBarHeight = useBottomTabBarHeight();

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [greeting, setGreeting] = useState<string>('');
  const [animatedValue] = useState(new Animated.Value(0));

  const [upcomingAppointments, setUpcomingAppointments] = useState<any[]>([
    {
      id: '1',
      serviceName: 'Premium Haircut',
      date: new Date(Date.now() + 2 * 60 * 60 * 1000),
      time: '3:00 PM',
      staff: 'John Doe',
      status: 'confirmed',
      price: 30,
    },
    {
      id: '2',
      serviceName: 'Gold Facial Treatment',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      time: '11:00 AM',
      staff: 'Sarah Smith',
      status: 'pending',
      price: 50,
    },
  ]);

  const [stats] = useState({
    totalAppointments: 24,
    totalSpent: 580,
    loyaltyPoints: 1250,
  });

  const [featuredDoctors] = useState([
    {
      id: 1,
      name: 'Dr. Emily Chen',
      specialty: 'Dentist',
      rating: 4.9,
      reviews: 234,
      image: '👩‍⚕️',
      available: true,
    },
    {
      id: 2,
      name: 'Dr. Michael Lee',
      specialty: 'Dermatologist',
      rating: 4.8,
      reviews: 189,
      image: '👨‍⚕️',
      available: false,
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      specialty: 'Hair Stylist',
      rating: 4.9,
      reviews: 456,
      image: '💇‍♀️',
      available: true,
    },
    {
      id: 4,
      name: 'Dr. James',
      specialty: 'Orthodontist',
      rating: 4.7,
      reviews: 167,
      image: '👨‍⚕️',
      available: true,
    },
  ]);

  useEffect(() => {
    setGreeting(getGreeting());
    animateContent();
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const animateContent = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const onRefresh = async (): Promise<void> => {
    setRefreshing(true);
    await new Promise((resolve: any) => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FF6B35"
            colors={['#FF6B35']}
          />
        }
        contentContainerStyle={{
          paddingBottom: 20, // Sirf 20 padding - FAB ke liye extra space nahi
        }}
      >
        {/* Header */}
        <Animated.View
          style={{
            transform: [
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-50, 0],
                }),
              },
            ],
          }}
        >
          <LinearGradient
            colors={['#FF6B35', '#FF8C42', '#FFA559']}
            style={styles.header}
          >
            <View style={styles.headerTop}>
              <View>
                <Text style={styles.greetingText}>{greeting}!</Text>
                <Text style={styles.userName}>John Doe</Text>
                <View style={styles.loyaltyBadge}>
                  <Icon name="star" size={14} color="#FFD700" />
                  <Text style={styles.loyaltyText}>
                    {stats.loyaltyPoints} Loyalty Points
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Notifications')}
                style={styles.notificationButton}
              >
                <Badge style={styles.notificationBadge}>3</Badge>
                <Icon name="bell" size={28} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <TouchableOpacity
              style={styles.searchBarContainer}
              onPress={() => navigation.navigate('Services')}
            >
              <Icon name="magnify" size={20} color="#999" />
              <Text style={styles.searchPlaceholder}>
                Search services or doctors...
              </Text>
              <Icon name="microphone" size={20} color="#FF6B35" />
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>

        {/* Stats Section */}
        <Animated.View
          style={[styles.statsContainer, { opacity: animatedValue }]}
        >
          <View style={styles.statCard}>
            <View
              style={[
                styles.statIconContainer,
                { backgroundColor: '#FF6B3520' },
              ]}
            >
              <Icon name="calendar-check" size={24} color="#FF6B35" />
            </View>
            <Text style={[styles.statValue, { color: '#FF6B35' }]}>
              {stats.totalAppointments}
            </Text>
            <Text style={styles.statLabel}>Bookings</Text>
            <Text style={[styles.statTrend, { color: '#4CAF50' }]}>+12%</Text>
          </View>
          <View style={styles.statCard}>
            <View
              style={[
                styles.statIconContainer,
                { backgroundColor: '#4CAF5020' },
              ]}
            >
              <Icon name="currency-usd" size={24} color="#4CAF50" />
            </View>
            <Text style={[styles.statValue, { color: '#4CAF50' }]}>
              ${stats.totalSpent}
            </Text>
            <Text style={styles.statLabel}>Total Spent</Text>
            <Text style={[styles.statTrend, { color: '#4CAF50' }]}>+8%</Text>
          </View>
          <View style={styles.statCard}>
            <View
              style={[
                styles.statIconContainer,
                { backgroundColor: '#FFC10720' },
              ]}
            >
              <Icon name="star" size={24} color="#FFC107" />
            </View>
            <Text style={[styles.statValue, { color: '#FFC107' }]}>
              {stats.loyaltyPoints}
            </Text>
            <Text style={styles.statLabel}>Points</Text>
            <Text style={[styles.statTrend, { color: '#4CAF50' }]}>+5%</Text>
          </View>
        </Animated.View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('Booking')}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={['#FF6B35', '#FF8C42']}
                style={styles.quickActionGradient}
              >
                <Icon name="calendar-plus" size={32} color="#fff" />
                <Text style={styles.quickActionText}>Quick Book</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('AI')}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={['#4A90E2', '#5BA3F5']}
                style={styles.quickActionGradient}
              >
                <Icon name="robot" size={32} color="#fff" />
                <Text style={styles.quickActionText}>AI Assistant</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('Calendar')}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={['#50C878', '#6DDB8C']}
                style={styles.quickActionGradient}
              >
                <Icon name="clock-outline" size={32} color="#fff" />
                <Text style={styles.quickActionText}>Reminders</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Appointments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {upcomingAppointments.map(item => (
            <Animated.View key={item.id} style={{ opacity: animatedValue }}>
              <Card style={styles.appointmentCard}>
                <Card.Content>
                  <View style={styles.appointmentHeader}>
                    <View style={styles.serviceIconContainer}>
                      <Icon
                        name={
                          item.serviceName === 'Premium Haircut'
                            ? 'content-cut'
                            : 'face-woman'
                        }
                        size={24}
                        color="#FF6B35"
                      />
                    </View>
                    <View style={styles.appointmentInfo}>
                      <Text style={styles.appointmentService}>
                        {item.serviceName}
                      </Text>
                      <Text style={styles.appointmentTime}>
                        {format(item.date, 'EEE, MMM dd')} • {item.time}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.statusBadge,
                        item.status === 'confirmed'
                          ? styles.confirmedBadge
                          : styles.pendingBadge,
                      ]}
                    >
                      <Text style={styles.statusText}>
                        {item.status.toUpperCase()}
                      </Text>
                    </View>
                  </View>

                  <Divider style={styles.divider} />

                  <View style={styles.appointmentFooter}>
                    <View style={styles.staffInfo}>
                      <Icon name="account-circle" size={20} color="#999" />
                      <Text style={styles.staffName}>{item.staff}</Text>
                    </View>
                    <View style={styles.priceInfo}>
                      <Text style={styles.priceLabel}>Total:</Text>
                      <Text style={styles.priceValue}>${item.price}</Text>
                    </View>
                  </View>

                  {item.status === 'confirmed' && (
                    <View style={styles.reminderBadge}>
                      <Icon name="bell-ring" size={12} color="#FF6B35" />
                      <Text style={styles.reminderText}>
                        Starts{' '}
                        {formatDistanceToNow(item.date, { addSuffix: true })}
                      </Text>
                    </View>
                  )}
                </Card.Content>
              </Card>
            </Animated.View>
          ))}
        </View>

        {/* Featured Professionals */}
        <View style={[styles.section, styles.lastSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Professionals</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {featuredDoctors.map(doctor => (
              <TouchableOpacity key={doctor.id} activeOpacity={0.9}>
                <Card style={styles.doctorCard}>
                  <Card.Content style={styles.doctorCardContent}>
                    <View style={styles.doctorImageContainer}>
                      <Text style={styles.doctorEmoji}>{doctor.image}</Text>
                      {doctor.available && (
                        <View style={styles.availableBadge} />
                      )}
                    </View>
                    <Text style={styles.doctorName}>{doctor.name}</Text>
                    <Text style={styles.doctorSpecialty}>
                      {doctor.specialty}
                    </Text>
                    <View style={styles.ratingContainer}>
                      <Icon name="star" size={14} color="#FFD700" />
                      <Text style={styles.ratingText}>{doctor.rating}</Text>
                      <Text style={styles.reviewsText}>({doctor.reviews})</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.bookDoctorButton}
                      onPress={() => navigation.navigate('Booking')}
                    >
                      <Text style={styles.bookDoctorButtonText}>Book</Text>
                    </TouchableOpacity>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 4,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  loyaltyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  loyaltyText: {
    fontSize: 11,
    color: '#fff',
    marginLeft: 5,
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    right: -8,
    top: -5,
    backgroundColor: '#FF4444',
    zIndex: 1,
    fontSize: 10,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchPlaceholder: {
    flex: 1,
    color: '#999',
    fontSize: 14,
    marginLeft: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: -25,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 5,
    borderRadius: 15,
    padding: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
  },
  statTrend: {
    fontSize: 10,
    fontWeight: '500',
  },
  quickActionsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 60) / 3,
    height: 110,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  quickActionGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 8,
  },
  section: {
    paddingHorizontal: 20,
  },
  lastSection: {
    marginBottom: 0, // No extra bottom margin
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeAllText: {
    fontSize: 13,
    color: '#FF6B35',
    fontWeight: '500',
  },
  appointmentCard: {
    marginBottom: 12,
    borderRadius: 15,
    elevation: 2,
    backgroundColor: '#fff',
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  serviceIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF5F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentService: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  appointmentTime: {
    fontSize: 12,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confirmedBadge: {
    backgroundColor: '#E8F5E9',
  },
  pendingBadge: {
    backgroundColor: '#FFF3E0',
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  divider: {
    marginVertical: 12,
  },
  appointmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  staffInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  staffName: {
    fontSize: 13,
    color: '#666',
    marginLeft: 6,
  },
  priceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 12,
    color: '#999',
    marginRight: 4,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  reminderBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  reminderText: {
    fontSize: 11,
    color: '#FF6B35',
    marginLeft: 6,
  },
  doctorCard: {
    width: 140,
    marginRight: 12,
    alignItems: 'center',
    borderRadius: 15,
    elevation: 2,
    backgroundColor: '#fff',
  },
  doctorCardContent: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  doctorImageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  doctorEmoji: {
    fontSize: 60,
    textAlign: 'center',
  },
  availableBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  doctorName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    color: '#333',
  },
  doctorSpecialty: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    marginBottom: 10,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  reviewsText: {
    fontSize: 10,
    color: '#999',
    marginLeft: 2,
  },
  bookDoctorButton: {
    backgroundColor: '#FFF5F0',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
  },
  bookDoctorButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FF6B35',
  },
});