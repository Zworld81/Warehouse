// app/guide/index.tsx
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
import Swiper from 'react-native-swiper';
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface GuideScreenProps {
  onFinish: () => void;
}

const GuideScreen: React.FC<GuideScreenProps> = ({ onFinish }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const swiperRef = useRef<Swiper>(null);

  const pages = [
    {
      key: 'page1',
      title: 'خوش آمدید به اپلیکیشن ما',
      description: 'با استفاده از این اپلیکیشن می‌توانید به راحتی ...',
      image: require('../../assets/guide1.png'),
    },
    {
      key: 'page2',
      title: 'این صفحه دوم راهنما است',
      description: 'در این قسمت شما با امکانات اپلیکیشن آشنا می‌شوید ...',
      image: require('../../assets/guide2.png'),
    },
    {
      key: 'page3',
      title: 'حالا به صفحه ورود بروید',
      description: 'برای شروع استفاده از اپلیکیشن، وارد شوید ...',
      image: require('../../assets/guide3.png'),
    },
    {
      key: 'page4',
      title: 'یافتن محصولات مفقود شده',
      description:
        'راحتی در استفاده و جستجو هوشمند محصولات و شناسه کالا ها و قابل استفاده برای همه اعضای تیم',
      image: require('../../assets/guide4.png'),
    },
  ];

  const handleNext = async () => {
    if (currentPage < pages.length - 1) {
      swiperRef.current?.scrollBy(1, true);
    } else {
      try {
        await SecureStore.setItemAsync('hasSeenGuide', 'true');
        onFinish();
      } catch (error) {
        console.error('Error setting hasSeenGuide:', error);
        // Optionally, display an error message to the user
      }
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      swiperRef.current?.scrollBy(-1, true);
    }
  };

  const onIndexChanged = (index: number) => {
    setCurrentPage(index);
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar
        barStyle='dark-content'
        backgroundColor='#ffffff'
      />
      <Swiper
        ref={swiperRef}
        loop={false}
        onIndexChanged={onIndexChanged}
        showsPagination={false}
        scrollEnabled={true}
        autoplay={false}
        index={0}
      >
        {pages.map((page) => (
          <View key={page.key} className="w-full justify-center items-center px-8">
            <Image
              source={page.image}
              className="mt-16"
              resizeMode="contain"
              style={{ width: 355, height: 399 }}
            />
            <Text className="text-2xl font-Bold text-center text-gray-800 mb-2">
              {page.title}
            </Text>
            <Text className="text-base text-center font-Regular text-gray-600">
              {page.description}
            </Text>
          </View>
        ))}
      </Swiper>

      {/* Indicators as horizontal lines */}
      <View className="absolute bottom-44 left-4 right-4 flex-row justify-center items-center gap-5">
        {pages.map((_, index) => (
          <View
            key={index}
            className={`h-1 rounded ${currentPage === index ? 'w-14 bg-blue-500' : 'w-10 bg-gray-300'}`}
          />
        ))}
      </View>

      {/* Footer with Back and Next Buttons */}
      <View className="absolute bottom-8 left-4 right-4 flex-row justify-center gap-10 items-center">
        {/* Back Button */}
        {currentPage > 0 ? (
          <TouchableOpacity
            onPress={handleBack}
            className="flex-row items-center bg-gray-500 rounded-full p-3 w-1/5 justify-center"
            accessible={true}
            accessibilityLabel="بازگشت به صفحه قبلی"
          >
            <Ionicons name="arrow-back" size={20} color="#fff" />

          </TouchableOpacity>
        ) : (
          // Spacer when Back button is not visible
          <View className="w-1/5" />
        )}

        {/* Next Button */}
        <TouchableOpacity
          onPress={handleNext}
          className="bg-blue-500 rounded-full p-3 w-3/5 justify-center items-center flex-row"
          accessible={true}
          accessibilityLabel={
            currentPage < pages.length - 1 ? 'برو به صفحه بعدی' : 'شروع اپلیکیشن'
          }
        >
          {currentPage < pages.length - 1 ? (
            <>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </>
          ) : (
            <Text className="text-white text-lg font-Bold font-semibold">بزن بریم</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GuideScreen;
