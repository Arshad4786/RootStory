import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Package, 
  Truck, 
  MapPin, 
  Factory,
  CheckCircle,
  AlertCircle,
  QrCode,
  TestTube,
  Shield,
  Calendar,
  User,
  Leaf,
  Award,
  Plus,
  Edit3,
  Eye,
  LucideIcon
} from 'lucide-react-native';

export default function ManufacturerScreen() {
  const [selectedTab, setSelectedTab] = useState('register');
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showTraceModal, setShowTraceModal] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<ManufacturingBatch | null>(null);
  
  // Form states
  const [productName, setProductName] = useState('');
  const [batchSize, setBatchSize] = useState('');
  const [rawMaterial, setRawMaterial] = useState('');
  const [rawMaterialQty, setRawMaterialQty] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Enhanced timeline data with more detailed information
  const timelineData = [
    { 
      icon: Leaf, 
      title: 'Raw Material Received', 
      details: 'Premium Ashwagandha Powder, 5kg',
      supplier: 'SunDried Organics Ltd.',
      date: '2025-09-15',
      time: '09:30 AM',
      quality: 'Grade A+',
      certifications: ['Organic', 'Fair Trade'],
      blockchainHash: '0x1a2b3c4d5e6f',
      status: 'verified'
    },
    { 
      icon: TestTube, 
      title: 'Quality Testing Initiated', 
      details: 'Comprehensive lab analysis started',
      lab: 'AyurTest Labs Pvt. Ltd.',
      date: '2025-09-15',
      time: '11:00 AM',
      tests: ['Purity', 'Potency', 'Heavy Metals', 'Microbials'],
      status: 'in-progress'
    },
    { 
      icon: Factory, 
      title: 'Manufacturing Process', 
      details: 'GMP-certified production facility',
      operator: 'AyurPhoria Wellness Pvt. Ltd.',
      date: '2025-09-16',
      time: '08:00 AM',
      process: 'Standardized extraction & encapsulation',
      batchNo: 'APW/ASH/2025/091',
      status: 'completed'
    },
    { 
      icon: Package, 
      title: 'Final Product Packaged', 
      details: 'Ashwagandha Capsules, 1000 units',
      packagingType: 'Tamper-proof HDPE bottles',
      date: '2025-09-17',
      time: '14:30 PM',
      qrCodes: 1000,
      status: 'completed'
    },
    { 
      icon: Truck, 
      title: 'Ready for Distribution', 
      details: 'Awaiting shipment authorization',
      distributor: 'HerbalExpress Logistics',
      date: '2025-09-18',
      time: 'Pending',
      destination: 'Regional Distribution Centers',
      status: 'pending'
    },
  ];

  // Mock manufacturing batches
  const [manufacturingBatches, setManufacturingBatches] = useState([
    {
      id: 'APW_ASH_2025_091',
      productName: 'Ashwagandha Capsules 500mg',
      batchSize: '1000 units',
      rawMaterial: 'Ashwagandha Powder',
      rawMaterialQty: '5kg',
      manufacturingDate: '2025-09-16',
      expiryDate: '2027-09-16',
      status: 'completed',
      quality: 'Grade A+',
      certifications: ['GMP', 'AYUSH', 'Organic'],
      blockchainHash: '0x8h9i0j1k2l3m',
      qrGenerated: true
    },
    {
      id: 'APW_TUL_2025_089',
      productName: 'Tulsi Extract Tablets',
      batchSize: '500 units',
      rawMaterial: 'Tulsi Extract',
      rawMaterialQty: '2kg',
      manufacturingDate: '2025-09-14',
      expiryDate: '2027-09-14',
      status: 'quality-testing',
      quality: 'Pending',
      certifications: ['GMP', 'AYUSH'],
      blockchainHash: '0x7g8h9i0j1k2l',
      qrGenerated: false
    },
    {
      id: 'APW_BRA_2025_087',
      productName: 'Brahmi Memory Boost',
      batchSize: '750 units',
      rawMaterial: 'Brahmi Extract',
      rawMaterialQty: '3kg',
      manufacturingDate: '2025-09-12',
      expiryDate: '2027-09-12',
      status: 'packaging',
      quality: 'Grade A',
      certifications: ['GMP', 'AYUSH', 'Fair Trade'],
      blockchainHash: '0x6f7g8h9i0j1k',
      qrGenerated: false
    }
  ]);

  const handleSubmit = async () => {
    // Enhanced validation
    if (!productName.trim() || !batchSize.trim() || !rawMaterial.trim() || !rawMaterialQty.trim()) {
      Alert.alert('Validation Error', 'Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate blockchain registration process
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert('🔗 Creating blockchain record...', 'Please wait');
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      Alert.alert('📦 Registering product batch...', 'Generating unique identifiers');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate new batch
      const newBatch = {
        id: `APW_${rawMaterial.substring(0, 3).toUpperCase()}_2025_${Math.floor(Math.random() * 1000)}`,
        productName: productName.trim(),
        batchSize: `${batchSize} units`,
        rawMaterial: rawMaterial.trim(),
        rawMaterialQty: `${rawMaterialQty}kg`,
        manufacturingDate: new Date().toISOString().split('T')[0],
        expiryDate: new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'registered',
        quality: 'Pending Testing',
        certifications: ['GMP', 'AYUSH'],
        blockchainHash: `0x${Math.random().toString(16).substr(2, 12)}`,
        qrGenerated: false
      };

      setManufacturingBatches([newBatch, ...manufacturingBatches]);
      setShowRegistrationModal(true);
      
      // Reset form
      setProductName('');
      setBatchSize('');
      setRawMaterial('');
      setRawMaterialQty('');
      
      Alert.alert('✅ Registration Successful', `Batch ${newBatch.id} has been registered on blockchain`);
      
    } catch (error) {
      Alert.alert('Registration Error', 'Failed to register batch. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const viewBatchTrace = (batch: ManufacturingBatch) => {
    setSelectedBatch(batch);
    setShowTraceModal(true);
  };

  const renderTimelineItem = (item: { icon: LucideIcon; title: string; details: string; supplier: string; date: string; time: string; quality: string; certifications: string[]; blockchainHash: string; status: string; lab?: undefined; tests?: undefined; operator?: undefined; process?: undefined; batchNo?: undefined; packagingType?: undefined; qrCodes?: undefined; distributor?: undefined; destination?: undefined; } | { icon: LucideIcon; title: string; details: string; lab: string; date: string; time: string; tests: string[]; status: string; supplier?: undefined; quality?: undefined; certifications?: undefined; blockchainHash?: undefined; operator?: undefined; process?: undefined; batchNo?: undefined; packagingType?: undefined; qrCodes?: undefined; distributor?: undefined; destination?: undefined; } | { icon: LucideIcon; title: string; details: string; operator: string; date: string; time: string; process: string; batchNo: string; status: string; supplier?: undefined; quality?: undefined; certifications?: undefined; blockchainHash?: undefined; lab?: undefined; tests?: undefined; packagingType?: undefined; qrCodes?: undefined; distributor?: undefined; destination?: undefined; } | { icon: LucideIcon; title: string; details: string; packagingType: string; date: string; time: string; qrCodes: number; status: string; supplier?: undefined; quality?: undefined; certifications?: undefined; blockchainHash?: undefined; lab?: undefined; tests?: undefined; operator?: undefined; process?: undefined; batchNo?: undefined; distributor?: undefined; destination?: undefined; } | { icon: LucideIcon; title: string; details: string; distributor: string; date: string; time: string; destination: string; status: string; supplier?: undefined; quality?: undefined; certifications?: undefined; blockchainHash?: undefined; lab?: undefined; tests?: undefined; operator?: undefined; process?: undefined; batchNo?: undefined; packagingType?: undefined; qrCodes?: undefined; }, index: React.Key | null | undefined) => {
    const statusColors = {
      'verified': '#6A994E',
      'completed': '#6A994E',
      'in-progress': '#DDA15E',
      'pending': '#BC6C25'
    } as const;

    type StatusKey = keyof typeof statusColors;

    const statusColor = statusColors[item.status as StatusKey] || '#606C38';

    return (
      <View key={index} style={styles.timelineRow}>
        {index !== timelineData.length - 1 && <View style={styles.connector} />}
        <View style={[styles.timelineIconContainer, { backgroundColor: statusColor }]}>
          <item.icon color="#FEFAE0" size={20} />
        </View>
        <View style={styles.timelineContent}>
          <View style={styles.timelineHeader}>
            <Text style={styles.timelineTitle}>{item.title}</Text>
            <Text style={[styles.timelineStatus, { color: statusColor }]}>
              {item.status.toUpperCase()}
            </Text>
          </View>
          <Text style={styles.timelineDetails}>{item.details}</Text>
          <Text style={styles.timelineActor}>
            {item.supplier || item.lab || item.operator || item.distributor}
          </Text>
          <View style={styles.timelineFooter}>
            <Text style={styles.timelineDate}>📅 {item.date}</Text>
            <Text style={styles.timelineTime}>🕒 {item.time}</Text>
          </View>
          {item.blockchainHash && (
            <Text style={styles.blockchainHash}>🔗 {item.blockchainHash}</Text>
          )}
        </View>
      </View>
    );
  };

  type ManufacturingBatch = {
    id: string;
    productName: string;
    batchSize: string;
    rawMaterial: string;
    rawMaterialQty: string;
    manufacturingDate: string;
    expiryDate: string;
    status: string;
    quality: string;
    certifications: string[];
    blockchainHash: string;
    qrGenerated: boolean;
  };

  const renderBatchCard = (batch: ManufacturingBatch, index: number) => {
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'completed': return '#6A994E';
        case 'quality-testing': return '#DDA15E';
        case 'packaging': return '#BC6C25';
        case 'registered': return '#606C38';
        default: return '#606C38';
      }
    };

    return (
      <View key={index} style={styles.batchCard}>
        <View style={styles.batchHeader}>
          <View style={styles.batchInfo}>
            <Text style={styles.batchId}>{batch.id}</Text>
            <Text style={styles.batchProduct}>{batch.productName}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(batch.status) }]}>
            <Text style={styles.statusText}>{batch.status.replace('-', ' ').toUpperCase()}</Text>
          </View>
        </View>
        
        <View style={styles.batchDetails}>
          <Text style={styles.batchDetail}>📦 {batch.batchSize}</Text>
          <Text style={styles.batchDetail}>🌿 {batch.rawMaterial} ({batch.rawMaterialQty})</Text>
          <Text style={styles.batchDetail}>📅 Mfg: {batch.manufacturingDate}</Text>
          <Text style={styles.batchDetail}>⭐ Quality: {batch.quality}</Text>
        </View>

        <View style={styles.batchCertifications}>
          {batch.certifications.map((cert, certIndex) => (
            <View key={certIndex} style={styles.certBadge}>
              <Text style={styles.certText}>{cert}</Text>
            </View>
          ))}
        </View>

        <View style={styles.batchActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => viewBatchTrace(batch)}
          >
            <Eye color="#FEFAE0" size={16} />
            <Text style={styles.actionButtonText}>View Trace</Text>
          </TouchableOpacity>
          
          {batch.qrGenerated && (
            <TouchableOpacity style={[styles.actionButton, styles.qrButton]}>
              <QrCode color="#FEFAE0" size={16} />
              <Text style={styles.actionButtonText}>QR Codes</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.batchHash}>🔗 {batch.blockchainHash}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Enhanced Header */}
        <View style={styles.header}>
          <Factory color="#386641" size={32} />
          <Text style={styles.headerTitle}>Manufacturing Hub</Text>
          <Text style={styles.headerSubtitle}>Blockchain-powered product registration & traceability</Text>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 'register' && styles.tabActive]}
            onPress={() => setSelectedTab('register')}
          >
            <Plus color={selectedTab === 'register' ? '#FEFAE0' : '#606C38'} size={18} />
            <Text style={[styles.tabText, selectedTab === 'register' && styles.tabTextActive]}>
              Register Batch
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 'batches' && styles.tabActive]}
            onPress={() => setSelectedTab('batches')}
          >
            <Package color={selectedTab === 'batches' ? '#FEFAE0' : '#606C38'} size={18} />
            <Text style={[styles.tabText, selectedTab === 'batches' && styles.tabTextActive]}>
              My Batches
            </Text>
          </TouchableOpacity>
        </View>

        {selectedTab === 'register' && (
          <>
            {/* Product Registration Form */}
            <View style={styles.formCard}>
              <Text style={styles.cardTitle}>📝 New Product Registration</Text>
              
              <View style={styles.inputGroup}>
                <Package color="#6A994E" size={20} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Product Name (e.g., Ashwagandha Capsules 500mg)"
                  placeholderTextColor="#606C38"
                  value={productName}
                  onChangeText={setProductName}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.unitBadge}>UNITS</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Batch Size (e.g., 1000)"
                  placeholderTextColor="#606C38"
                  keyboardType="numeric"
                  value={batchSize}
                  onChangeText={setBatchSize}
                />
              </View>

              <View style={styles.inputGroup}>
                <Leaf color="#6A994E" size={20} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Raw Material (e.g., Ashwagandha Powder)"
                  placeholderTextColor="#606C38"
                  value={rawMaterial}
                  onChangeText={setRawMaterial}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.unitBadge}>KG</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Quantity Used (e.g., 5.5)"
                  placeholderTextColor="#606C38"
                  keyboardType="decimal-pad"
                  value={rawMaterialQty}
                  onChangeText={setRawMaterialQty}
                />
              </View>

              {/* Progress Indicator */}
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[
                    styles.progressFill, 
                    { width: `${((productName ? 1 : 0) + (batchSize ? 1 : 0) + (rawMaterial ? 1 : 0) + (rawMaterialQty ? 1 : 0)) * 25}%` }
                  ]} />
                </View>
                <Text style={styles.progressText}>
                  {Math.round(((productName ? 1 : 0) + (batchSize ? 1 : 0) + (rawMaterial ? 1 : 0) + (rawMaterialQty ? 1 : 0)) * 25)}% Complete
                </Text>
              </View>

              <TouchableOpacity 
                style={[
                  styles.submitButton, 
                  isLoading && styles.submitButtonLoading,
                  (!productName || !batchSize || !rawMaterial || !rawMaterialQty) && styles.submitButtonDisabled
                ]} 
                onPress={handleSubmit}
                disabled={isLoading || !productName || !batchSize || !rawMaterial || !rawMaterialQty}
              >
                <Text style={styles.submitButtonText}>
                  {isLoading ? '⛓️ Registering on Blockchain...' : '🔗 Register Product Batch'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Current Batch Timeline */}
            <View style={styles.timelineCard}>
              <Text style={styles.cardTitle}>🔄 Current Batch Journey</Text>
              <Text style={styles.cardSubtitle}>Batch #A4B8C1 - Live tracking</Text>
              
              <View style={styles.timelineContainer}>
                {timelineData.map((item, index) => renderTimelineItem(item, index))}
              </View>
            </View>
          </>
        )}

        {selectedTab === 'batches' && (
          <View style={styles.batchesCard}>
            <Text style={styles.cardTitle}>📦 Manufacturing Batches</Text>
            <Text style={styles.cardSubtitle}>{manufacturingBatches.length} batches registered</Text>
            
            {manufacturingBatches.map((batch, index) => renderBatchCard(batch, index))}
          </View>
        )}

      </ScrollView>

      {/* Registration Success Modal */}
      <Modal visible={showRegistrationModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🎉 Registration Successful!</Text>
            <Text style={styles.modalSubtext}>Your product batch is now on the blockchain</Text>
            
            <View style={styles.successContainer}>
              <CheckCircle color="#6A994E" size={60} />
              <Text style={styles.successText}>BLOCKCHAIN CONFIRMED</Text>
            </View>
            
            <View style={styles.modalStats}>
              <Text style={styles.statText}>✅ Unique ID Generated</Text>
              <Text style={styles.statText}>🔗 Blockchain Record Created</Text>
              <Text style={styles.statText}>📱 QR Codes Ready</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={() => setShowRegistrationModal(false)}
            >
              <Text style={styles.modalButtonText}>Continue Manufacturing 🏭</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Batch Trace Modal */}
      <Modal visible={showTraceModal} animationType="slide">
        <SafeAreaView style={styles.modalSafeArea}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderTitle}>📋 Batch Traceability</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowTraceModal(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          {selectedBatch && (
            <ScrollView style={styles.modalScrollView}>
              <View style={styles.batchSummary}>
                <Text style={styles.summaryTitle}>{selectedBatch.productName}</Text>
                <Text style={styles.summaryId}>ID: {selectedBatch.id}</Text>
                <Text style={styles.summaryDetails}>
                  📦 {selectedBatch.batchSize} • 🌿 {selectedBatch.rawMaterial}
                </Text>
                <Text style={styles.summaryHash}>🔗 {selectedBatch.blockchainHash}</Text>
              </View>
              
              <View style={styles.timelineCard}>
                <Text style={styles.cardTitle}>🔄 Supply Chain Journey</Text>
                <View style={styles.timelineContainer}>
                  {timelineData.map((item, index) => renderTimelineItem(item, index))}
                </View>
              </View>
            </ScrollView>
          )}
        </SafeAreaView>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FEFAE0' },
  container: { padding: 20, flexGrow: 1 },
  
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#283618',
    marginTop: 8,
  },
  
  headerSubtitle: {
    fontSize: 14,
    color: '#606C38',
    textAlign: 'center',
    marginTop: 4,
  },

  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    elevation: 2,
  },

  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },

  tabActive: {
    backgroundColor: '#386641',
  },

  tabText: {
    fontSize: 14,
    color: '#606C38',
    fontWeight: '600',
    marginLeft: 6,
  },

  tabTextActive: {
    color: '#FEFAE0',
  },

  formCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#283618',
    marginBottom: 8,
  },

  cardSubtitle: {
    fontSize: 12,
    color: '#606C38',
    marginBottom: 16,
  },
  
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0EAD6',
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E8DCC0',
  },
  
  inputIcon: { marginHorizontal: 15 },
  
  unitBadge: {
    backgroundColor: '#6A994E',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 10,
    color: '#FEFAE0',
    fontWeight: 'bold',
    fontSize: 12,
  },
  
  input: {
    flex: 1,
    height: 50,
    color: '#283618',
    fontSize: 16,
    paddingHorizontal: 15,
  },

  progressContainer: {
    marginBottom: 20,
  },
  
  progressBar: {
    height: 6,
    backgroundColor: '#E8DCC0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  
  progressFill: {
    height: '100%',
    backgroundColor: '#6A994E',
    borderRadius: 3,
  },
  
  progressText: {
    fontSize: 12,
    color: '#6A994E',
    textAlign: 'center',
    marginTop: 6,
    fontWeight: '600',
  },
  
  submitButton: {
    backgroundColor: '#386641',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
  
  submitButtonLoading: {
    backgroundColor: '#606C38',
  },
  
  submitButtonDisabled: {
    backgroundColor: '#A5A5A5',
  },
  
  submitButtonText: {
    color: '#FEFAE0',
    fontSize: 16,
    fontWeight: 'bold',
  },

  timelineCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  timelineContainer: { marginTop: 10 },
  
  timelineRow: { 
    flexDirection: 'row', 
    marginBottom: 20, 
    alignItems: 'flex-start', 
    position: 'relative' 
  },
  
  timelineIconContainer: {
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    zIndex: 2,
    elevation: 2,
  },
  
  connector: { 
    position: 'absolute', 
    left: 19, 
    top: 40, 
    width: 2, 
    height: '100%', 
    backgroundColor: '#E8DCC0', 
    zIndex: 1 
  },
  
  timelineContent: {
    flex: 1, 
    backgroundColor: '#F8F9FA', 
    borderRadius: 12, 
    padding: 15, 
    marginLeft: 12,
    elevation: 1,
  },

  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  
  timelineTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#283618',
    flex: 1,
  },

  timelineStatus: {
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  
  timelineDetails: { 
    fontSize: 14, 
    color: '#606C38', 
    marginBottom: 4 
  },

  timelineActor: {
    fontSize: 12,
    color: '#6A994E',
    fontWeight: '600',
    marginBottom: 8,
  },

  timelineFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  
  timelineDate: { 
    fontSize: 11, 
    color: '#BC6C25', 
    fontWeight: '600' 
  },

  timelineTime: { 
    fontSize: 11, 
    color: '#BC6C25', 
    fontWeight: '600' 
  },

  blockchainHash: {
    fontSize: 10,
    color: '#386641',
    fontFamily: 'monospace',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },

  batchesCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
  },

  batchCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E8DCC0',
  },

  batchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },

  batchInfo: {
    flex: 1,
  },

  batchId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#283618',
    fontFamily: 'monospace',
  },

  batchProduct: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#386641',
    marginTop: 2,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  statusText: {
    color: '#FEFAE0',
    fontSize: 10,
    fontWeight: 'bold',
  },

  batchDetails: {
    marginBottom: 12,
  },

  batchDetail: {
    fontSize: 12,
    color: '#606C38',
    marginBottom: 2,
  },

  batchCertifications: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },

  certBadge: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 4,
  },

  certText: {
    fontSize: 10,
    color: '#6A994E',
    fontWeight: '600',
  },

  batchActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  actionButton: {
    flexDirection: 'row',
    backgroundColor: '#DDA15E',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 6,
  },

  qrButton: {
    backgroundColor: '#6A994E',
    marginRight: 0,
    marginLeft: 6,
  },

  actionButtonText: {
    color: '#FEFAE0',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },

  batchHash: {
    fontSize: 10,
    color: '#386641',
    fontFamily: 'monospace',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(40, 54, 24, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    margin: 20,
    minWidth: 320,
    elevation: 10,
  },
  
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#283618',
    marginBottom: 8,
    textAlign: 'center',
  },
  
  modalSubtext: {
    fontSize: 14,
    color: '#606C38',
    marginBottom: 24,
    textAlign: 'center',
  },
  
  successContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  
  successText: { 
    fontSize: 12, 
    color: '#6A994E', 
    fontWeight: 'bold',
    marginTop: 8,
  },
  
  modalStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 24,
  },
  
  statText: {
    fontSize: 12,
    color: '#6A994E',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    margin: 2,
    fontWeight: '600',
  },
  
  modalButton: {
    backgroundColor: '#386641',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    elevation: 2,
  },
  
  modalButtonText: {
    color: '#FEFAE0',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Batch Trace Modal Styles
  modalSafeArea: {
    flex: 1,
    backgroundColor: '#FEFAE0',
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E8DCC0',
  },

  modalHeaderTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#283618',
  },

  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DDA15E',
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  modalScrollView: {
    flex: 1,
    padding: 20,
  },

  batchSummary: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },

  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#283618',
    marginBottom: 4,
  },

  summaryId: {
    fontSize: 14,
    color: '#606C38',
    fontFamily: 'monospace',
    marginBottom: 8,
  },

  summaryDetails: {
    fontSize: 14,
    color: '#6A994E',
    marginBottom: 12,
  },

  summaryHash: {
    fontSize: 12,
    color: '#386641',
    fontFamily: 'monospace',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
});