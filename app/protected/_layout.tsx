// app/protected/_layout.tsx
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Role, useAuth } from '../../context/AuthContext';
import { Tabs, usePathname } from 'expo-router';
import Header from '../../components/Header';
import { View } from 'react-native';

const TabLayout = () => {
  const { authState } = useAuth();
  const pathname = usePathname();

  // تابع برای دریافت عنوان بر اساس مسیر فعلی
  const getTitle = (path: string) => {
    switch (path) {
      case '/protected':
      case '/protected/index':
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
      case '/protected/index':
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
      {/* هدر سفارشی */}
      <Header title={title} modalContent={modalContent} />

      {/* تب‌ها */}
      <Tabs screenOptions={{
        tabBarStyle: {
          backgroundColor: '#222831', // رنگ پس‌زمینه تب‌بار
        },
        tabBarActiveTintColor: '#FFD369', // رنگ آیکون و متن فعال
        tabBarInactiveTintColor: '#eeeeee', // رنگ آیکون و متن غیرفعال
      }}>
        {/* Home Tab */}
        <Tabs.Screen
          name="index"
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
      </Tabs>
    </GestureHandlerRootView>
  );
};

export default TabLayout;
