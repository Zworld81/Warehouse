// app/_layout.tsx
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet, StatusBar } from 'react-native';

import GuideScreen from './guide';
import { AuthProvider, useAuth } from '../context/AuthContext';
import '../global.css';

import { ThemeProvider, ThemeContext } from '../context/ThemeContext';

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
      router.replace('/protected');
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
    <ThemeProvider>
    <ThemeContext.Consumer>
      {({ theme, colorScheme }) => {
        const isDarkMode = theme === 'dark' || (theme === 'system' && colorScheme === 'dark');
        console.log('isDarkMode:', isDarkMode);
        return (
          <View className={`${isDarkMode ? 'dark' : ''} flex-1`}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={isDarkMode ? '#000000' : '#ffffff'}
            />
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              {/* صفحات دیگر */}
            </Stack>
          </View>
        );
      }}
    </ThemeContext.Consumer>
  </ThemeProvider>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RootLayoutNav;
