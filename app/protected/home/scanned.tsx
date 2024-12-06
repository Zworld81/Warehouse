// MissingItemsScreen.tsx
import React, { useState, useMemo, useCallback, useRef } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';

// تعریف نوع آیتم‌ها با اضافه کردن رنگ
type Item = {
  title: string;
  image: any;
  description: string;
  color: string; // رنگ پس‌زمینه
};

const MissingItemsScreen = () => {
  const router = useRouter();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  
  // مجموعه رنگ‌های ثابت
  const colors = ['#405093', '#2C4B66', '#3860FF', '#09156e'];

  // داده‌های اولیه با اختصاص رنگ به هر آیتم
  const data: Item[] = useMemo(() => {
    return [
      { title: 'میز زرد', image: require('../../../assets/3dcube.png'), description: 'شرکت فراهوش-سعید سورانی', color: colors[Math.floor(Math.random() * colors.length)] },
      { title: 'صندلی مشکی', image: require('../../../assets/emoji-sad.png'), description: 'شرکت صنایع فولاد-محمد رضایی', color: colors[Math.floor(Math.random() * colors.length)] },
      { title: 'وسیله تست-2', image: require('../../../assets/emoji-normal.png'), description: 'شرکت صنایع فولاد-محمد علی', color: colors[Math.floor(Math.random() * colors.length)] },
      { title: 'میز زرد 2', image: require('../../../assets/3dcube.png'), description: 'شرکت فراهوش-سعید سورانی', color: colors[Math.floor(Math.random() * colors.length)] },
      { title: 'صندلی مشکی 2', image: require('../../../assets/emoji-sad.png'), description: 'شرکت صنایع فولاد-محمد رضایی', color: colors[Math.floor(Math.random() * colors.length)] },
      { title: 'وسیله تست-2 3', image: require('../../../assets/emoji-normal.png'), description: 'شرکت صنایع فولاد-محمد علی', color: colors[Math.floor(Math.random() * colors.length)] },
      { title: 'وسیله تست-32', image: require('../../../assets/emoji-normal.png'), description: 'شرکت صنایع فولاد-محمد علی', color: colors[Math.floor(Math.random() * colors.length)] },
      { title: 'میز زرد 32', image: require('../../../assets/3dcube.png'), description: 'شرکت فراهوش-سعید سورانی', color: colors[Math.floor(Math.random() * colors.length)] },
      { title: 'صندلی مشکی 32', image: require('../../../assets/emoji-sad.png'), description: 'شرکت صنایع فولاد-محمد رضایی', color: colors[Math.floor(Math.random() * colors.length)] },
      { title: 'وسیله تست-32 3', image: require('../../../assets/emoji-normal.png'), description: 'شرکت صنایع فولاد-محمد علی', color: colors[Math.floor(Math.random() * colors.length)] },
    ];
  }, []);

  // وضعیت جستجو
  const [searchText, setSearchText] = useState('');

  // آیتم انتخاب شده
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // فیلتر کردن داده‌ها بر اساس جستجو
  const filteredData = useMemo(() => {
    if (searchText.trim() === '') {
      return data;
    }
    const lowercasedFilter = searchText.toLowerCase();
    return data.filter(item =>
      item.title.toLowerCase().includes(lowercasedFilter) ||
      item.description.toLowerCase().includes(lowercasedFilter)
    );
  }, [searchText, data]);

  // مدیریت رویداد فشردن آیتم
  const handlePress = (item: Item) => {
    console.log('Item pressed:', item.title);
    setSelectedItem(item);
    bottomSheetModalRef.current?.present();
  };

  // رندر آیتم با رنگ ثابت
  const renderItem = useCallback(
    ({ item }: { item: Item }) => {
      return (
        <TouchableOpacity
          onPress={() => handlePress(item)}
          className="flex flex-row-reverse gap-5 items-center justify-start border-r-blu border-r-4 rounded-lg p-4 w-full mt-5 shadow-lg bg-main"
        >
          <View className="rounded-full p-4 justify-center items-center"  style={{ backgroundColor: item.color }} >
            <Image source={item.image} className="w-9 h-9" />
          </View>
          <View>
            <Text className="font-Bold text-right mb-1">{item.title}</Text>
            <Text className="font-Light text-sm ">{item.description}</Text>
          </View>
        </TouchableOpacity>
      );
    },
    []
  );

  // تنظیمات BottomSheetModal
  const snapPoints = useMemo(() => ['50%', '90%'], []);

  return (
    <BottomSheetModalProvider>
      <GestureHandlerRootView className="flex-1 bg-white p-4">
        {/* نوار جستجو */}
        <View className="mb-4">
          <TextInput
            className="border border-gray-300 rounded-lg p-3 font-Regular text-right"
            placeholder="جستجو..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* لیست آیتم‌ها */}
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => `${index}-${item.title}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center">
              <Text className="text-gray-500 font-Regular">هیچ آیتمی یافت نشد.</Text>
            </View>
          }
          className="px-3"
        />

        {/* BottomSheetModal */}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}

          onChange={(index) => {
            if (index === -1) {
              setSelectedItem(null);
            }
          }}
          backgroundStyle={{
            backgroundColor: '#F9F7F7',
          }}
        >
          {selectedItem && (
            <BottomSheetView className="p-4">
              <View className="flex justify-center flex-row-reverse gap-5 items-center mb-4  bg-main rounded-lg p-1">
                <Image source={selectedItem.image} className="w-12 h-12" />
                <Text className="font-Bold text-lg text-blu text-center">{selectedItem.title}</Text>
              </View>
              <View className='justify-between  flex flex-row-reverse items-center px-4 py-2  mb-2'>
              <Text className='font-Regular'>سپرده به:</Text>
              <Text className="font-Regular text-gray-700">{selectedItem.description}</Text> 
              </View>
              <View className='justify-between  flex flex-row-reverse items-center px-4 py-2 bg-main  mb-2'>
              <Text className='font-Regular'>توضیحات:</Text>
              <Text className="font-Regular text-gray-700">پس توضیحااات</Text> 
              </View>
              <View className='justify-between  flex flex-row-reverse items-center px-4  py-2 mb-2'>
              <Text className='font-Regular'>کد ایتم:</Text>
              <Text className="font-Regular text-gray-700">#233300</Text> 
              </View>
              <View className='justify-between  flex flex-row-reverse items-center px-4 py-2  bg-main'>
              <Text className='font-Regular'>زمان:</Text>
              <Text className="font-Regular text-gray-700">24/3/1403</Text> 
              </View>
              {/* دکمه بستن */}
              <TouchableOpacity
                onPress={() => {
                  bottomSheetModalRef.current?.dismiss();
                }}
                className="mt-4 bg-dark rounded-lg p-3"
              >
                <Text className="text-white text-center font-Bold">بستن</Text>
              </TouchableOpacity>
            </BottomSheetView>
          )}
        </BottomSheetModal>
      </GestureHandlerRootView>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    textAlign: 'right',
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {

    color: '#999',
  },
  modalContent: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row-reverse',
    gap: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  modalImage: {
    width: 48,
    height: 48,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    color: '#555',
  },
  closeButton: {
    backgroundColor: '#1E40AF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MissingItemsScreen;
