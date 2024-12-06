// app/protected/_layout.tsx
import React, { useCallback, useMemo, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { usePathname } from 'expo-router';
import { Tabs } from 'expo-router';
import Header from '../../components/Header';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth, Role } from '../../context/AuthContext';
import { Link } from 'expo-router';

const TabLayout = () => {
  const { authState } = useAuth();
  const pathname = usePathname();


  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['30%', '60%'], []);


  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);


  const handleDismissModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);


  const handleSheetChanges = useCallback((index: number) => {
    console.log('Sheet index changed:', index);

  }, []);

  // دریافت عنوان بر اساس مسیر
  const getTitle = (path: string) => {
    switch (path) {
      case '/protected':
      case '/protected/home':
        return 'خانه';
      case '/protected/home/lost':
        return 'مفقود شده';
      case '/protected/home/scanned':
        return 'اسکن شده';
      case '/protected/news':
        return 'Newsfeed';
      case '/protected/deparetman':
        return 'دپارتمان';
      case '/protected/deparetman/discrepancies':
        return 'لیست مغایرت ها';
      case '/protected/deparetman/${id}':
        return 'لیست مغایرت ها';
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
      case '/protected/deparetman':
        return 'محتوای صفحه دپارتمان';
      case '/protected/test':
        return 'محتوای صفحه تست';
      default:
        return 'محتوای پیش‌فرض';
    }
  };

  const title = getTitle(pathname);
  const modalContent = getModalContent(pathname);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* استفاده از BottomSheetModalProvider */}
      <BottomSheetModalProvider>
        {/* Custom Layout */}
        <View style={{ flex: 1 }}>
          {/* Header */}
          <Header title={title} modalContent={modalContent} openSheet={handlePresentModalPress} />

          <Tabs
            initialRouteName="home"
            screenOptions={{
              tabBarStyle: {
                height: 60,
                backgroundColor: '#DBE2EF',
                borderTopLeftRadius: 20, // گرد کردن گوشه بالا سمت چپ
                borderTopRightRadius: 20,
                shadowColor: '#112D4E',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 5,
                marginHorizontal: 0, // فاصله افقی (معادل marginX)
                marginVertical: 0,
              },
              tabBarIconStyle: {
                marginTop: 10, // فاصله دادن آیکون‌ها از بالا
              },
              tabBarActiveTintColor: '#3F72AF',
              tabBarInactiveTintColor: '#112D4E',
              tabBarShowLabel: false, // نمایش برچسب‌ها غیرفعال
            }}
          >



            {/* Home Tab */}
            <Tabs.Screen
              name="home"
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size, focused }) => (
                  <View style={styles.iconWrapper}>
                    <Ionicons name="home" size={size} color={color} />
                    {focused && (
                      <View style={styles.neonUnderline} />
                    )}
                  </View>
                ),
              }}
              redirect={authState?.authenticated === null}
            />

            {/* News Tab */}
            <Tabs.Screen
              name="news"
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size, focused }) => (
                  <View style={styles.iconWrapper}>
                    <Ionicons name="newspaper" size={size} color={color} />
                    {focused && (
                      <View style={styles.neonUnderline} />
                    )}
                  </View>
                ),
              }}
              redirect={authState?.role !== Role.USER}
            />

            {/* Admin Tab */}
            <Tabs.Screen
              name="deparetman"
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size, focused }) => (
                  <View style={styles.iconWrapper}>
                    <Ionicons name="business" size={size} color={color} />
                    {focused && (
                      <View style={styles.neonUnderline} />
                    )}
                  </View>
                ),
              }}
              redirect={authState?.role !== Role.ADMIN}
            />

            {/* Test Tab */}
            <Tabs.Screen
              name="test"
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size, focused }) => (
                  <View style={styles.iconWrapper}>
                    <Ionicons name="search" size={size} color={color} />
                    {focused && (
                      <View style={styles.neonUnderline} />
                    )}
                  </View>
                ),
              }}
              redirect={!(authState?.role === Role.ADMIN || authState?.role === Role.USER)}
            />

            {/* Scan Tab */}
            <Tabs.Screen
              name="scan"
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size, focused }) => (
                  <View style={styles.iconWrapper}>
                    <Ionicons name="cog" size={size} color={color} />
                    {focused && (
                      <View style={styles.neonUnderline} />
                    )}
                  </View>
                ),
              }}
              redirect={!(authState?.role === Role.ADMIN || authState?.role === Role.USER)}
            />
          </Tabs>

          {/* BottomSheetModal */}
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0} // شروع با اولین نقطه snap

            onChange={handleSheetChanges}
            enablePanDownToClose={true}
            style={styles.bottomSheet}
          >
            <BottomSheetView style={styles.contentContainer}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={handleDismissModal}>
                  <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>پشتیبانی</Text>
              </View>
              <Text style={styles.modalContent}>
                اگر مشکلی دارید، می‌توانید با تیم پشتیبانی ما تماس بگیرید:
                {'\n\n'}
                {modalContent}
              </Text>
              <TouchableOpacity style={styles.supportButton}>
                <Link href="tel:09301157083">
                  <Text style={styles.supportButtonText}>تماس با پشتیبانی</Text>
                </Link>
              </TouchableOpacity>
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    // می‌توانید استایل‌های اضافی برای BottomSheetModal اضافه کنید
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'YekanBakh-Bold',

  },
  modalContent: {
    fontSize: 16,
    fontFamily: 'YekanBakh-Regular',
    color: '#112D4E',
    textAlign: 'right',
  },
  supportButton: {
    marginTop: 24,
    backgroundColor: '#3F72AF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  supportButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'YekanBakh-Regular',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  neonUnderline: {
    position: 'absolute',
    bottom: -20, // زیر آیکون قرار گیرد
    width: 50, // عرض خط
    height: 6, // ضخامت خط
    backgroundColor: '#3F72AF', // رنگ نئونی
    borderRadius: 5, // گوشه‌های گرد
    shadowColor: '#3F72AF',
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: 5, // برای اندروید
  },
});

export default TabLayout;
