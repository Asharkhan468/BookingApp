export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: Date;
}

export interface Service {
  id: number;
  name: string;
  category: string;
  price: number;
  duration: number;
  rating: number;
  reviews: number;
  icon: string;
  color: string;
  description: string;
}

export interface Appointment {
  id: string;
  userId: string;
  serviceId: number;
  serviceName: string;
  date: Date;
  time: string;
  staff: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' |'upcoming';
  price: number;
  createdAt: Date;
  reminderSent: boolean;
}

export interface Staff {
  id: number;
  name: string;
  role: string;
  rating: number;
  image: string;
  availability: Availability[];
}

export interface Availability {
  day: string;
  slots: string[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'booking' | 'reminder' | 'promotion';
  read: boolean;
  createdAt: Date;
  appointmentId?: string;
}

export interface Message {
  id: number;
  text: string;
  isUser: boolean;
  time: Date;
}

export interface OnboardingItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  gradient:string[];
}

export interface AutomationSettings {
  whatsappReminders: boolean;
  autoConfirmations: boolean;
  aiSuggestions: boolean;
  reminderHours: number[];
  autoReschedule: boolean;
  whatsappNumber: string;
  reminderMessage: string;
  promotionalMessages: boolean;
}

export interface BookingData {
  service: Service | null;
  date: Date;
  time: string;
  staff: string;
}

export interface DashboardStats {
  totalBookings: number;
  revenue: number;
  activeCustomers: number;
  pendingAppointments: number;
}
