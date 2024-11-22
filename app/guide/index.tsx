// app/guide/index.tsx
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

const { width } = Dimensions.get('window');

interface GuideScreenProps {
  onFinish: () => void;
}

const GuideScreen: React.FC<GuideScreenProps> = ({ onFinish }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();

  const pages = [
    { key: 'page1', title: 'خوش آمدید به اپلیکیشن ما' },
    { key: 'page2', title: 'این صفحه دوم راهنما است' },
    { key: 'page3', title: 'حالا به صفحه ورود بروید' },
  ];

  const handleNext = async () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      // وقتی راهنما تمام شد، علامت گذاری می‌کنیم که کاربر راهنما را دیده است
      await SecureStore.setItemAsync('hasSeenGuide', 'true');
      onFinish(); // به روز رسانی وضعیت در RootLayout
      // نیازی به هدایت مستقیم نیست، چون RootLayout از تغییر وضعیت پیروی می‌کند
    }
  };

  const handleSkip = async () => {
    await SecureStore.setItemAsync('hasSeenGuide', 'true');
    onFinish(); // به روز رسانی وضعیت در RootLayout
    // نیازی به هدایت مستقیم نیست
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        contentOffset={{ x: currentPage * width, y: 0 }}
      >
        {pages.map((page) => (
          <View key={page.key} style={styles.page}>
            <Text style={styles.title}>{page.title}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Button
          title={currentPage < pages.length - 1 ? "بعدی" : "شروع"}
          onPress={handleNext}
        />
        {currentPage < pages.length - 1 && (
          <Button title="رد کردن" onPress={handleSkip} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  page: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default GuideScreen;
