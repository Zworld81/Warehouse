// tour.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

const slides = [
  {
    key: 'one',
    title: 'خوش  به اپلیکیشن ما',
    text: 'این اپلیکیشن به شما کمک می‌کند تا بهترین تجربه را داشته باشید.',

    backgroundColor: '#59b2ab',
  },
  {
    key: 'two',
    title: 'امکانات عالی',
    text: 'با امکانات ما، می‌توانید به راحتی به اهداف خود برسید.',

    backgroundColor: '#febe29',
  },
  {
    key: 'three',
    title: 'شروع کنید',
    text: 'اکنون با استفاده از اپلیکیشن ما شروع کنید!',

    backgroundColor: '#22bcb5',
  },
];

const TourScreen = () => {
  const router = useRouter();

  const onDone = async () => {
    try {
      await SecureStore.setItemAsync('hasSeenTour', 'true');
      router.replace('/'); // هدایت به صفحه لاگین یا صفحه اصلی
    } catch (e) {
      console.error('Failed to save the data to the storage', e);
      Alert.alert('خطا', 'مشکلی در ذخیره‌سازی اطلاعات رخ داده است.');
    }
  };

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={onDone}
      showSkipButton
      onSkip={onDone}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default TourScreen;
