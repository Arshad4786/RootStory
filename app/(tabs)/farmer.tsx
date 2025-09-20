import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sprout, MapPin, Camera, CheckCircle, AlertCircle, QrCode } from 'lucide-react-native';

export default function FarmerScreen() {
  const [herbName, setHerbName] = useState('');
  const [quantity, setQuantity] = useState('');
  type LocationType = { latitude: number; longitude: number; address: string; accuracy: number };
  const [location, setLocation] = useState<LocationType | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState(false);
  const [collections, setCollections] = useState([
    { 
      herb: 'Ashwagandha', 
      qty: '5kg', 
      date: '2025-09-12', 
      location: 'Nashik, Maharashtra', 
      verified: true,
      blockchainHash: '0x1a2b3c4d',
      qrCode: 'QR_1a2b3c4d_1694537200'
    },
    { 
      herb: 'Tulsi', 
      qty: '2kg', 
      date: '2025-09-10', 
      location: 'Pune, Maharashtra', 
      verified: false,
      blockchainHash: null,
      qrCode: null
    },
  ]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [generatedQR, setGeneratedQR] = useState('');

  // Mock GPS functionality with better UX
  const handleGeoTag = async () => {
    setIsLoading(true);
    try {
      // Simulate GPS capture with realistic delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockLocation = {
        latitude: 19.9975 + (Math.random() - 0.5) * 0.01,
        longitude: 73.7898 + (Math.random() - 0.5) * 0.01,
        address: 'Farm Plot 42, Nashik, Maharashtra',
        accuracy: 5.2 // meters
      };
      setLocation(mockLocation);
      Alert.alert(
        'GPS Location Captured ✅', 
        `📍 ${mockLocation.address}\nAccuracy: ${mockLocation.accuracy}m\nLat: ${mockLocation.latitude.toFixed(4)}, Lng: ${mockLocation.longitude.toFixed(4)}`
      );
    } catch (error) {
      Alert.alert('GPS Error', 'Unable to get location. Please check GPS permissions and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced camera functionality
  const handleCapturePhoto = () => {
    Alert.alert(
      'Capture Herb Photo 📸',
      'High-quality photos help with authenticity verification',
      [
        { text: 'Open Camera', onPress: () => mockPhotoCapture('camera') },
        { text: 'Choose from Gallery', onPress: () => mockPhotoCapture('gallery') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const mockPhotoCapture = (source: string) => {
    setCapturedPhoto(true);
    Alert.alert(
      'Photo Captured Successfully ✅', 
      `High-resolution herb image saved from ${source}.\nThis will be used for species verification and quality assessment.`
    );
  };

  // Enhanced blockchain submission
  const handleSubmit = async () => {
    // Validation
    if (!herbName.trim() || !quantity.trim()) {
      setError('⚠️ Please fill in all required fields');
      return;
    }
    if (!location) {
      setError('⚠️ GPS location is required for traceability');
      return;
    }
    if (!capturedPhoto) {
      setError('⚠️ Photo capture is required for verification');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate blockchain transaction with realistic steps
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert('⛓️ Creating blockchain transaction...', 'Please wait');
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      Alert.alert('🔐 Generating cryptographic hash...', 'Securing data');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate realistic blockchain data
      const blockchainHash = `0x${Math.random().toString(16).substr(2, 8)}`;
      const timestamp = Date.now();
      const qrCode = `QR_${blockchainHash}_${timestamp}`;
      
      const newEntry = {
        herb: herbName.trim(),
        qty: `${quantity}kg`,
        date: new Date().toISOString().split('T')[0],
        location: location.address,
        verified: true,
        blockchainHash,
        qrCode,
        timestamp,
        coordinates: {
          lat: location.latitude,
          lng: location.longitude
        }
      };
      
      setCollections([newEntry, ...collections]);
      setGeneratedQR(qrCode);
      setShowQRModal(true);
      
      // Reset form
      setHerbName('');
      setQuantity('');
      setLocation(null);
      setCapturedPhoto(false);
      
    } catch (error) {
      Alert.alert('Blockchain Error', 'Failed to record transaction on blockchain. Please check connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Enhanced Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Collection Entry</Text>
          <Text style={styles.headerSubtitle}>Record harvest on blockchain ledger</Text>
        </View>
        
        {/* Enhanced Form Card */}
        <View style={styles.formCard}>
          <Text style={styles.cardTitle}>📝 New Collection Log</Text>

          {error ? (
            <View style={styles.errorContainer}>
              <AlertCircle color="#BC4749" size={16} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Herb Name Input with suggestions */}
          <View style={styles.inputGroup}>
            <Sprout color="#6A994E" size={20} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Herb Name (e.g., Ashwagandha, Tulsi, Brahmi)"
              placeholderTextColor="#606C38"
              value={herbName}
              onChangeText={setHerbName}
              autoCapitalize="words"
            />
          </View>

          {/* Quantity Input */}
          <View style={styles.inputGroup}>
            <View style={styles.unitBadge}>
              <Text style={styles.unitText}>KG</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Quantity (e.g., 5.5)"
              placeholderTextColor="#606C38"
              keyboardType="decimal-pad"
              value={quantity}
              onChangeText={setQuantity}
            />
          </View>

          {/* GPS Location Button with status */}
          <TouchableOpacity 
            style={[
              styles.actionButton, 
              location && styles.actionButtonSuccess,
              isLoading && styles.actionButtonLoading
            ]} 
            onPress={handleGeoTag}
            disabled={isLoading}
          >
            {location ? (
              <CheckCircle color="#FEFAE0" size={18} />
            ) : (
              <MapPin color="#FEFAE0" size={18} />
            )}
            <Text style={styles.actionButtonText}>
              {location 
                ? `📍 GPS Captured (±${location.accuracy}m)` 
                : isLoading 
                  ? '🔍 Getting GPS Location...' 
                  : '📍 Capture GPS Location'
              }
            </Text>
          </TouchableOpacity>
          
          {location && (
            <View style={styles.locationDetails}>
              <Text style={styles.locationText}>📍 {location.address}</Text>
              <Text style={styles.coordText}>
                {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
              </Text>
            </View>
          )}

          {/* Camera Button with status */}
          <TouchableOpacity 
            style={[styles.actionButton, capturedPhoto && styles.actionButtonSuccess]} 
            onPress={handleCapturePhoto}
          >
            {capturedPhoto ? (
              <CheckCircle color="#FEFAE0" size={18} />
            ) : (
              <Camera color="#FEFAE0" size={18} />
            )}
            <Text style={styles.actionButtonText}>
              {capturedPhoto ? '📸 Photo Captured ✓' : '📸 Capture Herb Photo'}
            </Text>
          </TouchableOpacity>

          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[
                styles.progressFill, 
                { width: `${((herbName ? 1 : 0) + (quantity ? 1 : 0) + (location ? 1 : 0) + (capturedPhoto ? 1 : 0)) * 25}%` }
              ]} />
            </View>
            <Text style={styles.progressText}>
              {Math.round(((herbName ? 1 : 0) + (quantity ? 1 : 0) + (location ? 1 : 0) + (capturedPhoto ? 1 : 0)) * 25)}% Complete
            </Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity 
            style={[
              styles.submitButton, 
              isLoading && styles.submitButtonLoading,
              (!herbName || !quantity || !location || !capturedPhoto) && styles.submitButtonDisabled
            ]} 
            onPress={handleSubmit}
            disabled={isLoading || !herbName || !quantity || !location || !capturedPhoto}
          >
            <Text style={styles.submitButtonText}>
              {isLoading ? '⛓️ Recording on Blockchain...' : '🔗 Submit to Blockchain'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Enhanced History Card */}
        <View style={styles.historyCard}>
          <Text style={styles.cardTitle}>📊 Collection History</Text>
          <Text style={styles.cardSubtitle}>Recent blockchain entries</Text>
          
          {collections.map((c, index) => (
            <View key={index} style={styles.historyItem}>
              <View style={styles.historyLeft}>
                <Text style={styles.historyHerb}>{c.herb}</Text>
                <Text style={styles.historyQuantity}>{c.qty}</Text>
                <Text style={styles.historyLocation}>📍 {c.location}</Text>
                <Text style={styles.historyDate}>📅 {c.date}</Text>
                {c.blockchainHash && (
                  <Text style={styles.hashText}>🔗 {c.blockchainHash}</Text>
                )}
              </View>
              <View style={styles.historyRight}>
                {c.verified ? (
                  <>
                    <CheckCircle color="#6A994E" size={24} />
                    <Text style={styles.statusTextSuccess}>Verified</Text>
                    {c.qrCode && <QrCode color="#6A994E" size={16} />}
                  </>
                ) : (
                  <>
                    <AlertCircle color="#DDA15E" size={24} />
                    <Text style={styles.statusTextPending}>Pending</Text>
                  </>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* QR Code Success Modal */}
        <Modal visible={showQRModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>🎉 Successfully Recorded!</Text>
              <Text style={styles.modalSubtext}>Your collection is now on the blockchain</Text>
              
              <View style={styles.qrContainer}>
                <QrCode color="#386641" size={60} />
                <Text style={styles.qrText}>BLOCKCHAIN QR</Text>
              </View>
              
              <Text style={styles.modalLabel}>🔗 Transaction Hash:</Text>
              <Text style={styles.hashDisplay}>{generatedQR}</Text>
              
              <View style={styles.modalStats}>
                <Text style={styles.statText}>✅ GPS Verified</Text>
                <Text style={styles.statText}>📸 Photo Verified</Text>
                <Text style={styles.statText}>⛓️ Blockchain Confirmed</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={() => setShowQRModal(false)}
              >
                <Text style={styles.modalButtonText}>Continue Farming 🌱</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
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
  },
  
  headerSubtitle: {
    fontSize: 14,
    color: '#606C38',
    textAlign: 'center',
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
  
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE6E6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  
  errorText: {
    color: '#BC4749',
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 14,
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
  
  icon: { marginHorizontal: 15 },
  
  unitBadge: {
    backgroundColor: '#6A994E',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 10,
  },
  
  unitText: {
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
  
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDA15E',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  
  actionButtonSuccess: {
    backgroundColor: '#6A994E',
  },
  
  actionButtonLoading: {
    backgroundColor: '#BC6C25',
  },
  
  actionButtonText: {
    color: '#FEFAE0',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
  
  locationDetails: {
    backgroundColor: '#E8F5E8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  
  locationText: {
    fontSize: 14,
    color: '#386641',
    fontWeight: '600',
  },
  
  coordText: {
    fontSize: 12,
    color: '#6A994E',
    fontFamily: 'monospace',
    marginTop: 2,
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
  
  historyCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  
  cardSubtitle: {
    fontSize: 12,
    color: '#606C38',
    marginBottom: 16,
  },
  
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EAD6',
  },
  
  historyLeft: { flex: 1, paddingRight: 12 },
  historyRight: { alignItems: 'center', minWidth: 80 },
  
  historyHerb: { 
    fontSize: 16, 
    color: '#283618', 
    fontWeight: 'bold' 
  },
  
  historyQuantity: { 
    fontSize: 14, 
    color: '#6A994E', 
    fontWeight: '600',
    marginTop: 2,
  },
  
  historyLocation: { 
    fontSize: 12, 
    color: '#606C38', 
    marginTop: 4 
  },
  
  historyDate: { 
    fontSize: 12, 
    color: '#BC6C25', 
    marginTop: 2,
    fontWeight: '500',
  },
  
  hashText: {
    fontSize: 10,
    color: '#386641',
    fontFamily: 'monospace',
    marginTop: 4,
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  
  statusTextSuccess: {
    fontSize: 11,
    color: '#6A994E',
    marginTop: 4,
    fontWeight: 'bold',
  },
  
  statusTextPending: {
    fontSize: 11,
    color: '#DDA15E',
    marginTop: 4,
    fontWeight: 'bold',
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
  
  qrContainer: {
    width: 140,
    height: 140,
    backgroundColor: '#F0EAD6',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#386641',
  },
  
  qrText: { 
    fontSize: 10, 
    color: '#386641', 
    fontWeight: 'bold',
    marginTop: 8,
  },
  
  modalLabel: {
    fontSize: 14,
    color: '#606C38',
    marginBottom: 8,
    fontWeight: '600',
  },
  
  hashDisplay: {
    fontSize: 12,
    color: '#283618',
    backgroundColor: '#F0EAD6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    fontFamily: 'monospace',
    textAlign: 'center',
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
});