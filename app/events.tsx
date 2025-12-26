import { useAuth } from '@/components/AuthContext';
import { Event, useEvents } from '@/components/EventContext';
import { useNotification } from '@/components/NotificationContext';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function EventsScreen() {
  const colorScheme = useColorScheme();
  const tint = Colors[colorScheme ?? 'light'].tint;
  const { user } = useAuth();
  const router = useRouter();
  const { events, rsvpToEvent, userRsvps } = useEvents();
  const { showNotification } = useNotification();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showVibePass, setShowVibePass] = useState(false);

  const handleRSVP = (eventId: string) => {
    if (!user) {
      router.push('/login');
      return;
    }
    rsvpToEvent(eventId);
    showNotification('RSVP Status Updated! 🎉', 'success');
  };

  const openVibePass = (event: Event) => {
    setSelectedEvent(event);
    setShowVibePass(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Upcoming Vibes</Text>
          <Text style={styles.headerSubtitle}>Exclusive events at Mzansi Lounge</Text>
        </View>

        {events.map((event) => {
          const isAttending = user && event.attendees.includes(user.id);

          return (
            <View key={event.id} style={styles.eventCard}>
              <Image source={{ uri: event.image }} style={styles.eventImage} />
              <View style={styles.cardContent}>
                <View style={styles.dateBadge}>
                  <Text style={styles.dateText}>{event.date.split(',')[0]}</Text>
                  <Text style={styles.dateNum}>{event.date.split(' ')[1]}</Text>
                </View>
                
                <View style={styles.textContainer}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventTime}>
                    <FontAwesome name="clock-o" size={12} color="#aaa" /> {event.time}
                  </Text>
                  <Text style={styles.eventLocation}>
                    <FontAwesome name="map-marker" size={12} color="#aaa" /> {event.location}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.description}>{event.description}</Text>

              <View style={styles.actionRow}>
                <View style={styles.attendees}>
                  <FontAwesome name="users" size={14} color="#666" />
                  <Text style={styles.attendeeCount}>{event.attendees.length} attending</Text>
                </View>

                {isAttending ? (
                  <View style={{ flexDirection: 'row' }}>
                     <TouchableOpacity 
                      style={[styles.rsvpBtn, styles.attendingBtn]}
                      onPress={() => handleRSVP(event.id)}
                    >
                      <Text style={styles.attendingText}>Attending</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.passBtn, { backgroundColor: tint }]}
                      onPress={() => openVibePass(event)}
                    >
                      <FontAwesome name="qrcode" size={16} color="#000" />
                      <Text style={styles.passBtnText}>Pass</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity 
                    style={[styles.rsvpBtn, { borderColor: tint }]}
                    onPress={() => handleRSVP(event.id)}
                  >
                    <Text style={[styles.rsvpText, { color: tint }]}>RSVP Now</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Vibe Pass Modal */}
      <Modal visible={showVibePass} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Your Vibe Pass</Text>
              <TouchableOpacity onPress={() => setShowVibePass(false)}>
                <FontAwesome name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            
            {selectedEvent && (
              <View style={styles.passCard}>
                <Image source={{ uri: selectedEvent.image }} style={styles.passImage} />
                <View style={styles.passDetails}>
                  <Text style={styles.passEvent}>{selectedEvent.title}</Text>
                  <Text style={styles.passDate}>{selectedEvent.date} • {selectedEvent.time}</Text>
                  
                  <View style={styles.qrContainer}>
                    {/* Simulated QR Code */}
                    <Image 
                      source={{ uri: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${selectedEvent.id}-${user?.id}` }} 
                      style={styles.qrCode} 
                    />
                  </View>
                  
                  <Text style={styles.passUser}>{user?.name}</Text>
                  <Text style={styles.passId}>ID: {user?.id.substring(0, 8).toUpperCase()}</Text>
                  
                  <View style={styles.statusBadge}>
                    <FontAwesome name="check-circle" size={14} color="#fff" />
                    <Text style={styles.statusText}>Access Granted</Text>
                  </View>
                </View>
              </View>
            )}
            
            <Text style={styles.modalHint}>Show this pass at the door for VIP entry.</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 16,
    opacity: 0.6,
  },
  eventCard: {
    backgroundColor: '#33333311',
    borderRadius: 20,
    marginBottom: 25,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#33333322',
  },
  eventImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'transparent',
  },
  dateBadge: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 60,
    marginRight: 15,
  },
  dateText: {
    color: '#aaa',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  dateNum: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventTime: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 2,
  },
  eventLocation: {
    fontSize: 12,
    opacity: 0.7,
  },
  description: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    opacity: 0.8,
    fontSize: 14,
    lineHeight: 20,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#33333322',
    backgroundColor: 'transparent',
  },
  attendees: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  attendeeCount: {
    marginLeft: 8,
    fontSize: 12,
    opacity: 0.6,
  },
  rsvpBtn: {
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  attendingBtn: {
    borderColor: '#4CAF50',
    backgroundColor: '#4CAF5022',
    marginRight: 10,
  },
  rsvpText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  attendingText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 12,
  },
  passBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  passBtnText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 5,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  passCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    paddingBottom: 20,
  },
  passImage: {
    width: '100%',
    height: 120,
  },
  passDetails: {
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  passEvent: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  passDate: {
    color: '#666',
    fontSize: 14,
    marginTop: 5,
    marginBottom: 20,
  },
  qrContainer: {
    padding: 10,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    marginBottom: 20,
  },
  qrCode: {
    width: 150,
    height: 150,
  },
  passUser: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  passId: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 15,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  modalHint: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 20,
    fontSize: 12,
  },
});
