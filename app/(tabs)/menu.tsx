import { useCart } from '@/components/CartContext';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const MENU_DATA = [
  {
    category: 'Braai Selection',
    items: [
      { id: 'b1', name: 'Shisanyama Platter', price: 280, displayPrice: 'R280', description: 'Beef, Boerewors, Pork Chop with Chakalaka and Pap', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500' },
      { id: 'b2', name: 'Wagyu Beef Burger', price: 165, displayPrice: 'R165', description: 'Grilled on open flame, brioche bun, secret sauce', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500' },
    ]
  },
  {
    category: 'Restaurant Specality',
    items: [
      { id: 'r1', name: 'Lamb Curry', price: 195, displayPrice: 'R195', description: 'Authentic Durban style, spicy and tender', image: 'https://images.unsplash.com/photo-1545240681-c7ac73713024?w=500' },
      { id: 'r2', name: 'Prawn Pasta', price: 220, displayPrice: 'R220', description: 'Creamy lemon garlic sauce with fresh prawns', image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=500' },
    ]
  },
  {
    category: 'Beverages & Drinks',
    items: [
      { id: 'd1', name: 'Savanna Dry/Light', price: 45, displayPrice: 'R45', description: 'Ice cold South African cider', image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=500' },
      { id: 'd2', name: 'Signature Cocktail', price: 95, displayPrice: 'R95', description: 'Passion fruit and lime lifestyle bliss', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500' },
    ]
  }
];

export default function MenuScreen() {
  const colorScheme = useColorScheme();
  const tint = Colors[colorScheme ?? 'light'].tint;
  const { addToCart, items: cartItems } = useCart();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>The Menu</Text>
          <Text style={styles.subtitle}>Savor the South African taste</Text>
        </View>

        {MENU_DATA.map((section, sidx) => (
          <View key={sidx} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: tint }]}>{section.category}</Text>
            {section.items.map((item, iidx) => (
              <View key={iidx} style={styles.itemCard}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDesc} numberOfLines={2}>{item.description}</Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.itemPrice}>{item.displayPrice}</Text>
                    <TouchableOpacity 
                      style={[styles.addButton, { backgroundColor: tint }]}
                      onPress={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image })}
                    >
                      <FontAwesome name="plus" size={12} color="#000" />
                      <Text style={styles.addButtonText}>Order</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
              </View>
            ))}
          </View>
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>

      {cartItems.length > 0 && (
        <Link href="/modal" asChild>
          <Pressable style={[styles.fab, { backgroundColor: tint }]}>
            <View style={styles.fabIcon}>
              <FontAwesome name="shopping-basket" size={20} color="#000" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartItems.reduce((a, b) => a + b.quantity, 0)}</Text>
              </View>
            </View>
            <Text style={styles.fabText}>View Basket</Text>
          </Pressable>
        </Link>
      )}
    </View>
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
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.6,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#33333311',
    borderRadius: 16,
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#33333322',
  },
  itemInfo: {
    flex: 1,
    padding: 15,
    backgroundColor: 'transparent',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDesc: {
    fontSize: 13,
    opacity: 0.7,
    marginVertical: 5,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'transparent',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFA500',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#000',
  },
  itemImage: {
    width: 100,
    height: '100%',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    left: 20,
    height: 60,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabIcon: {
    backgroundColor: 'transparent',
    marginRight: 10,
  },
  fabText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  badge: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#fff',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
  }
});
