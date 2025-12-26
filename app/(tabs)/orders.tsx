import { useAuth } from '@/components/AuthContext';
import { useOrders } from '@/components/OrderContext';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function OrdersScreen() {
  const colorScheme = useColorScheme();
  const tint = Colors[colorScheme ?? 'light'].tint;
  const { user } = useAuth();
  const { orders } = useOrders();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  if (!user) {
    return (
      <View style={styles.loginRequired}>
        <FontAwesome name="lock" size={80} color={tint} style={{ opacity: 0.3 }} />
        <Text style={styles.title}>Vibe Access Only</Text>
        <Text style={styles.subtitle}>Login to view and track your orders</Text>
        <TouchableOpacity 
          style={[styles.loginBtn, { backgroundColor: tint }]}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.loginBtnText}>Login to Vibe</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Placed': return '#FFA500';
      case 'Preparing': return '#00BCD4';
      case 'Ready': return '#4CAF50';
      case 'Completed': return '#888';
      default: return '#888';
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={tint} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
        <Text style={styles.subtitle}>Track your food and drinks, {user.name.split(' ')[0]}</Text>
      </View>

      {orders.length === 0 ? (
        <View style={styles.emptyState}>
          <FontAwesome name="shopping-basket" size={80} color={tint} style={{ opacity: 0.3 }} />
          <Text style={styles.emptyText}>No active orders</Text>
          <Text style={styles.emptySubtext}>Your delicious meal is just a few taps away!</Text>
        </View>
      ) : (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          {orders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderId}>#{order.id}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '22' }]}>
                  <Text style={[styles.orderStatus, { color: getStatusColor(order.status) }]}>
                    {order.status.toUpperCase()}
                  </Text>
                </View>
              </View>
              <Text style={styles.orderDate}>{order.date}</Text>
              <View style={styles.itemsList}>
                {order.items.map((item, index) => (
                  <Text key={index} style={styles.orderItemText}>
                    {item.quantity}x {item.name}
                  </Text>
                ))}
              </View>
              <View style={styles.divider} />
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Paid</Text>
                <Text style={[styles.orderTotal, { color: tint }]}>R{order.total}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginRequired: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  loginBtn: {
    marginTop: 30,
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 30,
  },
  loginBtnText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
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
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#33333333',
    marginBottom: 15,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  orderId: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  orderStatus: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  orderDate: {
    fontSize: 12,
    opacity: 0.5,
    marginBottom: 10,
  },
  itemsList: {
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  orderItemText: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#33333333',
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  totalLabel: {
    fontSize: 14,
    opacity: 0.6,
  },
  orderTotal: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
