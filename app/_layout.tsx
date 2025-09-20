import { Stack } from 'expo-router';
import React, { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import AnimatedSplashScreen from '../components/AnimatedSplashScreen';

// Keep the native splash screen visible while the app boots
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationFinished, setSplashAnimationFinished] = useState(false);

  useEffect(() => {
    // This is where you would load fonts, make API calls, etc.
    // We'll just simulate a 2-second delay for now.
    setTimeout(() => {
      setAppReady(true);
    }, 2000);
  }, []);

  useEffect(() => {
    // This function will run when either the app is ready or the animation is finished
    const hideSplashScreen = async () => {
      if (isAppReady && isSplashAnimationFinished) {
        // Hide the native splash screen
        await SplashScreen.hideAsync();
      }
    };
    hideSplashScreen();
  }, [isAppReady, isSplashAnimationFinished]); // Re-run this effect if these values change

  if (!isAppReady) {
    return null; // The native splash screen is still visible here, so return nothing.
  }

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && !isSplashAnimationFinished ? (
        // If the app is ready, but the animation hasn't finished, show the animation.
        <AnimatedSplashScreen
          onAnimationFinish={() => {
            setSplashAnimationFinished(true);
          }}
        />
      ) : (
        // Once the animation is finished, show the main app.
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: '#386641' },
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      )}
    </View>
  );
}

