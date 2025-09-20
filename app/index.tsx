import { Redirect } from 'expo-router';
import React from 'react';

// This component will redirect the user to the main tabs screen.
export default function Index() {
  return <Redirect href="/(tabs)" />;
}

