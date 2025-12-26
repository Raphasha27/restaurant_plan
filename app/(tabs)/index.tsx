import { useAuth } from '@/components/AuthContext';
import { useNotification } from '@/components/NotificationContext';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { Image, ImageBackground, ScrollView, Share, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const tint = Colors[colorScheme ?? 'light'].tint;
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { showNotification } = useNotification();

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: 'Join me at Mzansi Lifestyle Lounge! Great vibes, premium braai, and elite carwash services. 🇿🇦🔥',
        url: 'https://mzansi-lounge.co.za',
      });
      if (result.action === Share.sharedAction) {
        showNotification('Thanks for sharing the vibe!', 'success');
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleBookTable = () => {
    router.push('/(tabs)/reservations');
    setTimeout(() => {
      showNotification('SMS Sent: Your booking request is being processed. 📱');
    }, 2000);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Profile Section */}
      <View style={styles.topProfileBar}>
        {user ? (
          <View style={styles.userSection}>
            <View style={styles.userInfo}>
              <Text style={styles.welcomeText}>Dumela,</Text>
              <Text style={styles.userNameText}>{user.name}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={signOut} style={styles.logoutBtn}>
                <FontAwesome name="sign-out" size={18} color="#ff4444" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleShare} style={[styles.shareBtn, { marginLeft: 10 }]}>
                <FontAwesome name="share-alt" size={18} color={tint} />
              </TouchableOpacity>
              {user.role === 'staff' && (
                <TouchableOpacity 
                  onPress={() => router.push('/kitchen')} 
                  style={[styles.shareBtn, { marginLeft: 10, backgroundColor: '#00BCD422' }]}
                >
                  <FontAwesome name="cutlery" size={18} color="#00BCD4" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ) : (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'transparent' }}>
            <TouchableOpacity onPress={() => router.push('/login')} style={styles.loginBtn}>
              <FontAwesome name="user-circle" size={20} color={tint} />
              <Text style={[styles.loginText, { color: tint }]}>Login to Vibe</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleShare} style={styles.shareBtn}>
              <FontAwesome name="share-alt" size={18} color={tint} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Hero Section */}
      <View style={styles.heroContainer}>
        <ImageBackground 
          source={{ uri: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800' }} 
          style={styles.heroImage}
        >
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Mzansi Lifestyle Lounge</Text>
            <Text style={styles.heroSubtitle}>Where vibes, flavors, and class meet.</Text>
            <TouchableOpacity 
              style={[styles.ctaButton, { backgroundColor: tint }]}
              onPress={handleBookTable}
            >
              <Text style={styles.ctaText}>Book a Table</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsGrid}>
        <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/(tabs)/menu')}>
          <View style={[styles.iconCircle, { backgroundColor: '#FF8C0022' }]}>
            <FontAwesome name="fire" size={24} color="#FF8C00" />
          </View>
          <Text style={styles.actionLabel}>Braai Hub</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/(tabs)/carwash')}>
          <View style={[styles.iconCircle, { backgroundColor: '#2196F322' }]}>
            <FontAwesome name="car" size={24} color="#2196F3" />
          </View>
          <Text style={styles.actionLabel}>Carwash</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/(tabs)/menu')}>
          <View style={[styles.iconCircle, { backgroundColor: '#4CAF5022' }]}>
            <FontAwesome name="glass" size={24} color="#4CAF50" />
          </View>
          <Text style={styles.actionLabel}>Drinks</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/events')}>
          <View style={[styles.iconCircle, { backgroundColor: '#E91E6322' }]}>
            <FontAwesome name="music" size={24} color="#E91E63" />
          </View>
          <Text style={styles.actionLabel}>Events</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Today</Text>
          <TouchableOpacity><Text style={{ color: tint }}>See All</Text></TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredScroll}>
          <View style={styles.featuredCard}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400' }} style={styles.featuredImage} />
            <View style={styles.featuredContent}>
              <Text style={styles.featuredName}>T-Bone Special</Text>
              <Text style={styles.featuredPrice}>R185</Text>
            </View>
          </View>

          <View style={styles.featuredCard}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400' }} style={styles.featuredImage} />
            <View style={styles.featuredContent}>
              <Text style={styles.featuredName}>Sunset Cocktail</Text>
              <Text style={styles.featuredPrice}>R85</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Gallery Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>The Vibe Gallery</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryScroll}>
          {[
            'https://images.unsplash.com/photo-1544025162-d76694265947?w=400',
            'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
            'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400',
            'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?w=400',
            'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
          ].map((url, index) => (
            <Image key={index} source={{ uri: url }} style={styles.galleryImage} />
          ))}
        </ScrollView>
      </View>

      {/* Live Vibe Indicator */}
      <View style={styles.vibeCard}>
        <View style={styles.vibeInfo}>
          <View style={styles.liveIndicator} />
          <Text style={styles.vibeText}>The lounge is currently VIBRANT (Busy)</Text>
        </View>
        <Text style={styles.vibeSubtext}>Estimated carwash wait: 35 mins</Text>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topProfileBar: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'transparent',
  },
  userSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  userInfo: {
    backgroundColor: 'transparent',
  },
  welcomeText: {
    fontSize: 12,
    opacity: 0.6,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  userNameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutBtn: {
    padding: 10,
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    borderRadius: 12,
  },
  shareBtn: {
    padding: 10,
    backgroundColor: 'rgba(212, 136, 6, 0.1)',
    borderRadius: 12,
  },
  loginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(212, 136, 6, 0.1)',
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  loginText: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 14,
  },
  heroContainer: {
    height: 300,
    width: '100%',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
    opacity: 0.9,
  },
  ctaButton: {
    marginTop: 20,
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  ctaText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-around',
    marginTop: -30,
    backgroundColor: 'transparent',
  },
  actionCard: {
    width: '22%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    padding: 20,
    marginTop: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  featuredScroll: {
    flexDirection: 'row',
  },
  featuredCard: {
    width: 200,
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#33333311',
    borderWidth: 1,
    borderColor: '#33333322',
  },
  featuredImage: {
    width: '100%',
    height: 120,
  },
  featuredContent: {
    padding: 12,
    backgroundColor: 'transparent',
  },
  featuredName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  featuredPrice: {
    fontSize: 14,
    color: '#FFA500',
    marginTop: 4,
    fontWeight: 'bold',
  },
  galleryScroll: {
    flexDirection: 'row',
  },
  galleryImage: {
    width: 150,
    height: 150,
    borderRadius: 15,
    marginRight: 10,
  },
  vibeCard: {
    margin: 20,
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#1A1A1A',
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50',
  },
  vibeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  liveIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    marginRight: 10,
  },
  vibeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  vibeSubtext: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 5,
  },
});
