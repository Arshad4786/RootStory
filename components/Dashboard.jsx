import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Package,
  CheckCircle,
  AlertTriangle,
  Leaf,
  Factory,
  Truck,
  TestTube,
  MapPin,
  Calendar,
  Shield,
  Award
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function SupplyChainDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('volume');

  // Mock dashboard data
  const dashboardData = {
    overview: {
      totalBatches: 1247,
      activeFarmers: 89,
      verifiedProducts: 1156,
      pendingVerification: 91,
      totalVolume: "15.2 tons",
      sustainabilityScore: 8.4
    },
    
    recentActivity: [
      {
        type: 'collection',
        farmer: 'Ramesh Kumar',
        herb: 'Ashwagandha',
        quantity: '12kg',
        location: 'Nashik, MH',
        time: '2 hours ago',
        status: 'verified'
      },
      {
        type: 'processing',
        processor: 'SunDried Organics',
        herb: 'Tulsi',
        quantity: '8kg',
        location: 'Aurangabad, MH',
        time: '4 hours ago',
        status: 'in-progress'
      },
      {
        type: 'testing',
        lab: 'AyurTest Labs',
        herb: 'Brahmi',
        batch: 'BR_2025_B7C3',
        time: '6 hours ago',
        status: 'completed'
      },
      {
        type: 'manufacturing',
        manufacturer: 'AyurPhoria Wellness',
        product: 'Ashwagandha Capsules',
        batch: '1000 units',
        time: '8 hours ago',
        status: 'completed'
      }
    ],

    topHerbs: [
      { name: 'Ashwagandha', volume: '4.2 tons', batches: 342, growth: '+12%' },
      { name: 'Tulsi', volume: '3.8 tons', batches: 298, growth: '+8%' },
      { name: 'Brahmi', volume: '2.1 tons', batches: 156, growth: '+15%' },
      { name: 'Giloy', volume: '1.9 tons', batches: 134, growth: '+3%' },
      { name: 'Neem', volume: '1.6 tons', batches: 127, growth: '+6%' }
    ],

    qualityMetrics: {
      passRate: 94.2,
      averageTestTime: '2.3 days',
      rejectedBatches: 8,
      certificationRate: 89.1
    },

    supplyChainStats: {
      farmers: { active: 89, verified: 82, pending: 7 },
      processors: { active: 12, verified: 11, pending: 1 },
      manufacturers: { active: 6, verified: 6, pending: 0 },
      distributors: { active: 24, verified: 23, pending: 1 }
    },

    alerts: [
      {
        type: 'warning',
        message: 'Quality test pending for batch ASH_2025_A8X9 (overdue by 1 day)',
        priority: 'medium'
      },
      {
        type: 'success',
        message: 'New organic certification received for Farmer Group #23',
        priority: 'low'
      },
      {
        type: 'error',
        message: 'GPS tracking lost for shipment TR_445821',
        priority: 'high'
      }
    ]
  };

  const renderMetricCard = (title, value, subtitle, icon, color = '#386641') => {
    const Icon = icon;
    return (
      <View style={[styles.metricCard, { borderLeftColor: color }]}>
        <View style={styles.metricHeader}>
          <Icon color={color} size={20} />
          <Text style={styles.metricTitle}>{title}</Text>
        </View>
        <Text style={styles.metricValue}>{value}</Text>
        {subtitle && <Text style={styles.metricSubtitle}>{subtitle}</Text>}
      </View>
    );
  };

  const renderActivityItem = (activity, index) => {
    const getActivityIcon = (type) => {
      switch(type) {
        case 'collection': return Leaf;
        case 'processing': return Factory;
        case 'testing': return TestTube;
        case 'manufacturing': return Package;
        default: return Package;
      }
    };

    const getStatusColor = (status) => {
      switch(status) {
        case 'verified': 
        case 'completed': return '#6A994E';
        case 'in-progress': return '#DDA15E';
        case 'pending': return '#BC6C25';
        default: return '#606C38';
      }
    };

    const ActivityIcon = getActivityIcon(activity.type);
    const statusColor = getStatusColor(activity.status);

    return (
      <View key={index} style={styles.activityItem}>
        <View style={[styles.activityIcon, { backgroundColor: statusColor }]}>
          <ActivityIcon color="#FFF" size={16} />
        </View>
        <View style={styles.activityContent}>
          <Text style={styles.activityTitle}>
            {activity.farmer || activity.processor || activity.lab || activity.manufacturer}
          </Text>
          <Text style={styles.activityDetail}>
            {activity.herb && `${activity.herb} - ${activity.quantity || activity.batch}`}
            {activity.product && activity.product}
          </Text>
          <Text style={styles.activityLocation}>
            📍 {activity.location || 'Processing facility'}
          </Text>
        </View>
        <View style={styles.activityMeta}>
          <Text style={[styles.activityStatus, { color: statusColor }]}>
            {activity.status.toUpperCase()}
          </Text>
          <Text style={styles.activityTime}>{activity.time}</Text>
        </View>
      </View>
    );
  };

  const renderAlert = (alert, index) => {
    const getAlertColor = (type) => {
      switch(type) {
        case 'error': return '#BC4749';
        case 'warning': return '#DDA15E';
        case 'success': return '#6A994E';
        default: return '#606C38';
      }
    };

    const AlertIcon = alert.type === 'error' ? AlertTriangle : 
                     alert.type === 'warning' ? AlertTriangle : CheckCircle;
    
    return (
      <View key={index} style={[styles.alertItem, { borderLeftColor: getAlertColor(alert.type) }]}>
        <AlertIcon color={getAlertColor(alert.type)} size={16} />
        <Text style={styles.alertText}>{alert.message}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Supply Chain Dashboard</Text>
          <Text style={styles.headerSubtitle}>Real-time blockchain analytics</Text>
        </View>

        {/* Time Filter */}
        <View style={styles.filterContainer}>
          {['7d', '30d', '90d', '1y'].map((timeframe) => (
            <TouchableOpacity
              key={timeframe}
              style={[
                styles.filterButton,
                selectedTimeframe === timeframe && styles.filterButtonActive
              ]}
              onPress={() => setSelectedTimeframe(timeframe)}
            >
              <Text style={[
                styles.filterButtonText,
                selectedTimeframe === timeframe && styles.filterButtonTextActive
              ]}>
                {timeframe}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Key Metrics Grid */}
        <View style={styles.metricsGrid}>
          {renderMetricCard(
            'Total Batches', 
            dashboardData.overview.totalBatches.toLocaleString(), 
            '+12% from last month',
            Package
          )}
          {renderMetricCard(
            'Active Farmers', 
            dashboardData.overview.activeFarmers.toString(), 
            '82 verified',
            Users,
            '#6A994E'
          )}
          {renderMetricCard(
            'Verified Products', 
            dashboardData.overview.verifiedProducts.toLocaleString(), 
            `${dashboardData.overview.pendingVerification} pending`,
            Shield,
            '#DDA15E'
          )}
          {renderMetricCard(
            'Total Volume', 
            dashboardData.overview.totalVolume, 
            'This month',
            TrendingUp,
            '#BC6C25'
          )}
        </View>

        {/* Quality Overview */}
        <View style={styles.qualityCard}>
          <Text style={styles.cardTitle}>🎯 Quality Metrics</Text>
          <View style={styles.qualityGrid}>
            <View style={styles.qualityItem}>
              <Text style={styles.qualityValue}>{dashboardData.qualityMetrics.passRate}%</Text>
              <Text style={styles.qualityLabel}>Pass Rate</Text>
            </View>
            <View style={styles.qualityItem}>
              <Text style={styles.qualityValue}>{dashboardData.qualityMetrics.averageTestTime}</Text>
              <Text style={styles.qualityLabel}>Avg Test Time</Text>
            </View>
            <View style={styles.qualityItem}>
              <Text style={styles.qualityValue}>{dashboardData.qualityMetrics.rejectedBatches}</Text>
              <Text style={styles.qualityLabel}>Rejected Batches</Text>
            </View>
            <View style={styles.qualityItem}>
              <Text style={styles.qualityValue}>{dashboardData.qualityMetrics.certificationRate}%</Text>
              <Text style={styles.qualityLabel}>Certification Rate</Text>
            </View>
          </View>
        </View>

        {/* Top Performing Herbs */}
        <View style={styles.herbsCard}>
          <Text style={styles.cardTitle}>🌿 Top Performing Herbs</Text>
          {dashboardData.topHerbs.map((herb, index) => (
            <View key={index} style={styles.herbItem}>
              <View style={styles.herbInfo}>
                <Text style={styles.herbName}>{herb.name}</Text>
                <Text style={styles.herbVolume}>{herb.volume} • {herb.batches} batches</Text>
              </View>
              <Text style={[styles.herbGrowth, { color: '#6A994E' }]}>{herb.growth}</Text>
            </View>
          ))}
        </View>

        {/* Supply Chain Network */}
        <View style={styles.networkCard}>
          <Text style={styles.cardTitle}>🔗 Network Status</Text>
          <View style={styles.networkGrid}>
            {Object.entries(dashboardData.supplyChainStats).map(([role, stats]) => (
              <View key={role} style={styles.networkItem}>
                <Text style={styles.networkRole}>{role.charAt(0).toUpperCase() + role.slice(1)}</Text>
                <Text style={styles.networkActive}>{stats.active} Active</Text>
                <Text style={styles.networkVerified}>✅ {stats.verified} Verified</Text>
                {stats.pending > 0 && (
                  <Text style={styles.networkPending}>⏳ {stats.pending} Pending</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activityCard}>
          <Text style={styles.cardTitle}>⚡ Recent Activity</Text>
          {dashboardData.recentActivity.map((activity, index) => 
            renderActivityItem(activity, index)
          )}
        </View>

        {/* Alerts */}
        <View style={styles.alertsCard}>
          <Text style={styles.cardTitle}>🚨 System Alerts</Text>
          {dashboardData.alerts.map((alert, index) => renderAlert(alert, index))}
        </View>

        {/* Blockchain Stats */}
        <View style={styles.blockchainCard}>
          <Text style={styles.cardTitle}>⛓️ Blockchain Status</Text>
          <View style={styles.blockchainStats}>
            <View style={styles.blockchainItem}>
              <Text style={styles.blockchainLabel}>Network Health</Text>
              <View style={styles.statusIndicator}>
                <View style={[styles.statusDot, { backgroundColor: '#6A994E' }]} />
                <Text style={styles.statusText}>Healthy</Text>
              </View>
            </View>
            <View style={styles.blockchainItem}>
              <Text style={styles.blockchainLabel}>Transaction Pool</Text>
              <Text style={styles.blockchainValue}>3 pending</Text>
            </View>
            <View style={styles.blockchainItem}>
              <Text style={styles.blockchainLabel}>Last Block</Text>
              <Text style={styles.blockchainValue}>2 min ago</Text>
            </View>
            <View style={styles.blockchainItem}>
              <Text style={styles.blockchainLabel}>Gas Fee</Text>
              <Text style={styles.blockchainValue}>Low</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FEFAE0' },
  container: { padding: 20, flexGrow: 1 },

  header: {
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#283618',
  },

  headerSubtitle: {
    fontSize: 14,
    color: '#606C38',
    marginTop: 4,
  },

  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 4,
  },

  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },

  filterButtonActive: {
    backgroundColor: '#386641',
  },

  filterButtonText: {
    fontSize: 14,
    color: '#606C38',
    fontWeight: '600',
  },

  filterButtonTextActive: {
    color: '#FEFAE0',
  },

  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  metricCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    elevation: 2,
  },

  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  metricTitle: {
    fontSize: 12,
    color: '#606C38',
    marginLeft: 6,
    fontWeight: '600',
  },

  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#283618',
    marginBottom: 4,
  },

  metricSubtitle: {
    fontSize: 11,
    color: '#6A994E',
  },

  qualityCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#283618',
    marginBottom: 16,
  },

  qualityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  qualityItem: {
    width: '48%',
    alignItems: 'center',
    backgroundColor: '#F0EAD6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },

  qualityValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#386641',
  },

  qualityLabel: {
    fontSize: 12,
    color: '#606C38',
    marginTop: 4,
  },

  herbsCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },

  herbItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EAD6',
  },

  herbInfo: {
    flex: 1,
  },

  herbName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#283618',
  },

  herbVolume: {
    fontSize: 12,
    color: '#606C38',
    marginTop: 2,
  },

  herbGrowth: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  networkCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },

  networkGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  networkItem: {
    width: '48%',
    backgroundColor: '#E8F5E8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },

  networkRole: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#283618',
    marginBottom: 4,
  },

  networkActive: {
    fontSize: 12,
    color: '#386641',
    fontWeight: '600',
  },

  networkVerified: {
    fontSize: 11,
    color: '#6A994E',
  },

  networkPending: {
    fontSize: 11,
    color: '#DDA15E',
  },

  activityCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },

  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EAD6',
  },

  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  activityContent: {
    flex: 1,
  },

  activityTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#283618',
  },

  activityDetail: {
    fontSize: 12,
    color: '#606C38',
    marginTop: 2,
  },

  activityLocation: {
    fontSize: 11,
    color: '#6A994E',
    marginTop: 2,
  },

  activityMeta: {
    alignItems: 'flex-end',
  },

  activityStatus: {
    fontSize: 10,
    fontWeight: 'bold',
  },

  activityTime: {
    fontSize: 11,
    color: '#BC6C25',
    marginTop: 2,
  },

  alertsCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },

  alertItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    marginBottom: 8,
    borderLeftWidth: 3,
  },

  alertText: {
    fontSize: 13,
    color: '#283618',
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },

  blockchainCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },

  blockchainStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  blockchainItem: {
    width: '48%',
    marginBottom: 12,
  },

  blockchainLabel: {
    fontSize: 12,
    color: '#606C38',
    marginBottom: 4,
  },

  blockchainValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#283618',
  },

  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },

  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6A994E',
  },
});