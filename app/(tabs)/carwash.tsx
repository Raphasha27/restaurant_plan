import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ScrollView, StyleSheet } from 'react-native';

export default function CarwashScreen() {
  const colorScheme = useColorScheme();
  const tint = Colors[colorScheme ?? 'light'].tint;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="car" size={60} color={tint} />
        <Text style={styles.title}>Premium Carwash</Text>
        <Text style={styles.subtitle}>Treat your ride while you relax</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Services</Text>
        {[
          { name: 'Executive Wash', price: 'R150', time: '45 mins' },
          { name: 'Full Valet', price: 'R450', time: '120 mins' },
          { name: 'Exterior Only', price: 'R80', time: '20 mins' },
        ].map((service, index) => (
          <View key={index} style={styles.serviceItem}>
            <View>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.serviceTime}>{service.time}</Text>
            </View>
            <Text style={styles.servicePrice}>{service.price}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 30,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 15,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginTop: 5,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#33333333',
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
  },
  serviceTime: {
    fontSize: 14,
    opacity: 0.6,
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFA500',
  },
  bookButton: {
    margin: 20,
    backgroundColor: '#FFA500',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
