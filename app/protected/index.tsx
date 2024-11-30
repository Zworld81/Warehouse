import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { I18nManager } from "react-native";
import { Image } from 'expo-image';

// تعریف تایپ برای هر آیتم
interface Item {
  title: string;
  image: string;  // این می‌تونه 'string' برای URL یا هر نوع تصویر محلی باشه
  description: string;
}

const App = () => {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);

  // hooks
  const sheetRef = useRef<BottomSheet>(null);
  const colors = ['#405093', '#2C4B66', '#3860FF', '#09156e'];
  // داده‌ها با لینک تصاویر
  const data: Item[] = useMemo(
    () => [
      { title: 'میز زرد', image: require('../../assets/3dcube.png'), description: 'شرکت فراهوش-سعید سورانی' },
      { title: 'صندلی مشکی', image: require('../../assets/emoji-sad.png'), description: 'شرکت صنایع فولاد-محمد رضایی' },
      { title: 'وسیله تست-2', image: require('../../assets/emoji-normal.png'), description: 'شرکت صنایع فولاد-محمد علی' },
      { title: 'میز زرد 2', image: require('../../assets/3dcube.png'), description: 'شرکت فراهوش-سعید سورانی' },
      { title: 'صندلی مشکی 2', image: require('../../assets/emoji-sad.png'), description: 'شرکت صنایع فولاد-محمد رضایی' },
      { title: 'وسیله تست-2 3', image: require('../../assets/emoji-normal.png'), description: 'شرکت صنایع فولاد-محمد علی' },
      { title: 'وسیله تست-32', image: require('../../assets/emoji-normal.png'), description: 'شرکت صنایع فولاد-محمد علی' },
      { title: 'میز زرد 32', image: require('../../assets/3dcube.png'), description: 'شرکت فراهوش-سعید سورانی' },
      { title: 'صندلی مشکی 32', image: require('../../assets/emoji-sad.png'), description: 'شرکت صنایع فولاد-محمد رضایی' },
      { title: 'وسیله تست-32 3', image: require('../../assets/emoji-normal.png'), description: 'شرکت صنایع فولاد-محمد علی' },
    ],
    []
  );

  const snapPoints = useMemo(() => ["40%", "80%"], []);

  // callbacks
  const handleSheetChange = useCallback((index: number) => {
    console.log("handleSheetChange", index);
  }, []);

  // render
  const renderItem = useCallback(
    ({ title, image, description }: Item) => {
      // انتخاب تصادفی رنگ از لیست
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      return (
        <View key={title} className="flex items-center justify-start gap-5 flex-row-reverse px-5 py-3">
          <View style={[{ backgroundColor: randomColor }]} className={`rounded-full p-4 justify-center items-center flex bg-[${randomColor}]`}>
            <Image source={image} style={{ width: 26, height: 26 }} contentFit="cover" transition={1000} />
          </View>
          <View>
            <Text className="font-Regular text-right text-white text-lg mb-0.5">{title}</Text>
            <Text className="font-Light text-right text-white text-sm">{description}</Text>
          </View>
        </View>
      );
    },
    []
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <View className="flex justify-center items-center bg-grayy border-b-yellow border-b-2 rounded-lg p-5 w-full">
        <View className="flex flex-row-reverse justify-between w-full gap-5 mb-5">
          <Text className="font-Bold text-white">تعداد کل اموال</Text>
          <Image source={require('../../assets/Group-2.png')} style={{ width: 30, height: 18 }} contentFit="cover" transition={1000} />
        </View>
        <Text className="font-Regular text-white">بدون دسته بندی : 72</Text>
      </View>
      <View className="flex flex-row justify-between items-center bg-grayy border-r-yellow border-r-2 rounded-lg p-5 w-full mt-28">
        <Image source={require('../../assets/Scan.png')} style={{ width: 36, height: 36 }}   />
        <Text className="font-Bold text-white">اسکن شده</Text>
      </View>
      <View className="flex flex-row justify-between items-center bg-grayy border-r-yellow border-r-2 rounded-lg p-5 w-full mt-5">
        <Image source={require('../../assets/lost.png')} style={{ width: 36, height: 36 }}   />
        <Text className="font-Bold text-white">مفقود شده</Text>
      </View>
      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChange}
        backgroundStyle={{
          backgroundColor: '#393E46'
        }}
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          {data.map((item) => renderItem(item))}
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831",
    padding: 10,
    paddingHorizontal: 20
  },
  contentContainer: {
    backgroundColor: "#393E46",
  },
});

export default App;
