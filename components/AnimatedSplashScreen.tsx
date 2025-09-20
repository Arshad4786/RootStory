import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

interface AnimatedSplashScreenProps {
  onAnimationFinish?: (isCancelled: boolean) => void;
}

export default function AnimatedSplashScreen({ onAnimationFinish }: AnimatedSplashScreenProps) {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/splash_animation.json')}
        style={styles.lottie}
        autoPlay
        loop={false}
        // This is the crucial part that signals the animation is done
        onAnimationFinish={onAnimationFinish}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#386641', // Match your app's background color
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
});

