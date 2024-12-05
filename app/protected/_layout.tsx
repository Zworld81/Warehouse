// app/protected/_layout.tsx
import React, { useState, useCallback, useMemo, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { usePathname } from 'expo-router';
import { Tabs } from 'expo-router';
import Header from '../../components/Header';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth, Role } from '../../context/AuthContext';
import { Link } from 'expo-router';
import { Stack } from 'expo-router';
const TabLayout = () => {
  const { authState } = useAuth();
  const pathname = usePathname();
  const [isSnapPressed, setIsSnapPressed] = useState(false);
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['30%', '60%'], []);


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
    console.log('Sheet index changed:', index);
    if (index === -1) {
      setIsSnapPressed(false);
    } else {
      setIsSnapPressed(true);
    }
  }, []);

  const getTitle = (path: string) => {
    switch (path) {
      case '/protected':
      case '/protected/home':
        return 'خانه';
      case '/protected/news':
        return 'Newsfeed';
      case '/protected/admin':
        return 'Admin Area';
      case '/protected/test':
        return 'Test Area';
      default:
        return '';
    }
  };

  const getModalContent = (path: string) => {
    switch (path) {
      case '/protected':
      case '/protected/home':
        return 'محتوای صفحه خانه';
      case '/protected/news':
        return 'محتوای اخبار';
      case '/protected/admin':
        return 'محتوای صفحه ادمین';
      case '/protected/test':
        return 'محتوای صفحه تست';
      default:
        return 'محتوای پیش‌فرض';
    }
  };

  const title = getTitle(pathname);
  const modalContent = getModalContent(pathname);

  return (
    <GestureHandlerRootView className="flex-1">
      {/* Custom Layout */}
      <View className="flex-1">
        {/* Header */}
        <Header title={title} modalContent={modalContent} openSheet={handlePress} />

        <Tabs initialRouteName="home" screenOptions={{
          tabBarStyle: {
            backgroundColor: '#DBE2EF', // رنگ پس‌زمینه تب‌بار
          },
          tabBarActiveTintColor: '#3F72AF', // رنگ آیکون و متن فعال
          tabBarInactiveTintColor: '#112D4E', // رنگ آیکون و متن غیرفعال
        }}>
          {/* Home Tab */}
          <Tabs.Screen
            name="home"
            options={{
              headerShown: false,
              tabBarLabel: 'Home',
              tabBarIcon: ({ size, color }) => (
                <Ionicons name="home-outline" size={size} color={color} />
              ),
            }}
            redirect={authState?.authenticated === null}
          />

          {/* News Tab */}
          <Tabs.Screen
            name="news"
            options={{
              headerShown: false,
              tabBarLabel: 'News',
              tabBarIcon: ({ size, color }) => (
                <Ionicons name="newspaper-outline" size={size} color={color} />
              ),
            }}
            redirect={authState?.role !== Role.USER}
          />

          {/* Admin Tab */}
          <Tabs.Screen
            name="admin"
            options={{
              headerShown: false,
              tabBarLabel: 'Admin',
              
              tabBarIcon: ({ size, color }) => (
                <Ionicons name="cog-outline" size={size} color={color} />
              ),
            }}
            redirect={authState?.role !== Role.ADMIN}
          />

          {/* Test Tab */}
          <Tabs.Screen
            name="test"
            options={{
              headerShown: false,
              tabBarLabel: 'Test',
              tabBarIcon: ({ size, color }) => (
                <Ionicons name="cog-outline" size={size} color={color} />
              ),
            }}
            redirect={!(authState?.role === Role.ADMIN || authState?.role === Role.USER)}
          />
          <Tabs.Screen
            name="scan"
            options={{
              headerShown: false,
              tabBarLabel: 'scan',
              tabBarIcon: ({ size, color }) => (
                <Ionicons name="cog-outline" size={size} color={color} />
              ),
            }}
            redirect={!(authState?.role === Role.ADMIN || authState?.role === Role.USER)}
          />
        </Tabs>

        {/* BottomSheet */}
        <BottomSheet
          ref={sheetRef}
          index={-1}
          snapPoints={snapPoints}
          enableDynamicSizing={false}
          onChange={handleSheetChanges}
          enablePanDownToClose={true}
        >
          <BottomSheetScrollView>
            <View className="p-4">
              <Text className="text-xl font-Bold mb-4 text-right">پشتیبانی</Text>
              <Text className="text-gray-700 font-Regular text-right">
                اگر مشکلی دارید، می‌توانید با تیم پشتیبانی ما تماس بگیرید
                {modalContent}
              </Text>
              <TouchableOpacity className="mt-4 bg-blue-500 p-3 rounded">
                <Link href="tel:09301157083">
                  <Text className="text-white text-center font-Regular">تماس با پشتیبانی</Text>
                </Link>
              </TouchableOpacity>
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default TabLayout;
