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
  Factory,
  TestTube,
  Truck,
  Package,
  MapPin,
  Leaf,
  CheckCircle,
  AlertCircle,
  QrCode,
  Shield,
  Calendar,
  User,
  Thermometer,
  Droplets,
  Scale,
  Award,
  Plus,
  Eye,
  Camera,
  Timer,
  Activity
} from 'lucide-react-native';

export default function ProcessorScreen() {
  const [selectedTab, setSelectedTab] = useState('process');
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [showTraceModal, setShowTraceModal] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<ProcessingBatch | null>(null);
  
  // Form states
  const [rawMaterial, setRawMaterial] = useState('');
  const [quantity, setQuantity] = useState('');
  const [processType, setProcessType] = useState('');
  const [temperature, setTemperature] = useState('');
  const [duration, setDuration] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Enhanced timeline data
  const timelineData = [
    { 
      icon: Leaf, 
      title: 'Raw Material Received', 
      details: 'Premium Ashwagandha roots from certified organic farm',
      supplier: 'Ramesh Kumar (Verified Farmer)',
      location: 'Farm Plot 42, Nashik, Maharashtra',
      date: '2025-09-12',
      time: '08:30 AM',
      quantity: '25kg fresh roots',
      quality: 'Grade A+',
      moisture: '12.5%',
      certifications: ['Organic', 'Fair Trade'],
      blockchainHash: '0x1a2b3c4d5e6f',
      status: 'verified'
    },
    { 
      icon: TestTube, 
      title: 'Incoming Quality Testing', 
      details: 'Comprehensive analysis of raw materials',
      lab: 'ProcessLab Analytics',
      date: '2025-09-12',
      time: '10:00 AM',
      tests: [
        { name: 'Moisture Content', result: '12.5%', standard: '≤15%', status: 'PASS' },
        { name: 'Pesticide Residue', result: 'None Detected', standard: 'BDL', status: 'PASS' },
        { name: 'Heavy Metals', result: 'Within Limits', standard: 'IP Standards', status: 'PASS' },
        { name: 'Microbial Count', result: 'Safe Levels', standard: 'IP Standards', status: 'PASS' },
        { name: 'Active Compounds', result: '3.2%', standard: '≥2.5%', status: 'PASS' }
      ],
      blockchainHash: '0x2b3c4d5e6f7g',
      status: 'completed'
    },
    { 
      icon: Factory, 
      title: 'Processing Initiated', 
      details: 'Traditional sun-drying and grinding process',
      operator: 'SunDried Organics Ltd.',
      date: '2025-09-13',
      time: '06:00 AM',
      process: 'Solar drying at controlled temperature',
      temperature: '45-50°C',
      humidity: '35-40%',
      duration: '72 hours',
      yield: 'Expected 5kg powder from 25kg roots',
      blockchainHash: '0x3c4d5e6f7g8h',
      status: 'in-progress'
    },
    { 
      icon: Scale, 
      title: 'Quality Control Check', 
      details: 'Mid-process quality assessment',
      inspector: 'Quality Control Team',
      date: '2025-09-14',
      time: '02:00 PM',
      parameters: {
        'Drying Progress': '85%',
        'Moisture Reduction': '8.2%',
        'Color Retention': 'Excellent',
        'Aroma Profile': 'Strong & Fresh'
      },
      status: 'in-progress'
    },
    { 
      icon: Package, 
      title: 'Final Processing Complete', 
      details: 'Fine powder ready for packaging',
      date: '2025-09-15',
      time: '04:00 PM',
      finalYield: '5.2kg fine powder',
      yieldEfficiency: '98.5%',
      finalMoisture: '4.8%',
      gradeAssigned: 'Premium A+',
      blockchainHash: '0x4d5e6f7g8h9i',
      status: 'completed'
    },
    { 
      icon: Truck, 
      title: 'Dispatch to Manufacturer', 
      details: 'Cold chain logistics to maintain quality',
      logistics: 'GreenTrans Logistics',
      date: '2025-09-16',
      time: '07:00 AM',
      vehicle: 'Temperature Controlled Truck',
      destination: 'AyurPhoria Wellness Pvt. Ltd., Pune',
      eta: '12 hours',
      trackingId: 'GT_2025_9876',
      status: 'dispatched'
    }
  ];

  // Mock processing batches
  const [processingBatches, setProcessingBatches] = useState([
    {
      id: 'SDO_ASH_2025_B78',
      rawMaterial: 'Ashwagandha Roots',
      inputQuantity: '25kg',
      outputQuantity: '5.2kg powder',
      processType: 'Solar Drying & Grinding',
      startDate: '2025-09-13',
      completionDate: '2025-09-15',
      status: 'completed',
      quality: 'Premium A+',
      yieldEfficiency: '98.5%',
      temperature: '45-50°C',
      duration: '72 hours',
      certifications: ['Organic', 'GMP'],
      blockchainHash: '0x4d5e6f7g8h9i',
      destinationReady: true
    },
    {
      id: 'SDO_TUL_2025_B76',
      rawMaterial: 'Tulsi Leaves',
      inputQuantity: '15kg',
      outputQuantity: '3.8kg powder',
      processType: 'Shade Drying & Grinding',
      startDate: '2025-09-11',
      completionDate: '2025-09-13',
      status: 'quality-testing',
      quality: 'Pending',
      yieldEfficiency: 'TBD',
      temperature: 'Ambient (25-30°C)',
      duration: '48 hours',
      certifications: ['Organic'],
      blockchainHash: '0x3c4d5e6f7g8h',
      destinationReady: false
    },
    {
      id: 'SDO_BRA_2025_B74',
      rawMaterial: 'Brahmi Whole Plant',
      inputQuantity: '20kg',
      outputQuantity: '4.1kg powder',
      processType: 'Freeze Drying & Grinding',
      startDate: '2025-09-10',
      completionDate: '2025-09-12',
      status: 'packaging',
      quality: 'Grade A',
      yieldEfficiency: '96.2%',
      temperature: '-40°C to +20°C',
      duration: '96 hours',
      certifications: ['Organic', 'Fair Trade'],
      blockchainHash: '0x2b3c4d5e6f7g',
      destinationReady: false
    }
  ]);

  const handleProcessSubmit = async () => {
    // Enhanced validation
    if (!rawMaterial.trim() || !quantity.trim() || !processType.trim() || !temperature.trim() || !duration.trim()) {
      Alert.alert('Validation Error', 'Please fill in all processing parameters');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate processing registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert('🔗 Initiating blockchain record...', 'Please wait');
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      Alert.alert('⚗️ Processing parameters verified...', 'Setting up batch tracking');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate new processing batch
      const newBatch = {
        id: `SDO_${rawMaterial.substring(0, 3).toUpperCase()}_2025_B${Math.floor(Math.random() * 100)}`,
        rawMaterial: rawMaterial.trim(),
        inputQuantity: `${quantity}kg`,
        outputQuantity: 'TBD',
        processType: processType.trim(),
        startDate: new Date().toISOString().split('T')[0],
        completionDate: 'TBD',
        status: 'initiated',
        quality: 'Processing',
        yieldEfficiency: 'TBD',
        temperature: temperature.trim(),
        duration: `${duration} hours`,
        certifications: ['Processing'],
        blockchainHash: `0x${Math.random().toString(16).substr(2, 12)}`,
        destinationReady: false
      };

      setProcessingBatches([newBatch, ...processingBatches]);
      setShowProcessModal(true);
      
      // Reset form
      setRawMaterial('');
      setQuantity('');
      setProcessType('');
      setTemperature('');
      setDuration('');
      
      Alert.alert('✅ Processing Initiated', `Batch ${newBatch.id} has been started and registered on blockchain`);
      
    } catch (error) {
      Alert.alert('Processing Error', 'Failed to initiate processing. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  type ProcessingBatch = {
    id: string;
    rawMaterial: string;
    inputQuantity: string;
    outputQuantity: string;
    processType: string;
    startDate: string;
    completionDate: string;
    status: string;
    quality: string;
    yieldEfficiency: string;
    temperature: string;
    duration: string;
    certifications: string[];
    blockchainHash: string;
    destinationReady: boolean;
  };

  const viewBatchTrace = (batch: ProcessingBatch) => {
    setSelectedBatch(batch);
    setShowTraceModal(true);
  };

  const renderTimelineItem = (item: any, index: number) => {
    const statusColors = {
      'verified': '#6A994E',
      'completed': '#6A994E',
      'in-progress': '#DDA15E',
      'dispatched': '#BC6C25',
      'pending': '#606C38'
    };

    const statusColor = statusColors[item.status as keyof typeof statusColors] || '#606C38';

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
              {item.status.toUpperCase().replace('-', ' ')}
            </Text>
          </View>
          <Text style={styles.timelineDetails}>{item.details}</Text>
          
          {item.supplier && (
            <Text style={styles.timelineActor}>👤 {item.supplier}</Text>
          )}
          {item.lab && (
            <Text style={styles.timelineActor}>🧪 {item.lab}</Text>
          )}
          {item.operator && (
            <Text style={styles.timelineActor}>🏭 {item.operator}</Text>
          )}
          {item.logistics && (
            <Text style={styles.timelineActor}>🚛 {item.logistics}</Text>
          )}

          {item.location && (
            <Text style={styles.timelineLocation}>📍 {item.location}</Text>
          )}

          {/* Process Parameters */}
          {item.temperature && item.duration && (
            <View style={styles.processParams}>
              <Text style={styles.paramText}>🌡️ {item.temperature}</Text>
              <Text style={styles.paramText}>⏱️ {item.duration}</Text>
              {item.humidity && <Text style={styles.paramText}>💧 {item.humidity}</Text>}
            </View>
          )}

          {/* Quality Parameters */}
          {item.parameters && (
            <View style={styles.qualityParams}>
              {Object.entries(item.parameters).map(([key, value], paramIndex) => (
                <Text key={paramIndex} style={styles.qualityParamText}>
                  {key}: {String(value)}
                </Text>
              ))}
            </View>
          )}

          {/* Test Results */}
          {item.tests && (
            <View style={styles.testsContainer}>
              <Text style={styles.testsTitle}>🧪 Test Results:</Text>
              {item.tests.map(
                (
                  test: {
                    name: string;
                    result: string;
                    standard: string;
                    status: 'PASS' | 'FAIL' | string;
                  },
                  testIndex: number
                ) => (
                  <View key={testIndex} style={styles.testRow}>
                    <Text style={styles.testName}>{test.name}:</Text>
                    <Text style={styles.testResult}>{test.result}</Text>
                    <Text
                      style={[
                        styles.testStatus,
                        test.status === 'PASS' ? styles.testPass : styles.testFail,
                      ]}
                    >
                      {test.status}
                    </Text>
                  </View>
                )
              )}
            </View>
          )}

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

interface BatchCertification {
    cert: string;
}

interface RenderBatchCardProps {
    batch: ProcessingBatch;
    index: number;
}

const renderBatchCard = (batch: ProcessingBatch, index: number): React.ReactElement => {
    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'completed': return '#6A994E';
            case 'quality-testing': return '#DDA15E';
            case 'packaging': return '#BC6C25';
            case 'initiated': return '#606C38';
            default: return '#606C38';
        }
    };

    return (
        <View key={index} style={styles.batchCard}>
            <View style={styles.batchHeader}>
                <View style={styles.batchInfo}>
                    <Text style={styles.batchId}>{batch.id}</Text>
                    <Text style={styles.batchMaterial}>{batch.rawMaterial}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(batch.status) }]}>
                    <Text style={styles.statusText}>{batch.status.replace('-', ' ').toUpperCase()}</Text>
                </View>
            </View>
            
            <View style={styles.batchDetails}>
                <Text style={styles.batchDetail}>📥 Input: {batch.inputQuantity}</Text>
                <Text style={styles.batchDetail}>📤 Output: {batch.outputQuantity}</Text>
                <Text style={styles.batchDetail}>⚗️ Process: {batch.processType}</Text>
                <Text style={styles.batchDetail}>🌡️ Temp: {batch.temperature}</Text>
                <Text style={styles.batchDetail}>⏱️ Duration: {batch.duration}</Text>
                <Text style={styles.batchDetail}>📊 Efficiency: {batch.yieldEfficiency}</Text>
                <Text style={styles.batchDetail}>⭐ Quality: {batch.quality}</Text>
            </View>

            <View style={styles.batchCertifications}>
                {batch.certifications.map((cert: string, certIndex: number) => (
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
                    <Text style={styles.actionButtonText}>View Process</Text>
                </TouchableOpacity>
                
                {batch.destinationReady && (
                    <TouchableOpacity style={[styles.actionButton, styles.readyButton]}>
                        <Truck color="#FEFAE0" size={16} />
                        <Text style={styles.actionButtonText}>Ready to Ship</Text>
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
          <Text style={styles.headerTitle}>Processing Center</Text>
          <Text style={styles.headerSubtitle}>Advanced herb processing & quality control</Text>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 'process' && styles.tabActive]}
            onPress={() => setSelectedTab('process')}
          >
            <Plus color={selectedTab === 'process' ? '#FEFAE0' : '#606C38'} size={18} />
            <Text style={[styles.tabText, selectedTab === 'process' && styles.tabTextActive]}>
              Start Processing
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 'batches' && styles.tabActive]}
            onPress={() => setSelectedTab('batches')}
          >
            <Activity color={selectedTab === 'batches' ? '#FEFAE0' : '#606C38'} size={18} />
            <Text style={[styles.tabText, selectedTab === 'batches' && styles.tabTextActive]}>
              Active Batches
            </Text>
          </TouchableOpacity>
        </View>

        {selectedTab === 'process' && (
          <>
            {/* Processing Form */}
            <View style={styles.formCard}>
              <Text style={styles.cardTitle}>⚗️ New Processing Batch</Text>
              
              <View style={styles.inputGroup}>
                <Leaf color="#6A994E" size={20} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Raw Material (e.g., Ashwagandha Roots)"
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
                  placeholder="Input Quantity (e.g., 25)"
                  placeholderTextColor="#606C38"
                  keyboardType="decimal-pad"
                  value={quantity}
                  onChangeText={setQuantity}
                />
              </View>

              <View style={styles.inputGroup}>
                <Factory color="#6A994E" size={20} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Process Type (e.g., Solar Drying & Grinding)"
                  placeholderTextColor="#606C38"
                  value={processType}
                  onChangeText={setProcessType}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.inputGroup}>
                <Thermometer color="#6A994E" size={20} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Temperature Range (e.g., 45-50°C)"
                  placeholderTextColor="#606C38"
                  value={temperature}
                  onChangeText={setTemperature}
                />
              </View>

              <View style={styles.inputGroup}>
                <Timer color="#6A994E" size={20} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Expected Duration (hours, e.g., 72)"
                  placeholderTextColor="#606C38"
                  keyboardType="numeric"
                  value={duration}
                  onChangeText={setDuration}
                />
              </View>

              {/* Progress Indicator */}
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[
                    styles.progressFill, 
                    { width: `${((rawMaterial ? 1 : 0) + (quantity ? 1 : 0) + (processType ? 1 : 0) + (temperature ? 1 : 0) + (duration ? 1 : 0)) * 20}%` }
                  ]} />
                </View>
                <Text style={styles.progressText}>
                  {Math.round(((rawMaterial ? 1 : 0) + (quantity ? 1 : 0) + (processType ? 1 : 0) + (temperature ? 1 : 0) + (duration ? 1 : 0)) * 20)}% Complete
                </Text>
              </View>

              <TouchableOpacity 
                style={[
                  styles.submitButton, 
                  isLoading && styles.submitButtonLoading,
                  (!rawMaterial || !quantity || !processType || !temperature || !duration) && styles.submitButtonDisabled
                ]} 
                onPress={handleProcessSubmit}
                disabled={isLoading || !rawMaterial || !quantity || !processType || !temperature || !duration}
              >
                <Text style={styles.submitButtonText}>
                  {isLoading ? '⛓️ Initiating Process...' : '🔗 Start Processing Batch'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Current Processing Timeline */}
            <View style={styles.timelineCard}>
              <Text style={styles.cardTitle}>🔄 Live Processing Journey</Text>
              <Text style={styles.cardSubtitle}>Batch #A4B8C1 - Real-time tracking</Text>
              
              <View style={styles.timelineContainer}>
                {timelineData.map((item, index) => renderTimelineItem(item, index))}
              </View>
            </View>
          </>
        )}

        {selectedTab === 'batches' && (
          <View style={styles.batchesCard}>
            <Text style={styles.cardTitle}>⚗️ Processing Batches</Text>
            <Text style={styles.cardSubtitle}>{processingBatches.length} active processing batches</Text>
            
            {processingBatches.map((batch, index) => renderBatchCard(batch, index))}
          </View>
        )}

      </ScrollView>

      {/* Process Success Modal */}
      <Modal visible={showProcessModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🎉 Processing Initiated!</Text>
            <Text style={styles.modalSubtext}>Your processing batch is now being tracked on blockchain</Text>
            
            <View style={styles.successContainer}>
              <CheckCircle color="#6A994E" size={60} />
              <Text style={styles.successText}>PROCESS STARTED</Text>
            </View>
            
            <View style={styles.modalStats}>
              <Text style={styles.statText}>✅ Batch ID Generated</Text>
              <Text style={styles.statText}>🔗 Blockchain Tracking Active</Text>
              <Text style={styles.statText}>📊 Quality Monitoring Enabled</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={() => setShowProcessModal(false)}
            >
              <Text style={styles.modalButtonText}>Continue Processing ⚗️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Batch Trace Modal */}
      <Modal visible={showTraceModal} animationType="slide">
        <SafeAreaView style={styles.modalSafeArea}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderTitle}>🔬 Processing Details</Text>
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
                <Text style={styles.summaryTitle}>{selectedBatch.rawMaterial} Processing</Text>
                <Text style={styles.summaryId}>Batch ID: {selectedBatch.id}</Text>
                <Text style={styles.summaryDetails}>
                  📥 {selectedBatch.inputQuantity} → 📤 {selectedBatch.outputQuantity}
                </Text>
                <Text style={styles.summaryProcess}>⚗️ {selectedBatch.processType}</Text>
                <Text style={styles.summaryHash}>🔗 {selectedBatch.blockchainHash}</Text>
              </View>
              
              <View style={styles.timelineCard}>
                <Text style={styles.cardTitle}>🔄 Processing Timeline</Text>
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
    marginBottom: 8,
    lineHeight: 20,
  },

  timelineActor: {
    fontSize: 12,
    color: '#6A994E',
    fontWeight: '600',
    marginBottom: 4,
  },

  timelineLocation: {
    fontSize: 12,
    color: '#BC6C25',
    marginBottom: 8,
  },

  processParams: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },

  paramText: {
    fontSize: 11,
    color: '#386641',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 4,
  },

  qualityParams: {
    backgroundColor: '#F0F8FF',
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },

  qualityParamText: {
    fontSize: 11,
    color: '#283618',
    marginBottom: 2,
  },

  testsContainer: {
    backgroundColor: '#F8F9FA',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  
  testsTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#283618',
    marginBottom: 6,
  },
  
  testRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 3,
  },
  
  testName: {
    fontSize: 11,
    color: '#606C38',
    flex: 2,
  },
  
  testResult: {
    fontSize: 11,
    color: '#283618',
    fontWeight: '600',
    flex: 2,
    textAlign: 'center',
  },
  
  testStatus: {
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
    flex: 1,
    textAlign: 'center',
  },
  
  testPass: {
    backgroundColor: '#E8F5E8',
    color: '#6A994E',
  },
  
  testFail: {
    backgroundColor: '#FFE6E6',
    color: '#BC4749',
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

  batchMaterial: {
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
    marginBottom: 3,
    lineHeight: 16,
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

  readyButton: {
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
    marginBottom: 8,
  },

  summaryProcess: {
    fontSize: 14,
    color: '#BC6C25',
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