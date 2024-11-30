// app/index.tsx
import React, { useState, useRef, useMemo, useCallback } from 'react';
import {
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Alert,
  View,
  Dimensions,
  StyleSheet,
  Button
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

const Page = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [secureText, setSecureText] = useState(true);
  const { onLogin } = useAuth();
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
      Alert.alert('خطا', 'ورود ناموفق بود.');
      showToast('error', 'خطا', 'ورود ناموفق بود.');
    }
  };

  // const onUserSignInPress = async () => {
  //   try {
  //     await onLogin!('user', 'user');
  //   } catch (error) {
  //     Alert.alert('خطا', 'ورود ناموفق بود.');
  //   }
  // };

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <View className="flex-1 ">
      {/* SVG Wave Background */}
      <View className="absolute left-0 right-0 -top-20 ">
        <Svg
          height="300"
          width="100%"
          viewBox="0 0 412 248"
          fill="none"
          className=""
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
        className="px-8 mt-[250px]"
      >
        {/* Title */}
        <Text className=" text-[32px] text-black font-Bold text-center mb-8">
          خوش آمدی
        </Text>
        {/* Username Input */}
        <View className="flex-row items-center border border-gray-300 rounded mb-4 px-3">

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
        <View className="flex-row items-center border border-gray-300 rounded mb-4 px-3">
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
            className="flex-1 h-12 text-black font-Regular text-right"
            autoCorrect={false}

          />
          <Ionicons name="lock-closed-outline" size={24} color="gray" className="mr-2" />

        </View>

        {/* Login Button */}
        <TouchableOpacity
          onPress={onSignInPress}
          className="bg-blue-700 w-full h-14 justify-center items-center rounded mb-4 self-center mt-5"
        >
          <Text className="text-white text-md font-Regular">ورود با اثر انگشت</Text>
        </TouchableOpacity>

        {/* User Login Button */}
        {/* <TouchableOpacity
            onPress={onUserSignInPress}
            className="bg-blue-700 w-4/5 h-14 justify-center items-center rounded mb-4 self-center"
          >
            <Text className="text-white text-lg">ورود به عنوان کاربر</Text>
          </TouchableOpacity> */}

        {/* Info Link */}
        <Link href={'/info'} className="text-blue-500 text-right mb-4 font-Regular">
          قوانین
        </Link>
      </KeyboardAvoidingView>
      <TouchableOpacity className="absolute top-4 left-4 bg-white rounded-md shadow-md" >
        <Ionicons name="help-outline" size={20} color="gray" className="p-2" onPress={handlePresentModalPress} />
      </TouchableOpacity>
      <GestureHandlerRootView style={styles.container}>
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            onChange={handleSheetChanges}
          >
            <BottomSheetView style={styles.contentContainer}>
              <View className="p-4">
                <Text className="text-xl font-Bold mb-4 text-right">پشتیبانی</Text>
                <Text className="text-gray-700 font-Regular text-right">
                  اگر مشکلی دارید، می‌توانید با تیم پشتیبانی ما تماس بگیرید
                </Text>
                <TouchableOpacity
                  className="mt-4 bg-blue-500 p-3 rounded"
                >
                  <Link href='tel:09301157083'><Text className="text-white text-center font-Regular">تماس با پشتیبانی</Text></Link>
                </TouchableOpacity>
              </View>
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
export default Page;
