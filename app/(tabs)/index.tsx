import { Link } from 'expo-router';
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Sprout, 
  Factory, 
  Package, 
  QrCode, 
  BarChart3,
  Shield,
  TrendingUp,
  Users,
  CheckCircle,
  MapPin
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  // Mock real-time data for dashboard preview
  const liveStats = {
    activeBatches: 127,
    verifiedToday: 34,
    activeFarmers: 89,
    qualityScore: 94.2
  };

  type RoleHref = '/farmer' | '/processor' | '/manufacturer' | '/consumer';

  const roles: {
    name: string;
    href: RoleHref;
    icon: any;
    description: string;
    color: string;
  }[] = [
    { 
      name: 'Farmer / Collector', 
      href: '/farmer', 
      icon: Sprout,
      description: 'Log herb collections with GPS & photos',
      color: '#6A994E'
    },
    { 
      name: 'Processor / Lab', 
      href: '/processor', 
      icon: Factory,
      description: 'Track processing & quality testing',
      color: '#DDA15E'
    },
    { 
      name: 'Manufacturer', 
      href: '/manufacturer', 
      icon: Package,
      description: 'Monitor manufacturing & packaging',
      color: '#BC6C25'
    },
    { 
      name: 'Consumer Scanner', 
      href: '/consumer', 
      icon: QrCode,
      description: 'Scan products for full traceability',
      color: '#386641'
    }
  ];

  const quickStats = [
    { 
      label: 'Active Batches', 
      value: liveStats.activeBatches, 
      icon: Package,
      color: '#6A994E',
      change: '+12'
    },
    { 
      label: 'Verified Today', 
      value: liveStats.verifiedToday, 
      icon: CheckCircle,
      color: '#386641',
      change: '+8'
    },
    { 
      label: 'Active Farmers', 
      value: liveStats.activeFarmers, 
      icon: Users,
      color: '#DDA15E',
      change: '+3'
    },
    { 
      label: 'Quality Score', 
      value: `${liveStats.qualityScore}%`, 
      icon: Shield,
      color: '#BC6C25',
      change: '+2.1%'
    }
  ];

  const renderStatCard = (stat: { icon: any; label: boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | React.Key | null | undefined; color: any; change: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; value: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => {
    const Icon = stat.icon;
    return (
      <View key={String(stat.label)} style={[styles.statCard, { borderLeftColor: stat.color }]}>
        <View style={styles.statHeader}>
          <Icon color={stat.color} size={16} />
          <Text style={[styles.statChange, { color: stat.color }]}>
            {stat.change}
          </Text>
        </View>
        <Text style={styles.statValue}>{stat.value}</Text>
        <Text style={styles.statLabel}>{stat.label}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#386641" />
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>RootStory</Text>
          <Text style={styles.subtitle}>Blockchain-Powered Ayurvedic Herb Traceability</Text>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Blockchain Network: Active</Text>
          </View>
        </View>

        {/* Quick Stats Dashboard Preview */}
        <View style={styles.statsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Live Network Stats</Text>
            <Link href="/dashboard" asChild>
              <TouchableOpacity style={styles.viewAllButton}>
                <BarChart3 color="#FEFAE0" size={16} />
                <Text style={styles.viewAllText}>View Dashboard</Text>
              </TouchableOpacity>
            </Link>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.statsRow}
          >
            {quickStats.map(renderStatCard)}
          </ScrollView>
        </View>

        {/* Recent Activity Preview */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: '#6A994E' }]}>
                <Sprout color="#FFF" size={14} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>New collection: Ashwagandha 5kg</Text>
                <Text style={styles.activityTime}>2 hours ago • Nashik, MH</Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: '#DDA15E' }]}>
                <Factory color="#FFF" size={14} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Processing completed: Batch #A4B8C1</Text>
                <Text style={styles.activityTime}>4 hours ago • Aurangabad, MH</Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: '#386641' }]}>
                <CheckCircle color="#FFF" size={14} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Quality test passed: Purity 99.8%</Text>
                <Text style={styles.activityTime}>6 hours ago • Mumbai Lab</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Role Selection Cards */}
        <View style={styles.rolesSection}>
          <Text style={styles.sectionTitle}>Select Your Role</Text>
          <View style={styles.grid}>
            {roles.map((role) => (
              <Link href={role.href} asChild key={role.name} style={styles.cardLink}>
                <TouchableOpacity style={styles.card}>
                  <View style={[styles.cardIconContainer, { backgroundColor: `${role.color}15` }]}>
                    <role.icon color={role.color} size={32} />
                  </View>
                  <Text style={styles.cardTitle}>{role.name}</Text>
                  <Text style={styles.cardDescription}>{role.description}</Text>
                  <View style={styles.cardFooter}>
                    <Text style={[styles.cardAction, { color: role.color }]}>
                      Access Portal →
                    </Text>
                  </View>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </View>

        {/* System Status */}
        <View style={styles.systemStatus}>
          <Text style={styles.sectionTitle}>System Health</Text>
          <View style={styles.statusGrid}>
            <View style={styles.statusItem}>
              <Shield color="#6A994E" size={16} />
              <Text style={styles.statusItemLabel}>Blockchain</Text>
              <Text style={[styles.statusItemValue, { color: '#6A994E' }]}>Healthy</Text>
            </View>
            <View style={styles.statusItem}>
              <MapPin color="#6A994E" size={16} />
              <Text style={styles.statusItemLabel}>GPS Services</Text>
              <Text style={[styles.statusItemValue, { color: '#6A994E' }]}>Active</Text>
            </View>
            <View style={styles.statusItem}>
              <TrendingUp color="#6A994E" size={16} />
              <Text style={styles.statusItemLabel}>Network</Text>
              <Text style={[styles.statusItemValue, { color: '#6A994E' }]}>Optimal</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#386641',
  },
  
  container: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  
  header: {
    alignItems: 'center',
    padding: 30,
    paddingBottom: 20,
  },
  
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FEFAE0',
    marginBottom: 8,
  },
  
  subtitle: {
    fontSize: 16,
    color: '#DDA15E',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
  },
  
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(106, 153, 78, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#6A994E',
  },
  
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6A994E',
    marginRight: 8,
  },
  
  statusText: {
    fontSize: 12,
    color: '#FEFAE0',
    fontWeight: '600',
  },
  
  statsSection: {
    backgroundColor: '#FEFAE0',
    paddingTop: 20,
  },
  
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#283618',
  },
  
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#386641',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  
  viewAllText: {
    color: '#FEFAE0',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  
  statsRow: {
    paddingHorizontal: 20,
    gap: 12,
  },
  
  statCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    minWidth: 120,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  statChange: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#283618',
    marginBottom: 4,
  },
  
  statLabel: {
    fontSize: 11,
    color: '#606C38',
  },
  
  activitySection: {
    backgroundColor: '#FEFAE0',
    padding: 20,
    paddingTop: 16,
  },
  
  activityList: {
    marginTop: 12,
  },
  
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    elevation: 1,
  },
  
  activityIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  
  activityContent: {
    flex: 1,
  },
  
  activityText: {
    fontSize: 14,
    color: '#283618',
    fontWeight: '600',
  },
  
  activityTime: {
    fontSize: 12,
    color: '#606C38',
    marginTop: 2,
  },
  
  rolesSection: {
    backgroundColor: '#FEFAE0',
    padding: 20,
    paddingTop: 0,
  },
  
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  
  cardLink: {
    width: '48%',
    marginBottom: 16,
  },
  
  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    minHeight: 160,
  },
  
  cardIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#283618',
    textAlign: 'center',
    marginBottom: 8,
  },
  
  cardDescription: {
    fontSize: 12,
    color: '#606C38',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 12,
  },
  
  cardFooter: {
    marginTop: 'auto',
  },
  
  cardAction: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  
  systemStatus: {
    backgroundColor: '#FEFAE0',
    padding: 20,
    paddingTop: 0,
  },
  
  statusGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    elevation: 2,
  },
  
  statusItem: {
    alignItems: 'center',
  },
  
  statusItemLabel: {
    fontSize: 12,
    color: '#606C38',
    marginTop: 6,
    marginBottom: 2,
  },
  
  statusItemValue: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});