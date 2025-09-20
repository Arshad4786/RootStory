// app/(tabs)/_layout.tsx - Updated with dashboard tab
import React from 'react';
import { Tabs } from 'expo-router';
import { 
  Sprout, 
  Factory, 
  Package, 
  QrCode, 
  BarChart3,
  Home
} from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#386641',
        tabBarInactiveTintColor: '#606C38',
        tabBarStyle: {
          backgroundColor: '#FEFAE0',
          borderTopColor: '#E8DCC0',
          height: 70,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: '#386641',
        },
        headerTintColor: '#FEFAE0',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      
      {/* Home - Keep your current role selector or replace with dashboard */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          headerTitle: 'AyurPhoria',
        }}
      />

      {/* Dashboard Tab - Add this new tab */}
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => <BarChart3 color={color} size={size} />,
          headerTitle: 'Supply Chain Dashboard',
        }}
      />

      {/* Your existing tabs */}
      <Tabs.Screen
        name="farmer"
        options={{
          title: 'Farmer',
          tabBarIcon: ({ color, size }) => <Sprout color={color} size={size} />,
          headerTitle: 'Farmer Collection',
        }}
      />

      <Tabs.Screen
        name="processor"
        options={{
          title: 'Processor',
          tabBarIcon: ({ color, size }) => <Factory color={color} size={size} />,
          headerTitle: 'Processing & Labs',
        }}
      />

      <Tabs.Screen
        name="manufacturer"
        options={{
          title: 'Manufacturer',
          tabBarIcon: ({ color, size }) => <Package color={color} size={size} />,
          headerTitle: 'Manufacturing',
        }}
      />

      <Tabs.Screen
        name="consumer"
        options={{
          title: 'Scanner',
          tabBarIcon: ({ color, size }) => <QrCode color={color} size={size} />,
          headerTitle: 'Product Scanner',
        }}
      />

    </Tabs>
  );
}