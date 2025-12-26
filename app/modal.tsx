import { useAuth } from '@/components/AuthContext';
import { useCart } from '@/components/CartContext';
import { useNotification } from '@/components/NotificationContext';
import { useOrders } from '@/components/OrderContext';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, Image, Platform, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function ModalScreen() {
  const { items, total, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const { addOrder } = useOrders();
  const colorScheme = useColorScheme();
  const tint = Colors[colorScheme ?? 'light'].tint;
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    setIsProcessing(true);
    // Simulate real payment gateway delay (Paystack/Stripe)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Create status order
    const finalTotal = total + 25 + Math.round(total * 0.15);
    addOrder(items, finalTotal);
    
    setIsPaid(true);
    setIsProcessing(false);
    
    // Simulate SMS notification
    showNotification(`SMS Sent: Order confirmed! R${finalTotal} charged to your card. 💳`);

    // Auto-navigate after 2 seconds
    setTimeout(() => {
      clearCart();
      router.replace('/(tabs)/orders');
    }, 2000);
  };

  if (isPaid) {
    return (
      <View style={styles.successContainer}>
        <FontAwesome name="check-circle" size={100} color="#4CAF50" />
        <Text style={styles.successTitle}>Payment Successful!</Text>
        <Text style={styles.successSubtitle}>Your Braai feast is being prepared.</Text>
        <ActivityIndicator color={tint} style={{ marginTop: 20 }} />
      </View>
    );
  }

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
            <Text style={styles.sectionTitle}>Review Your Selection</Text>
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
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>VAT (15%)</Text>
                <Text style={styles.summaryValue}>R{Math.round(total * 0.15)}</Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total to Pay</Text>
                <Text style={[styles.totalValue, { color: tint }]}>R{total + 25 + Math.round(total * 0.15)}</Text>
              </View>
            </View>

            <View style={styles.paymentMethods}>
              <Text style={styles.paymentTitle}>Payment Method</Text>
              <View style={styles.methodCard}>
                <FontAwesome name="credit-card" size={20} color={tint} />
                <Text style={styles.methodText}>Secure Card Payment (Paystack)</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {items.length > 0 && (
        <View style={styles.footer}>
          {!user && (
            <Text style={styles.loginHint}>You need to be logged in to pay</Text>
          )}
          <TouchableOpacity 
            style={[styles.checkoutButton, { backgroundColor: tint, opacity: isProcessing ? 0.7 : 1 }]}
            onPress={handleCheckout}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.checkoutText}>
                {user ? `Secure Payment R${total + 25 + Math.round(total * 0.15)}` : 'Login to Checkout'}
              </Text>
            )}
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
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#4CAF50',
  },
  successSubtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
    marginTop: 10,
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
  paymentMethods: {
    marginTop: 30,
    backgroundColor: 'transparent',
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#33333322',
    backgroundColor: '#33333308',
  },
  methodText: {
    marginLeft: 15,
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#33333311',
  },
  loginHint: {
    textAlign: 'center',
    color: '#ff4444',
    fontSize: 12,
    marginBottom: 10,
    fontWeight: 'bold',
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
