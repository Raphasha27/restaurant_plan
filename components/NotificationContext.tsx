import React, { createContext, useContext, useState, useCallback } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type NotificationType = 'sms' | 'info' | 'success';

type NotificationContextType = {
  showNotification: (text: string, type?: NotificationType) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [text, setText] = useState('');
  const [type, setType] = useState<NotificationType>('sms');
  const [visible, setVisible] = useState(false);
  const opacity = useState(new Animated.Value(0))[0];

  const showNotification = useCallback((message: string, nType: NotificationType = 'sms') => {
    setText(message);
    setType(nType);
    setVisible(true);
    
    Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(4000),
      Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true })
    ]).start(() => setVisible(false));
  }, [opacity]);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {visible && (
        <Animated.View style={[styles.container, { opacity }]}>
          <View style={styles.notification}>
            <View style={styles.iconCircle}>
              <FontAwesome 
                name={type === 'sms' ? 'comment' : 'check'} 
                size={14} 
                color="#fff" 
              />
            </View>
            <View style={styles.content}>
              <Text style={styles.header}>{type === 'sms' ? 'SMS: Mzansi Lounge' : 'Message'}</Text>
              <Text style={styles.body}>{text}</Text>
            </View>
          </View>
        </Animated.View>
      )}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 9999,
  },
  notification: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  header: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    opacity: 0.6,
  },
  body: {
    color: '#fff',
    fontSize: 14,
    marginTop: 2,
  },
});
