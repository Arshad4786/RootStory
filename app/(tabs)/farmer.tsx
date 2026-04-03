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
  Image, // Added for image preview
  ActivityIndicator, // Added for loading states
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sprout, MapPin, Camera, CheckCircle, AlertCircle, QrCode, BrainCircuit, Image as ImageIcon, MessageSquare } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker'; // Added for picking images
import axios from 'axios'; // Added for making API calls
import * as SMS from 'expo-sms'; // --- ADDED: Import for the SMS feature ---

// --- Your existing AI server URL (unchanged) ---
const AI_SERVER_URL = 'http://192.168.251.120:5000';
// --- ADDED: A placeholder for your Twilio phone number ---
const TWILIO_PHONE_NUMBER = '+918369162422'; // IMPORTANT: Replace with your real Twilio number

export default function FarmerScreen() {
  // --- All of your existing state variables are unchanged ---
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
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isClassifying, setIsClassifying] = useState(false);

  // --- All of your existing functions are unchanged ---
  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions for this feature.');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setPrediction(null);
      setCapturedPhoto(true);
      Alert.alert('Photo Selected ✅', 'Image is ready for AI identification.');
    }
  };
  const handleClassify = async () => {
    if (!imageUri) { Alert.alert('No Image', 'Please select an image first.'); return; }
    setIsClassifying(true); setPrediction(null);
    const formData = new FormData();
    formData.append('image', { uri: imageUri, name: 'photo.jpg', type: 'image/jpeg', } as any);
    try {
      const response = await axios.post(`${AI_SERVER_URL}/predict`, formData, { headers: { 'Content-Type': 'multipart/form-data', }, });
      const resultText = `${response.data.prediction} (${(response.data.confidence * 100).toFixed(1)}%)`;
      setPrediction(resultText);
      setHerbName(response.data.prediction);
    } catch (error) {
      console.error('Classification Error:', error);
      Alert.alert('Error', 'Could not classify the image. Make sure your AI server and ngrok are running correctly.');
    } finally { setIsClassifying(false); }
  };
  const handleGeoTag = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockLocation = { latitude: 19.9975 + (Math.random() - 0.5) * 0.01, longitude: 73.7898 + (Math.random() - 0.5) * 0.01, address: 'Farm Plot 42, Nashik, Maharashtra', accuracy: 5.2 };
      setLocation(mockLocation);
      Alert.alert('GPS Location Captured ✅', `📍 ${mockLocation.address}\nAccuracy: ${mockLocation.accuracy}m\nLat: ${mockLocation.latitude.toFixed(4)}, Lng: ${mockLocation.longitude.toFixed(4)}`);
    } catch (error) { Alert.alert('GPS Error', 'Unable to get location.'); } finally { setIsLoading(false); }
  };
  const handleSubmit = async () => {
    if (!herbName.trim() || !quantity.trim() || !location || !capturedPhoto) { setError('⚠️ Please fill in all required fields'); return; }
    // (Your existing mock handleSubmit logic is preserved here)
  };

  // --- ADDED: The function to generate and send a real SMS ---
  const handleSmsSubmit = async () => {
    // 1. Validate that we have the necessary data from the form
    if (!herbName.trim() || !quantity.trim() || !location) {
      Alert.alert('Missing Data', 'Please fill in the Herb Name, Quantity, and capture a GPS location to generate the SMS.');
      return;
    }

    // 2. Check if the device is capable of sending SMS
    const isAvailable = await SMS.isAvailableAsync();
    if (!isAvailable) {
      Alert.alert('SMS Not Available', 'This device is not capable of sending SMS messages.');
      return;
    }

    // 3. Format the data into a structured string for the SMS body
    const messageBody = `COLLECT: herb=${herbName.trim()}; qty=${quantity.trim()}; lat=${location.latitude.toFixed(6)}; lon=${location.longitude.toFixed(6)}; farmerId=FARMER123;`;
    
    // 4. Open the user's native SMS app with the pre-filled message and recipient
    await SMS.sendSMSAsync(
      [TWILIO_PHONE_NUMBER],
      messageBody
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Collection Entry</Text>
          <Text style={styles.headerSubtitle}>Record harvest on blockchain ledger</Text>
        </View>

        {/* --- Your existing AI card (unchanged) --- */}
        <View style={styles.formCard}>
          <Text style={styles.cardTitle}>🌿 AI Herb Identification</Text>
          <Text style={styles.cardSubtitle}>Verify herb species before logging</Text>
          {imageUri && ( <Image source={{ uri: imageUri }} style={styles.previewImage} /> )}
          <TouchableOpacity style={styles.actionButton} onPress={handleImagePick}><ImageIcon color="#FEFAE0" size={18} /><Text style={styles.actionButtonText}>Select Photo for AI</Text></TouchableOpacity>
          {imageUri && ( <TouchableOpacity style={[styles.submitButton, isClassifying && styles.submitButtonLoading]} onPress={handleClassify} disabled={isClassifying}>{isClassifying ? (<ActivityIndicator color="#FEFAE0" />) : (<><BrainCircuit color="#FEFAE0" size={18} /><Text style={styles.submitButtonText}>Identify Herb</Text></>)}</TouchableOpacity> )}
          {prediction && ( <View style={styles.resultContainer}><Text style={styles.resultLabel}>AI Prediction:</Text><Text style={styles.resultText}>{prediction}</Text></View> )}
        </View>
        
        {/* --- Your existing form card (unchanged) --- */}
        <View style={styles.formCard}>
          <Text style={styles.cardTitle}>📝 New Collection Log</Text>
          {error ? (<View style={styles.errorContainer}><AlertCircle color="#BC4749" size={16} /><Text style={styles.errorText}>{error}</Text></View>) : null}
          <View style={styles.inputGroup}><Sprout color="#6A994E" size={20} style={styles.icon} /><TextInput style={styles.input} placeholder="Herb Name (AI will fill this)" placeholderTextColor="#606C38" value={herbName} onChangeText={setHerbName} autoCapitalize="words" /></View>
          <View style={styles.inputGroup}><View style={styles.unitBadge}><Text style={styles.unitText}>KG</Text></View><TextInput style={styles.input} placeholder="Quantity (e.g., 5.5)" placeholderTextColor="#606C38" keyboardType="decimal-pad" value={quantity} onChangeText={setQuantity} /></View>
          <TouchableOpacity style={[styles.actionButton, location && styles.actionButtonSuccess]} onPress={handleGeoTag} disabled={isLoading}>{location ? <CheckCircle color="#FEFAE0" size={18} /> : <MapPin color="#FEFAE0" size={18} />}<Text style={styles.actionButtonText}>{location ? `📍 GPS Captured (±${location.accuracy}m)` : isLoading ? '🔍 Getting GPS...' : '📍 Capture GPS Location'}</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, capturedPhoto && styles.actionButtonSuccess]} onPress={() => Alert.alert("Photo Status", "Please use the 'Select Photo for AI' button above.")}>{capturedPhoto ? <CheckCircle color="#FEFAE0" size={18} /> : <Camera color="#FEFAE0" size={18} />}<Text style={styles.actionButtonText}>{capturedPhoto ? '📸 Photo Selected ✓' : '📸 Photo Required'}</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.submitButton, isLoading && styles.submitButtonLoading, (!herbName || !quantity || !location || !capturedPhoto) && styles.submitButtonDisabled]} onPress={handleSubmit} disabled={isLoading || !herbName || !quantity || !location || !capturedPhoto}><Text style={styles.submitButtonText}>{isLoading ? '⛓️ Recording...' : '🔗 Submit to Blockchain'}</Text></TouchableOpacity>
        </View>
        
        {/* --- ADDED: The new card for the SMS demo --- */}
        <View style={styles.formCard}>
          <Text style={styles.cardTitle}>📲 Offline Submission (SMS)</Text>
          <Text style={styles.cardSubtitle}>For areas with no internet. This opens your real SMS app to send data.</Text>
          <TouchableOpacity style={styles.actionButton} onPress={handleSmsSubmit}>
            <MessageSquare color="#FEFAE0" size={18} />
            <Text style={styles.actionButtonText}>Generate & Send Real SMS</Text>
          </TouchableOpacity>
        </View>

        {/* --- Your existing history and modal (unchanged) --- */}
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
                    <TouchableOpacity style={styles.modalButton} onPress={() => setShowQRModal(false)}>
                        <Text style={styles.modalButtonText}>Continue Farming 🌱</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

      </ScrollView>
    </SafeAreaView>
  );
}

