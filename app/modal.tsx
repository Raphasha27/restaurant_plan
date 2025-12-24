import { useCart } from '@/components/CartContext';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, Platform, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function ModalScreen() {
  const { items, total, removeFromCart, clearCart } = useCart();
  const colorScheme = useColorScheme();
  const tint = Colors[colorScheme ?? 'light'].tint;
  const router = useRouter();

  const handleCheckout = () => {
    // In a real app, integrate Stripe/Paystack here
    alert('Payment Successful! Your order has been placed.');
    clearCart();
    router.replace('/(tabs)/orders');
  };

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      
      <ScrollView style={styles.scroll}>
        {items.length === 0 ? (
          <View style={styles.empty}>
            <FontAwesome name="shopping-basket" size={100} color="#333" />
            <Text style={styles.emptyTitle}>Your basket is empty</Text>
            <Text style={styles.emptySubtitle}>Go to the menu and add some delicious food!</Text>
          </View>
        ) : (
          <View style={styles.itemList}>
            <Text style={styles.sectionTitle}>Your Items</Text>
            {items.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemQty}>Quantity: {item.quantity}</Text>
                  <Text style={[styles.itemPrice, { color: tint }]}>R{item.price * item.quantity}</Text>
                </View>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <FontAwesome name="trash-o" size={24} color="#ff4444" />
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>R{total}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery/Service Fee</Text>
                <Text style={styles.summaryValue}>R25</Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={[styles.totalValue, { color: tint }]}>R{total + 25}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {items.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.checkoutButton, { backgroundColor: tint }]}
            onPress={handleCheckout}
          >
            <Text style={styles.checkoutText}>Pay R{total + 25} Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  empty: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.6,
    marginTop: 10,
  },
  itemList: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#33333311',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
    backgroundColor: 'transparent',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemQty: {
    fontSize: 12,
    opacity: 0.6,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 2,
  },
  summaryCard: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#33333311',
    borderRadius: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  summaryLabel: {
    opacity: 0.7,
  },
  summaryValue: {
    fontWeight: '500',
  },
  totalRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#33333322',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#33333311',
  },
  checkoutButton: {
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
