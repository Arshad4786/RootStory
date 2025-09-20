import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  QrCode, 
  Camera, 
  MapPin, 
  Leaf, 
  TestTube, 
  Factory, 
  Package,
  Shield,
  Award,
  Calendar,
  User,
  Truck
} from 'lucide-react-native';

export default function QRScannerScreen() {
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [scannedData, setScannedData] = useState(null);

  // Mock QR scan result with comprehensive traceability data
  const mockTraceabilityData = {
    productId: "ASH_2025_A4B8C1",
    herbName: "Ashwagandha",
    finalProduct: "AyurPhoria Ashwagandha Capsules - 500mg",
    batchSize: "1000 capsules",
    manufacturingDate: "2025-09-17",
    expiryDate: "2027-09-17",
    
    // Supply Chain Journey
    journey: [
      {
        stage: "Collection",
        date: "2025-09-12",
        actor: "Ramesh Kumar (Farmer)",
        location: "Farm Plot 42, Nashik, Maharashtra",
        coordinates: { lat: 19.9975, lng: 73.7898 },
        details: "Organic Ashwagandha roots harvested at peak potency",
        quantity: "5kg fresh roots",
        certifications: ["Organic", "Fair Trade"],
        blockchainHash: "0x1a2b3c4d5e6f",
        verified: true
      },
      {
        stage: "Transportation", 
        date: "2025-09-12",
        actor: "EcoTrans Logistics",
        location: "Cold chain transport to processing facility",
        details: "Temperature controlled transport maintained at 15-20°C",
        duration: "4 hours",
        blockchainHash: "0x2b3c4d5e6f7g",
        verified: true
      },
      {
        stage: "Processing",
        date: "2025-09-13",
        actor: "SunDried Organics Ltd.",
        location: "Aurangabad Processing Center",
        coordinates: { lat: 19.8762, lng: 75.3433 },
        details: "Traditional sun-drying and grinding to fine powder",
        processType: "Traditional Ayurvedic Method",
        yield: "1.2kg powder from 5kg roots",
        qualityGrade: "Premium A+",
        blockchainHash: "0x3c4d5e6f7g8h",
        verified: true
      },
      {
        stage: "Quality Testing",
        date: "2025-09-14", 
        actor: "AyurTest Labs Pvt. Ltd.",
        location: "Mumbai Testing Facility",
        details: "Comprehensive quality and purity analysis completed",
        tests: [
          { name: "Withanolides Content", result: "5.2%", standard: "≥3%", status: "PASS" },
          { name: "Moisture Content", result: "4.8%", standard: "≤5%", status: "PASS" },
          { name: "Heavy Metals", result: "None Detected", standard: "BDL", status: "PASS" },
          { name: "Pesticide Residue", result: "None Detected", standard: "BDL", status: "PASS" },
          { name: "Microbial Count", result: "Within Limits", standard: "IP Standards", status: "PASS" },
          { name: "DNA Authentication", result: "Confirmed", standard: "Withania somnifera", status: "PASS" }
        ],
        certificateNo: "AYT/2025/0891",
        blockchainHash: "0x4d5e6f7g8h9i",
        verified: true
      },
      {
        stage: "Manufacturing",
        date: "2025-09-16",
        actor: "AyurPhoria Wellness Pvt. Ltd.",
        location: "GMP Certified Manufacturing Unit, Pune",
        coordinates: { lat: 18.5204, lng: 73.8567 },
        details: "Encapsulation in vegetarian capsules with standardized extract",
        batchNo: "APW/ASH/2025/091",
        capsuleCount: 1000,
        dosage: "500mg per capsule",
        excipients: ["Microcrystalline Cellulose", "Vegetable Capsule"],
        gmpCertificate: "GMP/2024/1205",
        blockchainHash: "0x5e6f7g8h9i0j",
        verified: true
      },
      {
        stage: "Final Packaging",
        date: "2025-09-17",
        actor: "AyurPhoria Wellness Pvt. Ltd.", 
        location: "Packaging Unit, Pune",
        details: "Sealed in tamper-proof containers with QR codes",
        packagingType: "HDPE Bottle with desiccant",
        labelingCompliance: "AYUSH Guidelines 2023",
        blockchainHash: "0x6f7g8h9i0j1k",
        verified: true
      }
    ],

    // Certifications and Compliance
    certifications: [
      { name: "Organic Certified", issuer: "NPOP India", validTill: "2026-12-31" },
      { name: "Fair Trade", issuer: "Fair Trade Alliance", validTill: "2026-06-30" },
      { name: "GMP Certified", issuer: "WHO-GMP", validTill: "2026-03-15" },
      { name: "AYUSH Approved", issuer: "Ministry of AYUSH", licenseNo: "AYU/MFG/2023/1847" }
    ],

    // Sustainability Metrics
    sustainability: {
      carbonFootprint: "2.1 kg CO₂ equivalent",
      waterUsage: "15L per kg of final product", 
      biodiversityImpact: "Low - Cultivated variety",
      farmersSupported: 3,
      fairTradeBonus: "₹250 paid to farmers"
    },

    // Consumer Information
    usage: {
      recommendedDosage: "1-2 capsules daily with warm water",
      bestTime: "After meals",
      contraindications: "Pregnancy, lactation, autoimmune disorders",
      shelfLife: "24 months from manufacturing date"
    }
  };

  const handleQRScan = () => {
    setIsScanning(true);
    // Simulate camera scan
    setTimeout(() => {
      setIsScanning(false);
      setScannedData(mockTraceabilityData);
      setShowResults(true);
      Alert.alert("QR Code Scanned ✅", "Traceability information loaded successfully!");
    }, 2000);
  };

  const renderJourneyStage = (stage, index) => {
    const stageIcons = {
      Collection: Leaf,
      Transportation: Truck, 
      Processing: Factory,
      'Quality Testing': TestTube,
      Manufacturing: Package,
      'Final Packaging': Package
    };
    const StageIcon = stageIcons[stage.stage] || Package;

    return (
      <View key={index} style={styles.stageContainer}>
        <View style={styles.stageHeader}>
          <View style={styles.stageIconContainer}>
            <StageIcon color="#FEFAE0" size={20} />
          </View>
          <View style={styles.stageInfo}>
            <Text style={styles.stageTitle}>{stage.stage}</Text>
            <Text style={styles.stageDate}>{stage.date}</Text>
            <Text style={styles.stageActor}>{stage.actor}</Text>
          </View>
          {stage.verified && (
            <Shield color="#6A994E" size={16} />
          )}
        </View>
        
        <View style={styles.stageDetails}>
          <Text style={styles.stageDescription}>{stage.details}</Text>
          {stage.location && (
            <Text style={styles.stageLocation}>📍 {stage.location}</Text>
          )}
          
          {/* Quality Test Results */}
          {stage.tests && (
            <View style={styles.testsContainer}>
              <Text style={styles.testsTitle}>🧪 Test Results:</Text>
              {stage.tests.map((test, testIndex) => (
                <View key={testIndex} style={styles.testRow}>
                  <Text style={styles.testName}>{test.name}:</Text>
                  <Text style={styles.testResult}>{test.result}</Text>
                  <Text style={[styles.testStatus, test.status === 'PASS' ? styles.testPass : styles.testFail]}>
                    {test.status}
                  </Text>
                </View>
              ))}
            </View>
          )}
          
          <Text style={styles.blockchainHash}>🔗 {stage.blockchainHash}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <QrCode color="#386641" size={32} />
          <Text style={styles.headerTitle}>Product Scanner</Text>
          <Text style={styles.headerSubtitle}>Scan QR code to trace your Ayurvedic product</Text>
        </View>

        {/* Scan Button */}
        <TouchableOpacity 
          style={[styles.scanButton, isScanning && styles.scanButtonActive]}
          onPress={handleQRScan}
          disabled={isScanning}
        >
          <Camera color="#FEFAE0" size={24} />
          <Text style={styles.scanButtonText}>
            {isScanning ? "📱 Scanning..." : "📱 Scan QR Code"}
          </Text>
        </TouchableOpacity>

        {/* Quick Info Cards */}
        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Shield color="#386641" size={20} />
            <Text style={styles.infoTitle}>Authenticity</Text>
            <Text style={styles.infoDesc}>Verify genuine products</Text>
          </View>
          <View style={styles.infoCard}>
            <MapPin color="#386641" size={20} />
            <Text style={styles.infoTitle}>Traceability</Text>
            <Text style={styles.infoDesc}>Farm to shelf journey</Text>
          </View>
          <View style={styles.infoCard}>
            <TestTube color="#386641" size={20} />
            <Text style={styles.infoTitle}>Quality</Text>
            <Text style={styles.infoDesc}>Lab test results</Text>
          </View>
          <View style={styles.infoCard}>
            <Award color="#386641" size={20} />
            <Text style={styles.infoTitle}>Certifications</Text>
            <Text style={styles.infoDesc}>Verified standards</Text>
          </View>
        </View>

        {/* Recent Scans */}
        <View style={styles.recentCard}>
          <Text style={styles.cardTitle}>📱 Recent Scans</Text>
          <View style={styles.recentItem}>
            <Text style={styles.recentText}>Ashwagandha Capsules</Text>
            <Text style={styles.recentDate}>2 hours ago</Text>
          </View>
          <View style={styles.recentItem}>
            <Text style={styles.recentText}>Brahmi Powder</Text>
            <Text style={styles.recentDate}>1 day ago</Text>
          </View>
        </View>

      </ScrollView>

      {/* Results Modal */}
      <Modal visible={showResults} animationType="slide">
        <SafeAreaView style={styles.modalSafeArea}>
          <ScrollView style={styles.modalContainer}>
            
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>🌿 Product Traceability</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowResults(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            {scannedData && (
              <>
                {/* Product Info */}
                <View style={styles.productCard}>
                  <Text style={styles.productName}>{scannedData.finalProduct}</Text>
                  <Text style={styles.productId}>ID: {scannedData.productId}</Text>
                  <View style={styles.productDetails}>
                    <Text style={styles.detailText}>📦 Batch: {scannedData.batchSize}</Text>
                    <Text style={styles.detailText}>📅 Mfg: {scannedData.manufacturingDate}</Text>
                    <Text style={styles.detailText}>⏰ Exp: {scannedData.expiryDate}</Text>
                  </View>
                </View>

                {/* Certifications */}
                <View style={styles.certCard}>
                  <Text style={styles.cardTitle}>🏆 Certifications</Text>
                  {scannedData.certifications.map((cert, index) => (
                    <View key={index} style={styles.certItem}>
                      <Award color="#6A994E" size={16} />
                      <View style={styles.certInfo}>
                        <Text style={styles.certName}>{cert.name}</Text>
                        <Text style={styles.certIssuer}>{cert.issuer}</Text>
                      </View>
                    </View>
                  ))}
                </View>

                {/* Supply Chain Journey */}
                <View style={styles.journeyCard}>
                  <Text style={styles.cardTitle}>🔄 Supply Chain Journey</Text>
                  {scannedData.journey.map((stage, index) => renderJourneyStage(stage, index))}
                </View>

                {/* Sustainability */}
                <View style={styles.sustainabilityCard}>
                  <Text style={styles.cardTitle}>🌱 Sustainability Impact</Text>
                  <View style={styles.sustainabilityGrid}>
                    <View style={styles.sustainabilityItem}>
                      <Text style={styles.sustainabilityLabel}>Carbon Footprint</Text>
                      <Text style={styles.sustainabilityValue}>{scannedData.sustainability.carbonFootprint}</Text>
                    </View>
                    <View style={styles.sustainabilityItem}>
                      <Text style={styles.sustainabilityLabel}>Water Usage</Text>
                      <Text style={styles.sustainabilityValue}>{scannedData.sustainability.waterUsage}</Text>
                    </View>
                    <View style={styles.sustainabilityItem}>
                      <Text style={styles.sustainabilityLabel}>Farmers Supported</Text>
                      <Text style={styles.sustainabilityValue}>{scannedData.sustainability.farmersSupported}</Text>
                    </View>
                    <View style={styles.sustainabilityItem}>
                      <Text style={styles.sustainabilityLabel}>Fair Trade Bonus</Text>
                      <Text style={styles.sustainabilityValue}>{scannedData.sustainability.fairTradeBonus}</Text>
                    </View>
                  </View>
                </View>

                {/* Usage Instructions */}
                <View style={styles.usageCard}>
                  <Text style={styles.cardTitle}>💊 Usage Instructions</Text>
                  <Text style={styles.usageText}>
                    <Text style={styles.usageLabel}>Dosage: </Text>
                    {scannedData.usage.recommendedDosage}
                  </Text>
                  <Text style={styles.usageText}>
                    <Text style={styles.usageLabel}>Best Time: </Text>
                    {scannedData.usage.bestTime}
                  </Text>
                  <Text style={styles.usageWarning}>
                    ⚠️ {scannedData.usage.contraindications}
                  </Text>
                </View>

              </>
            )}

          </ScrollView>
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
    marginBottom: 30,
  },
  
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#283618',
    marginTop: 10,
  },
  
  headerSubtitle: {
    fontSize: 14,
    color: '#606C38',
    textAlign: 'center',
    marginTop: 4,
  },
  
  scanButton: {
    flexDirection: 'row',
    backgroundColor: '#386641',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    elevation: 3,
  },
  
  scanButtonActive: {
    backgroundColor: '#6A994E',
  },
  
  scanButtonText: {
    color: '#FEFAE0',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  
  infoCard: {
    width: '48%',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 1,
  },
  
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#283618',
    marginTop: 8,
  },
  
  infoDesc: {
    fontSize: 12,
    color: '#606C38',
    textAlign: 'center',
    marginTop: 4,
  },
  
  recentCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
  },
  
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#283618',
    marginBottom: 16,
  },
  
  recentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EAD6',
  },
  
  recentText: {
    fontSize: 14,
    color: '#283618',
  },
  
  recentDate: {
    fontSize: 12,
    color: '#606C38',
  },
  
  // Modal Styles
  modalSafeArea: {
    flex: 1,
    backgroundColor: '#FEFAE0',
  },
  
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  
  modalTitle: {
    fontSize: 24,
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  productCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
  },
  
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#283618',
    marginBottom: 4,
  },
  
  productId: {
    fontSize: 12,
    color: '#606C38',
    fontFamily: 'monospace',
    marginBottom: 12,
  },
  
  productDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  
  detailText: {
    fontSize: 12,
    color: '#6A994E',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  
  certCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
  },
  
  certItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EAD6',
  },
  
  certInfo: {
    marginLeft: 12,
    flex: 1,
  },
  
  certName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#283618',
  },
  
  certIssuer: {
    fontSize: 12,
    color: '#606C38',
  },
  
  journeyCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
  },
  
  stageContainer: {
    marginBottom: 20,
    borderLeftWidth: 2,
    borderLeftColor: '#386641',
    paddingLeft: 16,
  },
  
  stageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  stageIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#386641',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  
  stageInfo: {
    flex: 1,
  },
  
  stageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#283618',
  },
  
  stageDate: {
    fontSize: 12,
    color: '#BC6C25',
    marginTop: 2,
  },
  
  stageActor: {
    fontSize: 12,
    color: '#606C38',
    marginTop: 2,
  },
  
  stageDetails: {
    marginLeft: 48,
  },
  
  stageDescription: {
    fontSize: 14,
    color: '#283618',
    marginBottom: 4,
  },
  
  stageLocation: {
    fontSize: 12,
    color: '#6A994E',
    marginBottom: 8,
  },
  
  testsContainer: {
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  
  testsTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#283618',
    marginBottom: 8,
  },
  
  testRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
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
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
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
  
  sustainabilityCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
  },
  
  sustainabilityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  
  sustainabilityItem: {
    width: '48%',
    backgroundColor: '#E8F5E8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  
  sustainabilityLabel: {
    fontSize: 11,
    color: '#606C38',
    textAlign: 'center',
    marginBottom: 4,
  },
  
  sustainabilityValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#6A994E',
    textAlign: 'center',
  },
  
  usageCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },
  
  usageText: {
    fontSize: 14,
    color: '#283618',
    marginBottom: 8,
    lineHeight: 20,
  },
  
  usageLabel: {
    fontWeight: 'bold',
    color: '#386641',
  },
  
    usageWarning: {
      fontSize: 12,
      color: '#BC6C25',
      backgroundColor: '#FFF3CD',
      padding: 10,
      borderRadius: 8,
      marginTop: 8,
    }
  });