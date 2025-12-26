import { useAuth } from '@/components/AuthContext';
import { Order, useOrders } from '@/components/OrderContext';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

export default function KitchenScreen() {
  const colorScheme = useColorScheme();
  const tint = Colors[colorScheme ?? 'light'].tint;
  const { user } = useAuth();
  const { orders, updateOrderStatus } = useOrders();
  const router = useRouter();

  if (!user || user.role !== 'staff') {
    return (
      <View style={styles.unauthorized}>
        <FontAwesome name="lock" size={60} color="#ff4444" />
        <Text style={styles.unauthorizedText}>Authorized Personnel Only</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={{ color: '#fff' }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const OrderTicket = ({ order }: { order: Order }) => (
    <View style={styles.ticket}>
      <View style={[styles.ticketHeader, { backgroundColor: getStatusColor(order.status) }]}>
        <Text style={styles.ticketId}>#{order.id}</Text>
        <Text style={styles.ticketTime}>{order.date}</Text>
      </View>
      
      <View style={styles.ticketBody}>
        <View style={styles.itemsList}>
          {order.items.map((item, idx) => (
            <View key={idx} style={styles.ticketItem}>
              <Text style={styles.qty}>{item.quantity}x</Text>
              <Text style={styles.itemName}>{item.name}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          {order.status === 'Placed' && (
            <TouchableOpacity 
              style={[styles.actionBtn, { backgroundColor: '#00BCD4' }]}
              onPress={() => updateOrderStatus(order.id, 'Preparing')}
            >
              <Text style={styles.btnText}>Start Prep</Text>
            </TouchableOpacity>
          )}
          {order.status === 'Preparing' && (
            <TouchableOpacity 
              style={[styles.actionBtn, { backgroundColor: '#4CAF50' }]}
              onPress={() => updateOrderStatus(order.id, 'Ready')}
            >
              <Text style={styles.btnText}>Mark Ready</Text>
            </TouchableOpacity>
          )}
          {order.status === 'Ready' && (
            <TouchableOpacity 
              style={[styles.actionBtn, { backgroundColor: '#888' }]}
              onPress={() => updateOrderStatus(order.id, 'Completed')}
            >
              <Text style={styles.btnText}>Complete</Text>
            </TouchableOpacity>
          )}
          {order.status === 'Completed' && (
            <View style={styles.completedBadge}>
              <FontAwesome name="check" size={16} color="#4CAF50" />
              <Text style={{ color: '#4CAF50', marginLeft: 5, fontWeight: 'bold' }}>Served</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Kitchen Display System</Text>
        <Text style={styles.subtitle}>{orders.filter(o => o.status !== 'Completed').length} Active Orders</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.column}>
          <Text style={[styles.colTitle, { color: '#FFA500' }]}>New Orders</Text>
          {orders.filter(o => o.status === 'Placed').map(o => <OrderTicket key={o.id} order={o} />)}
        </View>
        
        <View style={styles.column}>
          <Text style={[styles.colTitle, { color: '#00BCD4' }]}>Prep Station</Text>
          {orders.filter(o => o.status === 'Preparing').map(o => <OrderTicket key={o.id} order={o} />)}
        </View>

        <View style={styles.column}>
          <Text style={[styles.colTitle, { color: '#4CAF50' }]}>Ready to Serve</Text>
          {orders.filter(o => o.status === 'Ready').map(o => <OrderTicket key={o.id} order={o} />)}
        </View>
      </ScrollView>
    </View>
  );
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Placed': return '#FFA500';
    case 'Preparing': return '#00BCD4';
    case 'Ready': return '#4CAF50';
    default: return '#333';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  unauthorized: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unauthorizedText: {
    color: '#ff4444',
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  header: {
    padding: 20,
    backgroundColor: '#1E1E1E',
    borderBottomWidth: 1,
    borderColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    color: '#aaa',
    fontSize: 14,
  },
  scrollContent: {
    padding: 20,
  },
  column: {
    marginBottom: 30,
  },
  colTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  ticket: {
    backgroundColor: '#222',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
  },
  ticketHeader: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ticketId: {
    color: '#000',
    fontWeight: 'bold',
  },
  ticketTime: {
    color: '#000',
    fontSize: 12,
  },
  ticketBody: {
    padding: 15,
  },
  itemsList: {
    marginBottom: 15,
  },
  ticketItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  qty: {
    color: '#FFA500',
    fontWeight: 'bold',
    width: 30,
  },
  itemName: {
    color: '#fff',
    flex: 1,
  },
  actions: {
    alignItems: 'flex-end',
  },
  actionBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#4CAF5022',
    borderRadius: 5,
  },
});