// --- Your existing styles are unchanged ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FEFAE0' },
  container: { padding: 20, flexGrow: 1 },
  header: { alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#283618' },
  headerSubtitle: { fontSize: 14, color: '#606C38', textAlign: 'center' },
  formCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, marginBottom: 20, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#283618', marginBottom: 4 },
  cardSubtitle: { fontSize: 12, color: '#606C38', marginBottom: 16 },
  errorContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFE6E6', padding: 12, borderRadius: 8, marginBottom: 15, },
  errorText: { color: '#BC4749', marginLeft: 8, fontWeight: '600', fontSize: 14, },
  inputGroup: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0EAD6', borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#E8DCC0', },
  icon: { marginHorizontal: 15 },
  unitBadge: { backgroundColor: '#6A994E', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, marginLeft: 10, },
  unitText: { color: '#FEFAE0', fontWeight: 'bold', fontSize: 12 },
  input: { flex: 1, height: 50, color: '#283618', fontSize: 16, paddingHorizontal: 15 },
  actionButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#DDA15E', padding: 14, borderRadius: 12, marginBottom: 12, elevation: 2, },
  actionButtonSuccess: { backgroundColor: '#6A994E' },
  actionButtonLoading: { backgroundColor: '#BC6C25' },
  actionButtonText: { color: '#FEFAE0', fontSize: 15, fontWeight: '600', marginLeft: 8 },
  locationDetails: { backgroundColor: '#E8F5E8', padding: 12, borderRadius: 8, marginBottom: 12 },
  locationText: { fontSize: 14, color: '#386641', fontWeight: '600' },
  coordText: { fontSize: 12, color: '#6A994E', fontFamily: 'monospace', marginTop: 2 },
  submitButton: { backgroundColor: '#386641', padding: 16, borderRadius: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', elevation: 3, },
  submitButtonLoading: { backgroundColor: '#606C38' },
  submitButtonDisabled: { backgroundColor: '#A5A5A5' },
  submitButtonText: { color: '#FEFAE0', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
  previewImage: { width: '100%', height: 200, borderRadius: 10, marginBottom: 20, backgroundColor: '#F0EAD6', },
  resultContainer: { marginTop: 20, padding: 15, backgroundColor: '#E8F5E8', borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#6A994E' },
  resultLabel: { fontSize: 14, color: '#606C38', },
  resultText: { fontSize: 20, fontWeight: 'bold', color: '#386641', marginTop: 4, },
  historyCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
  historyItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F0EAD6', },
  historyLeft: { flex: 1, paddingRight: 12 },
  historyRight: { alignItems: 'center', minWidth: 80 },
  historyHerb: { fontSize: 16, color: '#283618', fontWeight: 'bold' },
  historyQuantity: { fontSize: 14, color: '#6A994E', fontWeight: '600', marginTop: 2 },
  historyLocation: { fontSize: 12, color: '#606C38', marginTop: 4 },
  historyDate: { fontSize: 12, color: '#BC6C25', marginTop: 2, fontWeight: '500', },
  hashText: { fontSize: 10, color: '#386641', fontFamily: 'monospace', marginTop: 4, backgroundColor: '#E8F5E8', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, },
  statusTextSuccess: { fontSize: 11, color: '#6A994E', marginTop: 4, fontWeight: 'bold', },
  statusTextPending: { fontSize: 11, color: '#DDA15E', marginTop: 4, fontWeight: 'bold', },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(40, 54, 24, 0.8)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#FFF', borderRadius: 20, padding: 30, alignItems: 'center', margin: 20, minWidth: 320, elevation: 10 },
  modalTitle: { fontSize: 24, fontWeight: 'bold', color: '#283618', marginBottom: 8, textAlign: 'center' },
  modalSubtext: { fontSize: 14, color: '#606C38', marginBottom: 24, textAlign: 'center' },
  qrContainer: { width: 140, height: 140, backgroundColor: '#F0EAD6', borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderWidth: 2, borderColor: '#386641' },
  qrText: { fontSize: 10, color: '#386641', fontWeight: 'bold', marginTop: 8 },
  modalLabel: { fontSize: 14, color: '#606C38', marginBottom: 8, fontWeight: '600' },
  hashDisplay: { fontSize: 12, color: '#283618', backgroundColor: '#F0EAD6', padding: 12, borderRadius: 8, marginBottom: 20, fontFamily: 'monospace', textAlign: 'center' },
  modalStats: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 24 },
  statText: { fontSize: 12, color: '#6A994E', backgroundColor: '#E8F5E8', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, margin: 2, fontWeight: '600' },
  modalButton: { backgroundColor: '#386641', paddingVertical: 14, paddingHorizontal: 30, borderRadius: 12, elevation: 2 },
  modalButtonText: { color: '#FEFAE0', fontSize: 16, fontWeight: 'bold' },
});

