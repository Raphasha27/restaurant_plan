import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function ReservationsScreen() {
  const colorScheme = useColorScheme();
  const tint = Colors[colorScheme ?? 'light'].tint;
  const [date, setDate] = useState('2025-12-25');
  const [guests, setGuests] = useState('2');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reservations</Text>
        <Text style={styles.subtitle}>Book your spot at Mzansi Restaurant</Text>
      </View>

      <View style={styles.formSection}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Select Date</Text>
          <View style={styles.inputWrapper}>
            <FontAwesome name="calendar" size={18} color={tint} style={styles.inputIcon} />
            <TextInput 
              style={[styles.input, { color: colorScheme === 'dark' ? '#fff' : '#000' }]} 
              value={date}
              onChangeText={setDate}
              placeholder="YYYY-MM-DD"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Number of Guests</Text>
          <View style={styles.inputWrapper}>
            <FontAwesome name="users" size={18} color={tint} style={styles.inputIcon} />
            <TextInput 
              style={[styles.input, { color: colorScheme === 'dark' ? '#fff' : '#000' }]} 
              value={guests}
              onChangeText={setGuests}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Special Occasion (Optional)</Text>
          <View style={styles.inputWrapper}>
            <FontAwesome name="gift" size={18} color={tint} style={styles.inputIcon} />
            <TextInput 
              style={[styles.input, { color: colorScheme === 'dark' ? '#fff' : '#000' }]} 
              placeholder="Birthday, Anniversary, etc."
            />
          </View>
        </View>

        <TouchableOpacity style={[styles.submitButton, { backgroundColor: tint }]}>
          <Text style={styles.submitButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Why Book With Us?</Text>
        <View style={styles.infoRow}>
          <FontAwesome name="star" size={16} color={tint} />
          <Text style={styles.infoText}>Priority seating in our premium lounge</Text>
        </View>
        <View style={styles.infoRow}>
          <FontAwesome name="music" size={16} color={tint} />
          <Text style={styles.infoText}>Live entertainment on weekends</Text>
        </View>
        <View style={styles.infoRow}>
          <FontAwesome name="glass" size={16} color={tint} />
          <Text style={styles.infoText}>Complimentary welcome drink for bookings of 4+</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.6,
    marginTop: 5,
  },
  formSection: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    opacity: 0.8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#33333311',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#33333322',
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  submitButton: {
    height: 55,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  infoSection: {
    padding: 20,
    marginTop: 10,
    backgroundColor: '#33333311',
    margin: 20,
    borderRadius: 15,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  infoText: {
    marginLeft: 15,
    fontSize: 14,
    opacity: 0.8,
  },
});
