// app/index.tsx
import React, { useState } from 'react';
import {
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Link, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import ThemeToggleButton from '../components/ThemeToggleButton';

const Page = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const { onLogin } = useAuth();
  const router = useRouter();

  const onSignInPress = async () => {
    try {
      await onLogin!(username, password);
    } catch (error) {
      Alert.alert('خطا', 'ورود ناموفق بود.');
    }
  };

  const onUserSignInPress = async () => {
    try {
      await onLogin!('user', 'user');
    } catch (error) {
      Alert.alert('خطا', 'ورود ناموفق بود.');
    }
  };

  const resetGuide = async () => {
    try {
      await SecureStore.setItemAsync('hasSeenGuide', 'false');
      router.replace('/guide');
    } catch (error) {
      console.error('Failed to reset guide', error);
      Alert.alert('خطا', 'بازنشانی راهنما موفقیت‌آمیز نبود.');
    }
  };

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    className="flex-1 justify-center px-8 bg-white dark:bg-black"
  >
    <Text className="font-yekanRegular text-2xl text-black dark:text-white text-center mb-10">
      My Epic App
    </Text>
    <TextInput
      autoCapitalize="none"
      placeholder="admin"
      value={username}
      onChangeText={setUsername}
      className="mb-4 h-12 border border-gray-300 rounded px-3 text-black dark:text-white bg-white dark:bg-gray-800"
    />
    <TextInput
      placeholder="password"
      value={password}
      onChangeText={setPassword}
      secureTextEntry
      className="mb-4 h-12 border border-gray-300 rounded px-3 text-black dark:text-white bg-white dark:bg-gray-800"
    />

    <TouchableOpacity
      onPress={onSignInPress}
      className="bg-blue-700 w-full h-14 justify-center items-center rounded mb-4"
    >
      <Text className="text-white">ورود</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={onUserSignInPress}
      className="bg-blue-700 w-full h-14 justify-center items-center rounded mb-4"
    >
      <Text className="text-white">ورود به عنوان کاربر</Text>
    </TouchableOpacity>
    <Link href={'/info'} className="text-blue-500 mb-4">
      اطلاعات
    </Link>

    <TouchableOpacity
      onPress={resetGuide}
      className="bg-red-600 w-full h-14 justify-center items-center rounded mb-4"
    >
      <Text className="text-white">بازنشانی راهنما</Text>
    </TouchableOpacity>

    <ThemeToggleButton />
  </KeyboardAvoidingView>
  );
};

export default Page;
