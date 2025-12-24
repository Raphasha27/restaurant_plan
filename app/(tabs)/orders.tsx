import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ScrollView, StyleSheet } from 'react-native';

export default function OrdersScreen() {
  const colorScheme = useColorScheme();
  const tint = Colors[colorScheme ?? 'light'].tint;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
        <Text style={styles.subtitle}>Track your food and drinks</Text>
      </View>

      <View style={styles.emptyState}>
        <FontAwesome name="shopping-basket" size={80} color={tint} style={{ opacity: 0.3 }} />
        <Text style={styles.emptyText}>No active orders</Text>
        <Text style={styles.emptySubtext}>Your delicious meal is just a few taps away!</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Orders</Text>
        <View style={styles.orderCard}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderId}>#ORD-7829</Text>
            <Text style={styles.orderStatus}>COMPLETED</Text>
          </View>
          <Text style={styles.orderItems}>2x Wagyu Braai Plate, 1x Savanna Dry</Text>
          <Text style={styles.orderTotal}>Total: R420.00</Text>
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
  },
  emptyState: {
    padding: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.5,
    marginTop: 10,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  orderCard: {
    backgroundColor: '#33333322',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#33333333',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  orderId: {
    fontWeight: 'bold',
  },
  orderStatus: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: 'bold',
  },
  orderItems: {
    fontSize: 14,
    opacity: 0.7,
  },
  orderTotal: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFA500',
  },
});
