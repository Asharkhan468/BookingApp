import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import {
  Text,
  TextInput,
  ActivityIndicator,
  Surface,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Message } from '../types/index';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function AIChatScreen(): any {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! 👋 I'm your AI booking assistant. How can I help you today?",
      isUser: false,
      time: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const flatListRef = useRef<FlatList>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const inputScaleAnim = useRef(new Animated.Value(1)).current;
  const sendButtonScaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    scrollToBottom();
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [messages]);

  const scrollToBottom = (): void => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const parseUserIntent = (message: string): string => {
    const lowerMsg = message.toLowerCase();

    if (lowerMsg.includes('kal') || lowerMsg.includes('tomorrow')) {
      return "📅 **Tomorrow's Available Slots:**\n\n• 10:00 AM - 11:00 AM\n• 2:00 PM - 3:00 PM  \n• 4:00 PM - 5:00 PM\n\nWhich time works best for you?";
    } else if (lowerMsg.includes('book') || lowerMsg.includes('appointment')) {
      return '✨ **Ready to Book!**\n\nI can help you schedule an appointment. Please visit the **Booking** section or tell me:\n• Which service you need\n• Preferred date & time\n• Staff preference\n\nShall I help you with that?';
    } else if (lowerMsg.includes('cancel')) {
      return '❌ **Cancel Appointment**\n\nTo cancel an existing appointment:\n1. Go to **Profile** → **My Bookings**\n2. Select the appointment\n3. Tap **Cancel Booking**\n\nNeed help with anything else?';
    } else if (lowerMsg.includes('price') || lowerMsg.includes('cost')) {
      return '💰 **Service Pricing**\n\n✂️ **Haircut** - $30\n💆‍♀️ **Facial** - $50  \n🦷 **Dental Checkup** - $80\n👨‍⚕️ **Consultation** - $60\n\n*Prices include GST. Premium services available!*';
    } else if (
      lowerMsg.includes('available') ||
      lowerMsg.includes('free slot')
    ) {
      return "🕒 **Today's Slots:**\n• 2:00 PM\n• 3:00 PM  \n• 4:00 PM\n\n📅 **Tomorrow's Slots:**\n• 10:00 AM\n• 11:00 AM\n• 2:00 PM\n• 3:00 PM\n• 4:00 PM";
    } else if (lowerMsg.includes('hi') || lowerMsg.includes('hello')) {
      return "Hey there! 👋 Welcome back!\n\nI'm your personal booking assistant. How can I make your day better today? ✨";
    } else if (lowerMsg.includes('thank')) {
      return "You're absolutely welcome! 😊\n\nIs there anything else I can help you with? I'm here 24/7! 🌟";
    } else {
      return "🤔 **Let me help you!**\n\nCould you please specify:\n• The service you're looking for\n• Preferred date and time\n• Any specific staff member\n\nI'll find the best options for you! 🎯";
    }
  };

  const simulateTyping = async (): Promise<void> => {
    setIsTyping(true);
    await new Promise((resolve: any) => setTimeout(resolve, 800));
    setIsTyping(false);
  };

  const sendMessage = async (): Promise<void> => {
    if (!inputText.trim()) return;

    // Animate send button
    Animated.sequence([
      Animated.spring(sendButtonScaleAnim, {
        toValue: 0.9,
        useNativeDriver: true,
        tension: 100,
        friction: 5,
      }),
      Animated.spring(sendButtonScaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 5,
      }),
    ]).start();

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isUser: true,
      time: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      await new Promise((resolve: any) => setTimeout(resolve, 1000));
      const aiResponse: string = parseUserIntent(inputText);
      await simulateTyping();

      const aiMessage: Message = {
        id: messages.length + 2,
        text: aiResponse,
        isUser: false,
        time: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: messages.length + 2,
        text: '⚠️ Connection issue detected. Please check your internet and try again.',
        isUser: false,
        time: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    Animated.spring(inputScaleAnim, {
      toValue: 1.02,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.spring(inputScaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  };

  const MessageBubble = ({
    message,
    index,
  }: {
    message: Message;
    index: number;
  }) => {
    const messageAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(messageAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 50,
        useNativeDriver: true,
      }).start();
    }, []);

    return (
      <Animated.View
        style={[
          styles.messageWrapper,
          message.isUser ? styles.userMessageWrapper : styles.aiMessageWrapper,
          {
            opacity: messageAnim,
            transform: [
              {
                translateY: messageAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          },
        ]}
      >
        {!message.isUser && (
          <Surface style={styles.aiAvatar} elevation={2}>
            <LinearGradient
              colors={['#6366F1', '#8B5CF6']}
              style={styles.aiAvatarGradient}
            >
              <Icon name="robot-outline" size={22} color="#fff" />
            </LinearGradient>
          </Surface>
        )}

        <Surface
          style={[
            styles.messageContainer,
            message.isUser
              ? styles.userMessageContainer
              : styles.aiMessageContainer,
          ]}
          elevation={1}
        >
          <Text
            style={
              message.isUser ? styles.userMessageText : styles.aiMessageText
            }
          >
            {message.text}
          </Text>
          <View style={styles.messageTimeContainer}>
            <Text
              style={message.isUser ? styles.userTimeText : styles.aiTimeText}
            >
              {new Date(message.time).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
            {message.isUser && (
              <Icon name="check-all" size={14} color="#6366F1" />
            )}
          </View>
        </Surface>

        {message.isUser && (
          <Surface style={styles.userAvatar} elevation={2}>
            <LinearGradient
              colors={['#6366F1', '#8B5CF6']}
              style={styles.userAvatarGradient}
            >
              <Icon name="account-circle" size={22} color="#fff" />
            </LinearGradient>
          </Surface>
        )}
      </Animated.View>
    );
  };

  const TypingIndicator = () => (
    <View style={styles.typingIndicatorWrapper}>
      <Surface style={styles.aiAvatar} elevation={2}>
        <LinearGradient
          colors={['#6366F1', '#8B5CF6']}
          style={styles.aiAvatarGradient}
        >
          <Icon name="robot-outline" size={22} color="#fff" />
        </LinearGradient>
      </Surface>
      <Surface style={styles.typingContainer} elevation={1}>
        <View style={styles.typingDot} />
        <View style={[styles.typingDot, styles.typingDotDelay]} />
        <View style={[styles.typingDot, styles.typingDotDelay2]} />
      </Surface>
    </View>
  );

  const SuggestionsList = () => (
    <View style={styles.suggestionsContainer}>
      <Text style={styles.suggestionsTitle}>Quick Suggestions</Text>
      <View style={styles.suggestionsGrid}>
        <TouchableOpacity
          style={styles.suggestionChip}
          onPress={() => setInputText('Show available slots')}
        >
          <Icon name="calendar-clock" size={18} color="#6366F1" />
          <Text style={styles.suggestionText}>Available Slots</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.suggestionChip}
          onPress={() => setInputText('Service prices')}
        >
          <Icon name="currency-usd" size={18} color="#6366F1" />
          <Text style={styles.suggestionText}>Pricing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.suggestionChip}
          onPress={() => setInputText('Book appointment')}
        >
          <Icon name="calendar-check" size={18} color="#6366F1" />
          <Text style={styles.suggestionText}>Book Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.suggestionChip}
          onPress={() => setInputText('Cancel appointment')}
        >
          <Icon name="calendar-remove" size={18} color="#6366F1" />
          <Text style={styles.suggestionText}>Cancel Booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#1E293B" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <View style={styles.headerAvatar}>
            <LinearGradient
              colors={['#6366F1', '#8B5CF6']}
              style={styles.headerAvatarGradient}
            >
              <Icon name="robot" size={24} color="#fff" />
            </LinearGradient>
            <View style={styles.onlineBadge} />
          </View>
          <View>
            <Text style={styles.headerTitle}>AI Assistant</Text>
            <Text style={styles.headerSubtitle}>Online • 24/7 Support</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="dots-vertical" size={24} color="#1E293B" />
        </TouchableOpacity>
      </View>

      {/* Chat Area */}
      <KeyboardAvoidingView
        style={styles.chatArea}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item, index }) => (
            <MessageBubble message={item} index={index} />
          )}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={scrollToBottom}
        />

        {isTyping && <TypingIndicator />}

        {isLoading && !isTyping && (
          <View style={styles.aiThinkingContainer}>
            <ActivityIndicator size="small" color="#6366F1" />
            <Text style={styles.aiThinkingText}>AI is thinking...</Text>
          </View>
        )}

        {messages.length === 1 && <SuggestionsList />}

        {/* Premium Input Area */}
        <View style={[styles.inputArea, isFocused && styles.inputAreaFocused]}>
          <View style={styles.inputContainer}>
            <Animated.View
              style={[
                styles.modernInputWrapper,
                {
                  transform: [{ scale: inputScaleAnim }],
                },
              ]}
            >
              <TextInput
                mode="flat"
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                style={styles.modernInput}
                placeholder="Message..."
                placeholderTextColor="#94A3B8"
                value={inputText}
                onChangeText={setInputText}
                onFocus={handleFocus}
                onBlur={handleBlur}
                multiline
              />

              <TouchableOpacity
                style={[
                  styles.modernSendButton,
                  !inputText.trim() && { opacity: 0.5 },
                ]}
                onPress={sendMessage}
                disabled={!inputText.trim()}
              >
                <LinearGradient
                  colors={['#6366F1', '#8B5CF6']}
                  style={styles.modernSendGradient}
                >
                  <Icon name="arrow-up" size={20} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerAvatar: {
    position: 'relative',
  },
  headerAvatarGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatArea: {
    flex: 1,
  },
  messagesList: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  userMessageWrapper: {
    justifyContent: 'flex-end',
  },
  aiMessageWrapper: {
    justifyContent: 'flex-start',
  },
  aiAvatar: {
    marginRight: 12,
    borderRadius: 20,
    overflow: 'hidden',
  },
  aiAvatarGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatar: {
    marginLeft: 12,
    borderRadius: 20,
    overflow: 'hidden',
  },
  userAvatarGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  userMessageContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomRightRadius: 4,
  },
  aiMessageContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
  },
  userMessageText: {
    color: '#1E293B',
    fontSize: 15,
    lineHeight: 22,
  },
  aiMessageText: {
    color: '#1E293B',
    fontSize: 15,
    lineHeight: 22,
  },
  messageTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 8,
    gap: 6,
  },
  userTimeText: {
    fontSize: 10,
    color: '#94A3B8',
  },
  aiTimeText: {
    fontSize: 10,
    color: '#94A3B8',
  },
  typingIndicatorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    gap: 6,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6366F1',
    opacity: 0.4,
  },
  typingDotDelay: {
    opacity: 0.6,
    marginLeft: 4,
  },
  typingDotDelay2: {
    opacity: 1,
    marginLeft: 4,
  },
  aiThinkingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  aiThinkingText: {
    fontSize: 12,
    color: '#64748B',
  },
  suggestionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  suggestionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  suggestionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  suggestionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    gap: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  suggestionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6366F1',
  },

  inputAreaFocused: {
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },

  attachmentButton: {
    marginBottom: 8,
  },
  attachmentGradient: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 52,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
    paddingVertical: 8,
    maxHeight: 100,
  },
  clearButton: {
    padding: 4,
  },
  charCounter: {
    position: 'absolute',
    bottom: -18,
    right: 12,
  },
  charCounterText: {
    fontSize: 10,
    color: '#94A3B8',
  },
  sendButton: {
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 4,
  },
  sendButtonDisabled: {
    opacity: 0.7,
  },
  sendButtonGradient: {
    width: 52,
    height: 52,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingTop: 12,
    marginTop: 8,
  },
  quickActionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6366F1',
  },

  inputArea: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 25 : 20,
    borderTopWidth: 1,
    borderTopColor: '#EEF2F7',
  },

  modernSendButton: {
    marginLeft: 8,
    marginBottom: 4,
    marginTop: 4,
  },

  modernSendGradient: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  modernInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#F8FAFC',

    borderWidth: 1,
    borderColor: '#E2E8F0',

    borderRadius: 24,

    paddingLeft: 16,
    paddingRight: 6,

    height: 48,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },

  modernInput: {
    flex: 1,
    backgroundColor: 'transparent',

    fontSize: 15,
    color: '#0F172A',

    paddingVertical: 0,
    margin: 0,
  },
});
