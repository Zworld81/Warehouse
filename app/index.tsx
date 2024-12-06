// app/index.tsx
import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import {
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Alert,
  View,
  StyleSheet,
  ScrollView
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as LocalAuthentication from 'expo-local-authentication';

const Page = () => {
  const sheetRef = useRef<BottomSheet>(null);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [secureText, setSecureText] = useState(true);
  const [isSnapPressed, setIsSnapPressed] = useState(false);
  const snapPoints = useMemo(() => ["30%", "50%"], []);

  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [biometricType, setBiometricType] = useState<LocalAuthentication.AuthenticationType | null>(null);

  const { onLogin } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        const enrolled = await LocalAuthentication.isEnrolledAsync();
        if (compatible && enrolled) {
          setIsBiometricSupported(true);
          const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
          if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
            setBiometricType(LocalAuthentication.AuthenticationType.FINGERPRINT);
          } else if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
            setBiometricType(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION);
          }
        } else {
          setIsBiometricSupported(false);
        }
      } catch (error) {
        console.log('Biometric checking error:', error);
        setIsBiometricSupported(false);
      }
    })();
  }, []);

  const handlePress = useCallback(() => {
    if (isSnapPressed) {
      handleClosePress();
    } else {
      handleSnapPress(0); 
    }
  }, [isSnapPressed]);

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setIsSnapPressed(false); 
    } else {
      setIsSnapPressed(true); 
    }
  }, []);

  const showToast = useCallback((type: 'success' | 'error', text1: string, text2?: string) => {
    Toast.show({
      type,
      text1,
      text2,
      position: 'top',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 60,
    });
  }, []);

  const onSignInPress = async () => {
    if (username.trim() === '' || password.trim() === '') {
      showToast('error', 'خطا', 'لطفاً نام کاربری و رمز عبور را وارد کنید.');
      return;
    }
    try {
      await onLogin!(username, password);
      showToast('success', 'موفقیت', 'ورود شما با موفقیت انجام شد.');
    } catch (error) {
      console.log('Login Error:', error);
      Alert.alert('خطا', 'ورود ناموفق بود.');
      showToast('error', 'خطا', 'ورود ناموفق بود.');
    }
  };

  const handleBiometricAuth = useCallback(async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'احراز هویت با اثر انگشت',
        fallbackLabel: 'استفاده از رمز عبور',
        disableDeviceFallback: false,
      });

      if (result.success) {
        // در صورت موفقیت، کاربر را لاگین می‌کنیم (در اینجا فرض شده است شما همان کاربر admin را لاگین می‌کنید)
        try {
          await onLogin!(username, password);
          showToast('success', 'موفقیت', 'احراز هویت با موفقیت انجام شد.');
        } catch (error) {
          console.log('Biometric Login Error:', error);
          showToast('error', 'خطا', 'مشکلی در ورود با اثر انگشت پیش آمد.');
        }
      } else {
        showToast('error', 'خطا', 'احراز هویت ناموفق بود.');
      }
    } catch (error) {
      console.error('Biometric Auth Error:', error);
      showToast('error', 'خطا', 'مشکلی در احراز هویت پیش آمد.');
    }
  }, [onLogin, username, password, showToast]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View className="absolute left-0 right-0 -top-20 ">
        <Svg
          height="300"
          width="100%"
          viewBox="0 0 412 248"
          fill="none"
        >
          <Path
            d="M676.974 197.415C676.974 322.661 594.759 -21.1806 391.366 148.634C187.974 318.45 -49.0263 243.136 -49.0263 117.89C-49.0263 -7.35571 39.7621 -242.256 220.39 -242.256C401.018 -242.256 676.974 72.1692 676.974 197.415Z"
            fill="url(#paint0_linear_89_1544)"
          />
          <Defs>
            <LinearGradient
              id="paint0_linear_89_1544"
              x1="174.312"
              y1="147.487"
              x2="148.491"
              y2="-108.865"
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#796BF1" />
              <Stop offset="1" stopColor="#322382" />
            </LinearGradient>
          </Defs>
        </Svg>
      </View>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        className="px-5 py-7 mt-[230px] bg-primary rounded-xl shadow mx-4"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {/* Title */}
          <Text className="text-[32px] text-black font-Bold text-center mb-8">
            Welcome Back.
          </Text>
          {/* Username Input */}
          <View className="flex-row items-center border-b-0 border border-gray-300 rounded-lg rounded-b-none px-3">
            <TextInput
              autoCapitalize="none"
              placeholder="نام کاربری"
              value={username}
              onChangeText={setUsername}
              className="flex-1 h-12 text-black font-Regular text-right"
            />
            <Ionicons name="person-outline" size={24} color="gray" className="mr-2" />
          </View>

          {/* Password Input */}
          <View className="flex-row items-center border border-t-hairline border-gray-300 rounded-lg rounded-t-none mb-4 px-3">
            <TouchableOpacity onPress={() => setSecureText(!secureText)}>
              <Ionicons
                name={secureText ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
            <TextInput
              placeholder="رمز عبور"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secureText}
              className="flex-1 h-12 text-black font-Regular text-right "
              autoCorrect={false}
            />
            <Ionicons name="lock-closed-outline" size={24} color="gray" className="mr-2" />
          </View>

          {/* Login Button */}
          <TouchableOpacity
            onPress={onSignInPress}
            className="bg-dark w-full h-14 justify-center items-center rounded-lg mb-4 self-center mt-5"
          >
            <Text className="text-white text-md font-Regular">ورود با رمز عبور</Text>
          </TouchableOpacity>

          {/* Biometric Login Button */}
          {isBiometricSupported && (
            <TouchableOpacity
              onPress={handleBiometricAuth}
              className="bg-dark w-full h-14 justify-center items-center rounded-lg mb-4 self-center mt-2"
            >
              <Text className="text-white text-md font-Regular">
                ورود با {biometricType === LocalAuthentication.AuthenticationType.FINGERPRINT ? 'اثر انگشت' : 'چهره'}
              </Text>
            </TouchableOpacity>
          )}

          {/* Info Link */}
          <Link href={'/info'} className="text-blue-500 text-right font-Regular">
            قوانین و مقررات
          </Link>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Help Button */}
      <TouchableOpacity className="absolute top-4 left-4 bg-white rounded-md shadow-md">
        <Ionicons name="help-outline" size={20} color="gray" className="p-2" onPress={handlePress} />
      </TouchableOpacity>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChanges}
        enablePanDownToClose={true} 
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <View className="p-4">
            <Text className="text-xl font-Bold mb-4 text-right">پشتیبانی</Text>
            <Text className="text-gray-700 font-Regular text-right">
              اگر مشکلی دارید، می‌توانید با تیم پشتیبانی ما تماس بگیرید
            </Text>
            <TouchableOpacity className="mt-4 bg-blue-500 p-3 rounded">
              <Link href='tel:09301157083'>
                <Text className="text-white text-center font-Regular">تماس با پشتیبانی</Text>
              </Link>
            </TouchableOpacity>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBE2EF',
  },
  contentContainer: {
    padding: 16,
    alignItems: 'center',
  },
});

export default Page;
