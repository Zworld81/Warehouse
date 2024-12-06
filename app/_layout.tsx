// app/_layout.tsx
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet, StatusBar } from 'react-native';

import GuideScreen from './guide';
import { AuthProvider, useAuth } from '../context/AuthContext';
import '../global.css';
import * as Localization from 'expo-localization';
import { ThemeProvider, ThemeContext } from '../context/ThemeContext';
import { I18nManager } from "react-native";
import Toast from 'react-native-toast-message';
import toastConfig from '../utils/toastConfig';

import * as NavigationBar from 'expo-navigation-bar';
const RootLayout = () => {
  const { authState } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenGuide, setHasSeenGuide] = useState(false);

  const [fontsLoaded] = useFonts({
    'YekanBakh-Regular': require('../assets/fonts/YekanBakh-Regular.ttf'),
    'YekanBakh-Bold': require('../assets/fonts/YekanBakh-Bold.ttf'),
    'YekanBakh-Light': require('../assets/fonts/YekanBakh-Light.ttf'),
  });

  useEffect(() => {

    NavigationBar.setBackgroundColorAsync('transparent');
    NavigationBar.setBehaviorAsync('overlay-swipe');
  }, []);

  // I18nManager.forceRTL(true);
  // I18nManager.allowRTL(true);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const seenGuide = await SecureStore.getItemAsync('hasSeenGuide');
        setHasSeenGuide(seenGuide === 'true');
      } catch (e) {
        console.error('Failed to load hasSeenGuide', e);
        setHasSeenGuide(true); // فرض کنید کاربر راهنما را دیده است
      } finally {
        setIsLoading(false);
      }
    };

    checkFirstLaunch();
  }, []);

  useEffect(() => {
    if (isLoading || !hasSeenGuide) return;

    const inAuthGroup = segments[0] === 'protected';

    if (!authState.authenticated && inAuthGroup) {
      router.replace('/');
    } else if (authState.authenticated && !inAuthGroup) {
      router.replace('./protected');
    }
  }, [authState, segments, router, isLoading, hasSeenGuide]);

  if (isLoading || !fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!hasSeenGuide) {
    return <GuideScreen onFinish={() => setHasSeenGuide(true)} />;
  }





  return (
    <View className="flex-1 bg-main" style={[styles.container]}>
      <StatusBar
        barStyle='dark-content'
        backgroundColor='#DBE2EF'
      />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="protected" options={{ headerShown: false }} />
      </Stack>
      <Toast config={toastConfig} />
    </View>

  );
};

const RootLayoutNav = () => {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f21010',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RootLayoutNav;
